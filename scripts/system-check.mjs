#!/usr/bin/env node
/**
 * Wiring / CI / keys / live health report for AuthorityForge.
 * Produces real JSON data — no secrets printed.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const primary =
  process.env.AF_PRIMARY_URL || "https://authorityforge-tau.vercel.app";

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}
function readJson(rel) {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
  } catch {
    return null;
  }
}
function keyPresent(name) {
  const v = process.env[name];
  return { name, present: Boolean(v && String(v).length > 8), length: v ? String(v).length : 0 };
}

async function http(pathSuffix) {
  const url = primary.replace(/\/$/, "") + pathSuffix;
  try {
    const res = await fetch(url, { redirect: "follow" });
    let sample = "";
    try {
      sample = (await res.text()).slice(0, 120).replace(/\s+/g, " ");
    } catch {
      /* */
    }
    return { path: pathSuffix, status: res.status, ok: res.status >= 200 && res.status < 400, sample };
  } catch (e) {
    return { path: pathSuffix, status: 0, ok: false, error: e.message };
  }
}

const objective = readJson("agents/control-plane/objective.json");
const state = readJson("agents/company-state.json");
const queue = readJson("content/queue.json");
const policy = readJson("agents/treasury/policy.json");
const posts = queue?.posts || [];

const files = {
  agentAutonomous: exists("scripts/agent-autonomous.mjs"),
  freeLlm: exists("scripts/free-llm.mjs"),
  ceoRun: exists("scripts/ceo-run.mjs"),
  prepareVercel: exists("scripts/prepare-vercel.mjs"),
  workflowAutonomous: exists(".github/workflows/agent-autonomous.yml"),
  workflowCeo: exists(".github/workflows/ceo-cycle.yml"),
  workflowContent: exists(".github/workflows/content-pipeline.yml"),
  objective: exists("agents/control-plane/objective.json"),
  constitution: exists("agents/control-plane/constitution.md"),
  companyState: exists("agents/company-state.json"),
  apiHealth: exists("api/health.js"),
  apiStatus: exists("api/company/status.js"),
  apiCeo: exists("api/ceo/cycle.js"),
};

const keys = [
  keyPresent("GEMINI_API_KEY"),
  keyPresent("AI_GATEWAY_API_KEY"),
  keyPresent("AF_AI_GATEWAY_API_KEY"),
  keyPresent("VERCEL_AI_GATEWAY_API_KEY"),
  keyPresent("AF_GITHUB_TOKEN"),
  keyPresent("AF_AGENT_SECRET"),
  keyPresent("AF_STRIPE_SECRET_KEY"),
  keyPresent("OPENAI_API_KEY"),
].map((k) => ({
  ...k,
  // OPENAI present but must be ignored in zero-cost
  note:
    k.name === "OPENAI_API_KEY" && k.present
      ? "present but IGNORED while AF_ZERO_COST=1"
      : undefined,
}));

const livePaths = [
  "/",
  "/company/",
  "/api/company/status",
  "/api/health",
  "/api/ceo/cycle",
  "/api/agents",
  "/api/marketplace",
  "/ads.txt",
  "/blog/",
  "/sitemap.xml",
  "/legal/privacy/",
];
const live = [];
for (const p of livePaths) live.push(await http(p));

// Free LLM smoke (short)
let llmSmoke = { ok: false };
try {
  const { freeComplete, zeroCostMode, gatewayKey } = await import("./free-llm.mjs");
  process.env.AF_ZERO_COST = process.env.AF_ZERO_COST || "1";
  const r = await freeComplete("Reply with exactly: SYSTEM_CHECK_OK", { maxTokens: 30 });
  llmSmoke = {
    ok: Boolean(r.text && /SYSTEM_CHECK_OK|OK/i.test(r.text)),
    provider: r.provider,
    costUsd: r.costUsd,
    zeroCost: zeroCostMode(),
    gatewayKeyPresent: Boolean(gatewayKey()),
    textPreview: (r.text || "").slice(0, 80),
    errors: r.errors || [],
  };
} catch (e) {
  llmSmoke = { ok: false, error: e.message };
}

// gh secret names (if gh available)
let ghSecrets = [];
try {
  const out = execSync("gh secret list 2>/dev/null", { encoding: "utf8", cwd: ROOT });
  ghSecrets = out
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split("\t")[0]);
} catch {
  ghSecrets = [];
}

const gaps = [];
if (!ghSecrets.includes("GEMINI_API_KEY") && !keys.find((k) => k.name === "GEMINI_API_KEY")?.present) {
  gaps.push("Set GEMINI_API_KEY in GitHub Actions secrets and/or local env");
}
if (!ghSecrets.includes("AI_GATEWAY_API_KEY")) {
  gaps.push("Optional: AI_GATEWAY_API_KEY in GH secrets + Vercel (free models only after card unlock)");
}
if (live.find((l) => l.path === "/api/health" && !l.ok)) {
  gaps.push("Fix /api/health live");
}
if ((posts.filter((p) => p.status === "queued").length || 0) < 3) {
  gaps.push("Content queue thin — seed more topics");
}
if (!state?.runtime?.autonomous) {
  gaps.push("company-state.runtime.autonomous missing — run agent-autonomous once");
}
// Vercel gemini from live status
const statusLive = live.find((l) => l.path === "/api/company/status");
if (statusLive?.ok) {
  try {
    const j = JSON.parse(
      (
        await (
          await fetch(primary.replace(/\/$/, "") + "/api/company/status")
        ).text()
      )
    );
    if (j.llm && j.llm.geminiKeyConfigured === false) {
      gaps.push("Vercel env missing GEMINI_API_KEY — CEO LLM briefing stays null");
    }
    if (j.treasury?.balances?.stripe_available_cents === 0) {
      gaps.push("No Stripe revenue yet (expected) — affiliates/AdSense human gates");
    }
  } catch {
    /* */
  }
}

const report = {
  ok: gaps.length === 0 || live.filter((l) => l.ok).length >= 8,
  at: new Date().toISOString(),
  primary,
  objective: objective?.northStar || null,
  cycleCount: state?.cycleCount ?? null,
  content: {
    queued: posts.filter((p) => p.status === "queued").length,
    published: posts.filter((p) => p.status === "published").length,
  },
  files,
  keysLocal: keys,
  ghSecretsConfigured: ghSecrets,
  live,
  llmSmoke,
  treasuryPolicy: policy?.costPolicy?.llm?.mode || null,
  gaps,
  nextHumanActions: [
    "Vercel env: GEMINI_API_KEY, AI_GATEWAY_API_KEY, AF_ZERO_COST=1",
    "Vercel AI Gateway: add card to unlock free tier (still use free models only)",
    "GitHub secret GEMINI_API_KEY (done if listed above)",
    "AdSense CMP publish + affiliate tracking IDs",
    "GSC property for authorityforge-tau.vercel.app",
  ],
};

const outDir = path.join(ROOT, "agents/logs");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, `system-check-${new Date().toISOString().slice(0, 10)}.json`);
fs.writeFileSync(outFile, JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
console.error("wrote", path.relative(ROOT, outFile));
