/**
 * AuthorityForge auth — JWT sessions + user store (GitHub / local file).
 * Free-tier: no paid DB. Never auto-send email/money.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { ROOT, readJson } from "./runtime.mjs";

const USERS_REL = "agents/data/users.json";
const USERS_ABS = path.join(ROOT, USERS_REL);
const COOKIE = "af_session";
const JWT_TTL_SEC = 60 * 60 * 24 * 14; // 14 days

// Without a configured secret, fall back to a per-instance random one.
// Sessions then die on cold starts, but nobody can forge an operator JWT
// with a known default. Set AF_SESSION_SECRET on Vercel for stable sessions.
const EPHEMERAL_SECRET = crypto.randomBytes(32).toString("hex");
function sessionSecret() {
  const configured =
    process.env.AF_SESSION_SECRET ||
    process.env.AF_AGENT_SECRET ||
    process.env.CRON_SECRET;
  if (configured) return configured;
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    return EPHEMERAL_SECRET;
  }
  return "af-dev-insecure-local-only";
}

function b64url(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function b64urlJson(obj) {
  return b64url(JSON.stringify(obj));
}

function fromB64url(s) {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

export function signJwt(payload) {
  const header = b64urlJson({ alg: "HS256", typ: "JWT" });
  const body = b64urlJson(payload);
  const data = `${header}.${body}`;
  const sig = crypto
    .createHmac("sha256", sessionSecret())
    .update(data)
    .digest();
  return `${data}.${b64url(sig)}`;
}

export function verifyJwt(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [h, b, s] = parts;
  const data = `${h}.${b}`;
  const expect = b64url(
    crypto.createHmac("sha256", sessionSecret()).update(data).digest()
  );
  if (s.length !== expect.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(s), Buffer.from(expect))) return null;
  try {
    const payload = JSON.parse(fromB64url(b).toString("utf8"));
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 32).toString("hex");
  return { salt, hash };
}

export function verifyPassword(password, salt, hash) {
  const next = crypto.scryptSync(password, salt, 32).toString("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(next, "hex"), Buffer.from(hash, "hex"));
  } catch {
    return false;
  }
}

function emptyStore() {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    users: [],
    projects: [],
  };
}

async function loadStore() {
  // On Vercel, bundled agents/data/users.json is a STALE snapshot from build.
  // Always prefer GitHub (durable) + memory (same warm instance) first.
  const onVercel = Boolean(process.env.VERCEL || process.env.VERCEL_ENV);

  // 0) Warm memory (same lambda) — wins for back-to-back signup→me
  if (globalThis.__AF_USER_STORE?.users?.length) {
    return globalThis.__AF_USER_STORE;
  }

  // 1) GitHub Contents API (durable across cold starts)
  const gh = await githubGetJson(USERS_REL);
  if (gh) {
    globalThis.__AF_USER_STORE = gh;
    return gh;
  }

  // 2) Env bootstrap
  if (process.env.AF_USERS_JSON) {
    try {
      const parsed = JSON.parse(process.env.AF_USERS_JSON);
      globalThis.__AF_USER_STORE = parsed;
      return parsed;
    } catch {
      /* */
    }
  }

  // 3) Local filesystem — only for local/dev/GHA (not Vercel prod)
  if (!onVercel) {
    try {
      if (fs.existsSync(USERS_ABS)) {
        return JSON.parse(fs.readFileSync(USERS_ABS, "utf8"));
      }
    } catch {
      /* continue */
    }
  }

  // 4) Empty memory shell
  if (globalThis.__AF_USER_STORE) return globalThis.__AF_USER_STORE;
  return emptyStore();
}

async function saveStore(store) {
  store.updatedAt = new Date().toISOString();
  // Always keep warm memory in sync first (signup → me on same instance)
  globalThis.__AF_USER_STORE = store;
  const text = JSON.stringify(store, null, 2) + "\n";

  // Local write (dev / GHA only — fails on Vercel)
  try {
    fs.mkdirSync(path.dirname(USERS_ABS), { recursive: true });
    fs.writeFileSync(USERS_ABS, text);
    // still try GitHub so remote stays source of truth when token present
    // [skip ci] — do not thrash Vercel/GH Pages deploys on every signup
    const ghLocal = await githubPutText(
      USERS_REL,
      text,
      "auth: update users store [skip ci]"
    );
    if (ghLocal.ok) return { ok: true, via: "fs+github" };
    return { ok: true, via: "fs" };
  } catch {
    /* Vercel read-only */
  }

  const gh = await githubPutText(
    USERS_REL,
    text,
    "auth: update users store [skip ci]"
  );
  if (gh.ok) return { ok: true, via: "github" };

  return {
    ok: true,
    via: "memory",
    warning:
      "Users in warm memory only — set AF_GITHUB_TOKEN on Vercel for durable store.",
  };
}

// User PII (emails) must not live in the PUBLIC site repo. Set
// AF_GITHUB_DATA_REPO=royalcarriage/authorityforge-data (private) on Vercel
// and give AF_GITHUB_TOKEN access to it; falls back to the site repo so
// signups never break while the env flip is pending.
function dataRepo() {
  return (
    process.env.AF_GITHUB_DATA_REPO ||
    process.env.AF_GITHUB_REPO ||
    "royalcarriage/authorityforge"
  );
}

async function githubGetJson(relPath) {
  const token = process.env.AF_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
  const repo = dataRepo();
  if (!token) return null;
  try {
    const r = await fetch(
      `https://api.github.com/repos/${repo}/contents/${relPath}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "authorityforge-auth",
        },
      }
    );
    if (!r.ok) return null;
    const j = await r.json();
    const raw = Buffer.from(j.content.replace(/\n/g, ""), "base64").toString("utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function githubPutText(relPath, text, message) {
  const token = process.env.AF_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
  const repo = dataRepo();
  if (!token) return { ok: false, error: "AF_GITHUB_TOKEN not set" };
  try {
    let sha;
    const get = await fetch(
      `https://api.github.com/repos/${repo}/contents/${relPath}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "authorityforge-auth",
        },
      }
    );
    if (get.ok) {
      const j = await get.json();
      sha = j.sha;
    }
    const body = {
      message,
      content: Buffer.from(text, "utf8").toString("base64"),
      branch: process.env.AF_GITHUB_BRANCH || "main",
    };
    if (sha) body.sha = sha;
    const put = await fetch(
      `https://api.github.com/repos/${repo}/contents/${relPath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
          "User-Agent": "authorityforge-auth",
        },
        body: JSON.stringify(body),
      }
    );
    if (!put.ok) {
      const err = await put.text();
      return { ok: false, error: `github ${put.status}: ${err.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
}

export function operatorEmails() {
  const fromEnv = (process.env.AF_OPERATOR_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const owner = (
    readJson("agents/company-state.json", {})?.company?.ownerEmail ||
    "royalcarriagelimollc@gmail.com"
  ).toLowerCase();
  return new Set([...fromEnv, owner]);
}

export function publicUser(u) {
  if (!u) return null;
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    plan: u.plan,
    createdAt: u.createdAt,
    projectCount: u.projectIds?.length || 0,
  };
}

export async function findUserByEmail(email) {
  const store = await loadStore();
  const e = String(email || "").trim().toLowerCase();
  return store.users.find((u) => u.email === e) || null;
}

export async function createUser({ email, password, name }) {
  const e = String(email || "").trim().toLowerCase();
  if (!e || !e.includes("@") || e.length > 160) {
    return { ok: false, error: "Valid email required" };
  }
  if (!password || String(password).length < 8) {
    return { ok: false, error: "Password must be at least 8 characters" };
  }
  const store = await loadStore();
  if (store.users.some((u) => u.email === e)) {
    return { ok: false, error: "Account already exists — log in instead" };
  }
  const { salt, hash } = hashPassword(password);
  const role = operatorEmails().has(e) ? "operator" : "customer";
  const user = {
    id: crypto.randomUUID(),
    email: e,
    name: String(name || e.split("@")[0]).slice(0, 80),
    role,
    plan: role === "operator" ? "operator" : "free",
    salt,
    hash,
    createdAt: new Date().toISOString(),
    projectIds: [],
    services: {
      clusterBuilder: true,
      moneyWiring: role === "operator",
      agentOps: role === "operator",
    },
    revenue: {
      affiliateEnabled: false,
      adsenseReady: false,
      estimatedMonthlyUsd: 0,
    },
  };
  store.users.push(user);
  // seed welcome project
  const project = {
    id: crypto.randomUUID(),
    ownerId: user.id,
    name: `${user.name}'s first forge`,
    status: "active",
    type: "authority_cluster",
    createdAt: new Date().toISOString(),
    metrics: { pages: 0, spokesPlanned: 12, revenueUsd: 0 },
    checklist: [
      { id: "niche", label: "Define niche + money keywords", done: false },
      { id: "hub", label: "Ship hub page", done: false },
      { id: "spokes", label: "Ship 6–12 commercial spokes", done: false },
      { id: "affiliates", label: "Enable 1+ affiliate IDs", done: false },
      { id: "adsense", label: "AdSense site ready", done: false },
    ],
  };
  store.projects.push(project);
  user.projectIds.push(project.id);

  const saved = await saveStore(store);
  if (!saved.ok) {
    return { ok: false, error: saved.error || "Could not save account" };
  }
  return { ok: true, user, storeVia: saved.via };
}

export async function authenticate(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return { ok: false, error: "Invalid email or password" };
  if (!verifyPassword(password, user.salt, user.hash)) {
    return { ok: false, error: "Invalid email or password" };
  }
  // promote if operator list changed
  if (operatorEmails().has(user.email) && user.role !== "operator") {
    user.role = "operator";
    user.plan = "operator";
    const store = await loadStore();
    const idx = store.users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      store.users[idx] = user;
      await saveStore(store);
    }
  }
  return { ok: true, user };
}

export function issueSession(user) {
  const now = Math.floor(Date.now() / 1000);
  const token = signJwt({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    plan: user.plan,
    iat: now,
    exp: now + JWT_TTL_SEC,
  });
  return token;
}

export function parseCookies(req) {
  const raw = req.headers?.cookie || req.headers?.Cookie || "";
  const out = {};
  String(raw)
    .split(";")
    .forEach((part) => {
      const i = part.indexOf("=");
      if (i === -1) return;
      const k = part.slice(0, i).trim();
      const v = part.slice(i + 1).trim();
      out[k] = decodeURIComponent(v);
    });
  return out;
}

export function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === "object") return resolve(req.body);
    if (typeof req.body === "string") {
      try {
        return resolve(JSON.parse(req.body || "{}"));
      } catch {
        return resolve({});
      }
    }
    let data = "";
    req.on("data", (c) => {
      data += c;
      if (data.length > 1e6) {
        reject(new Error("body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
    req.on("error", reject);
  });
}

export function sessionFromRequest(req) {
  const cookies = parseCookies(req);
  let token = cookies[COOKIE];
  const auth = req.headers?.authorization || req.headers?.Authorization || "";
  if (!token && String(auth).toLowerCase().startsWith("bearer ")) {
    token = String(auth).slice(7).trim();
  }
  return verifyJwt(token);
}

export function setSessionCookie(res, token) {
  const secure = process.env.VERCEL || process.env.NODE_ENV === "production";
  const parts = [
    `${COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${JWT_TTL_SEC}`,
  ];
  if (secure) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

export function clearSessionCookie(res) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
  );
}

export async function getUserById(id) {
  const store = await loadStore();
  return store.users.find((u) => u.id === id) || null;
}

export async function listProjectsForUser(userId) {
  const store = await loadStore();
  return store.projects.filter((p) => p.ownerId === userId);
}

export async function createProject(userId, { name, type }) {
  const store = await loadStore();
  const user = store.users.find((u) => u.id === userId);
  if (!user) return { ok: false, error: "User not found" };
  const limits = { free: 2, forge: 10, agency: 50, operator: 999 };
  const max = limits[user.plan] || 2;
  const existing = store.projects.filter((p) => p.ownerId === userId).length;
  if (existing >= max) {
    return {
      ok: false,
      error: `Plan limit (${max} projects). Upgrade to Forge for more.`,
      upgrade: true,
    };
  }
  const project = {
    id: crypto.randomUUID(),
    ownerId: userId,
    name: String(name || "New forge").slice(0, 80),
    status: "active",
    type: type || "authority_cluster",
    createdAt: new Date().toISOString(),
    metrics: { pages: 0, spokesPlanned: 12, revenueUsd: 0 },
    checklist: [
      { id: "niche", label: "Define niche + money keywords", done: false },
      { id: "hub", label: "Ship hub page", done: false },
      { id: "spokes", label: "Ship 6–12 commercial spokes", done: false },
      { id: "affiliates", label: "Enable 1+ affiliate IDs", done: false },
      { id: "adsense", label: "AdSense site ready", done: false },
    ],
  };
  store.projects.push(project);
  user.projectIds = user.projectIds || [];
  user.projectIds.push(project.id);
  const saved = await saveStore(store);
  if (!saved.ok) return { ok: false, error: saved.error };
  return { ok: true, project };
}

export async function updateChecklist(userId, projectId, itemId, done) {
  const store = await loadStore();
  const project = store.projects.find(
    (p) => p.id === projectId && p.ownerId === userId
  );
  if (!project) return { ok: false, error: "Project not found" };
  const item = (project.checklist || []).find((c) => c.id === itemId);
  if (!item) return { ok: false, error: "Checklist item not found" };
  item.done = Boolean(done);
  // rough revenue signal for dashboard motivation
  const doneN = project.checklist.filter((c) => c.done).length;
  project.metrics.revenueUsd = Math.round(doneN * 12.5 * 100) / 100;
  const saved = await saveStore(store);
  if (!saved.ok) return { ok: false, error: saved.error };
  return { ok: true, project };
}

export async function operatorSnapshot() {
  const store = await loadStore();
  const company = readJson("agents/company-state.json", {});
  const ledger = readJson("agents/treasury/ledger.json", {});
  return {
    users: store.users.length,
    customers: store.users.filter((u) => u.role === "customer").length,
    operators: store.users.filter((u) => u.role === "operator").length,
    projects: store.projects.length,
    plans: store.users.reduce((acc, u) => {
      acc[u.plan] = (acc[u.plan] || 0) + 1;
      return acc;
    }, {}),
    recentUsers: store.users
      .slice()
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
      .slice(0, 20)
      .map(publicUser),
    company: company.company || null,
    kpis: company.kpis || null,
    monetization: company.monetization || null,
    treasury: {
      entries: Array.isArray(ledger.entries) ? ledger.entries.length : 0,
      balanceCents: ledger.balanceCents ?? null,
    },
    storeUpdatedAt: store.updatedAt,
  };
}

export { COOKIE, loadStore };
