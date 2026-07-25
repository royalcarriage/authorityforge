/**
 * Shared runtime for Vercel serverless company agents.
 * Zero-cost LLM: Gemini free only (no OpenAI).
 * Persist: optional GitHub Contents API (AF_GITHUB_TOKEN).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Project root: api/lib -> api -> root
export const ROOT = path.resolve(__dirname, "../..");

export function readJson(rel, fallback = null) {
  const p = path.join(ROOT, rel);
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return fallback;
  }
}

export function readText(rel, fallback = "") {
  try {
    return fs.readFileSync(path.join(ROOT, rel), "utf8");
  } catch {
    return fallback;
  }
}

export function requireAgentAuth(req) {
  const secret = process.env.AF_AGENT_SECRET || process.env.CRON_SECRET || "";
  if (!secret) {
    // Allow read-only public endpoints to skip; mutating endpoints must set secret in prod
    return { ok: true, mode: "open-dev" };
  }
  const h =
    req.headers["authorization"] ||
    req.headers["Authorization"] ||
    req.headers["x-af-agent-secret"] ||
    "";
  const bearer = String(h).replace(/^Bearer\s+/i, "").trim();
  const q = req.query?.secret || "";
  if (bearer === secret || q === secret) return { ok: true, mode: "authed" };
  return { ok: false, mode: "denied" };
}

export function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-af-agent-secret");
}

export function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body, null, 2));
}

/** Free Gemini only — never OpenAI while AF_ZERO_COST default */
export async function freeGemini(prompt, opts = {}) {
  if (process.env.AF_ZERO_COST === "0" && process.env.AF_ALLOW_PAID_LLM === "1") {
    // still prefer free first
  }
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!key) return { provider: "none", text: null, error: "GEMINI_API_KEY not set on Vercel" };

  const models = [
    process.env.AF_GEMINI_MODEL,
    "gemini-2.0-flash-lite",
    "gemini-2.0-flash",
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash",
    "gemini-flash-lite-latest",
  ].filter(Boolean);

  const system =
    opts.system ||
    "You are AuthorityForge company agents. Practical SEO/AI ops. No fake stats. Zero paid APIs.";

  let lastErr;
  for (const m of [...new Set(models)]) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${encodeURIComponent(key)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: `${system}\n\n${prompt}` }] }],
          generationConfig: {
            maxOutputTokens: opts.maxTokens || 1024,
            temperature: 0.6,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        lastErr = data.error?.message || res.statusText;
        continue;
      }
      const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join("")?.trim();
      if (text) return { provider: "gemini", model: m, text, costUsd: 0 };
    } catch (e) {
      lastErr = e.message;
    }
  }
  return { provider: "none", text: null, error: lastErr || "gemini failed", costUsd: 0 };
}

export async function healthCheck(baseUrl) {
  const primary = (
    baseUrl ||
    process.env.AF_PRIMARY_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : null) ||
    "https://authorityforge-tau.vercel.app"
  ).replace(/\/$/, "");

  // Don't probe /api/company/status from inside itself (recursion risk)
  const paths = ["/", "/ads.txt", "/legal/privacy/", "/css/styles.css", "/sitemap.xml"];
  const out = {};
  for (const p of paths) {
    try {
      const r = await fetch(`${primary}${p}`, { redirect: "follow" });
      out[p] = r.status;
    } catch {
      out[p] = "ERR";
    }
  }
  return { primary, health: out };
}

export function companySnapshot() {
  const state = readJson("agents/company-state.json", {});
  const tasks = readJson("agents/memory/open-tasks.json", { tasks: [] });
  const ledger = readJson("agents/treasury/ledger.json", {});
  const policy = readJson("agents/treasury/policy.json", {});
  const budget = readJson("agents/treasury/budget.json", {});
  const marketplace = readJson("agents/marketplace/catalog.json", { plugins: [] });
  const queue = readJson("content/queue.json", { posts: [] });
  const posts = queue.posts || [];
  const rolesDir = path.join(ROOT, "agents/roles");
  let roles = [];
  try {
    roles = fs
      .readdirSync(rolesDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""));
  } catch {
    roles = Object.keys(state.orgChart?.reports || {});
  }

  return {
    ok: true,
    platform: "vercel",
    zeroCost: process.env.AF_ZERO_COST !== "0",
    company: state.company || {},
    hardRules: state.hardRules || {},
    orgChart: state.orgChart || {},
    kpis: state.kpis || {},
    lastCycle: state.lastCycle || null,
    cycleCount: state.cycleCount || 0,
    roles,
    openTasks: (tasks.tasks || []).filter((t) => t.status === "open").length,
    content: {
      queued: posts.filter((p) => p.status === "queued").length,
      published: posts.filter((p) => p.status === "published").length,
    },
    treasury: {
      balances: ledger.balances || {},
      autonomyLevel: policy.autonomy?.level ?? 1,
      maxAutoSpendCents: policy.autonomy?.maxAutoSpendCents ?? 0,
      costPolicy: policy.costPolicy || { llm: { mode: "free_only" } },
      openPOs: (budget.openPurchaseOrders || []).filter((p) => p.status === "proposed").length,
    },
    marketplace: {
      pluginCount: (marketplace.plugins || []).length,
      plugins: (marketplace.plugins || []).map((p) => ({
        id: p.id,
        name: p.name,
        status: p.status,
        cost: p.cost,
      })),
    },
    llm: {
      mode: "free_only",
      vercelProvider: "gemini_free_tier",
      geminiKeyConfigured: Boolean(
        process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
      ),
      paidBlocked: process.env.AF_ZERO_COST !== "0",
    },
    endpoints: {
      status: "/api/company/status",
      health: "/api/health",
      ceoCycle: "/api/ceo/cycle",
      autonomous: "/api/agent/autonomous",
      agentStatus: "/api/agent/status",
      publish: "/api/content/publish-next",
      llm: "/api/llm/complete",
      agents: "/api/agents",
      marketplace: "/api/marketplace",
      org: "/api/company/org",
      projects: "/api/projects",
    },
    generatedAt: new Date().toISOString(),
  };
}

/** Run one CEO cycle in-memory + optional GitHub persist of cycle log */
export async function runCeoCycle(opts = {}) {
  const now = new Date().toISOString();
  const today = now.slice(0, 10);
  const state = readJson("agents/company-state.json", {});
  const tasks = readJson("agents/memory/open-tasks.json", { tasks: [] });
  const queue = readJson("content/queue.json", { posts: [] });
  const { primary, health } = await healthCheck();

  const posts = queue.posts || [];
  const queued = posts.filter((p) => p.status === "queued");
  const report = {
    agent: "af-ceo-vercel-v1",
    platform: "vercel",
    startedAt: now,
    zeroCost: process.env.AF_ZERO_COST !== "0",
    sense: {
      primary,
      health,
      queued: queued.length,
      published: posts.filter((p) => p.status === "published").length,
      openTasks: (tasks.tasks || []).filter((t) => t.status === "open").length,
    },
    plan: [],
    actions: [],
    approvals: [],
    llm: null,
  };

  // Plan
  if (queued.length < (state.kpis?.queuedPostsMin || 5)) {
    report.plan.push({ id: "refill-queue", role: "content-chief" });
  }
  const bad = Object.entries(health).filter(([, c]) => c !== 200 && c !== "200");
  if (bad.length) report.plan.push({ id: "fix-health", role: "devops-chief" });
  report.plan.push({ id: "research", role: "research-chief" });
  report.plan.push({ id: "legal-gate", role: "legal-gate" });

  // Optional free LLM briefing
  if (opts.withLlm !== false && process.env.GEMINI_API_KEY) {
    const briefing = await freeGemini(
      `Company: AuthorityForge. Queued posts: ${queued.length}. Health: ${JSON.stringify(health)}.
Write 5 bullet action items for today. Zero budget. Free tools only. No paid APIs.`,
      { maxTokens: 400 }
    );
    report.llm = {
      provider: briefing.provider,
      costUsd: 0,
      briefing: briefing.text?.slice(0, 2000) || null,
      error: briefing.error || null,
    };
    report.actions.push({ role: "af-ceo", action: "llm_briefing", provider: briefing.provider });
  }

  report.actions.push({
    role: "legal-gate",
    action: "enforce",
    blocked: ["email_send", "money_move", "paid_llm", "click_own_ads"],
  });

  // Update cycle counters in returned state (persist via GitHub if token)
  const newState = {
    ...state,
    cycleCount: (state.cycleCount || 0) + 1,
    lastCycle: {
      at: now,
      platform: "vercel",
      queued: queued.length,
      health,
      actions: report.actions.length,
    },
    runtime: {
      host: "vercel",
      primaryUrl: primary,
      lastCeoCycleAt: now,
    },
  };

  let persist = { ok: false, reason: "no AF_GITHUB_TOKEN" };
  if (process.env.AF_GITHUB_TOKEN || process.env.GITHUB_TOKEN) {
    persist = await persistCycleToGitHub(today, report, newState);
  }

  report.finishedAt = new Date().toISOString();
  report.persist = persist;
  report.state = {
    cycleCount: newState.cycleCount,
    lastCycle: newState.lastCycle,
  };
  return report;
}

async function persistCycleToGitHub(today, report, newState) {
  const token = process.env.AF_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
  const repo = process.env.AF_GITHUB_REPO || "royalcarriage/authorityforge";
  const [owner, name] = repo.split("/");
  const files = [
    {
      path: `agents/logs/cycle-${today}-vercel.json`,
      content: JSON.stringify(report, null, 2) + "\n",
    },
    {
      path: "agents/company-state.json",
      content: JSON.stringify(newState, null, 2) + "\n",
    },
  ];

  const results = [];
  for (const f of files) {
    try {
      // get sha if exists
      const metaRes = await fetch(
        `https://api.github.com/repos/${owner}/${name}/contents/${f.path}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
            "User-Agent": "authorityforge-ceo",
          },
        }
      );
      let sha;
      if (metaRes.ok) {
        const meta = await metaRes.json();
        sha = meta.sha;
      }
      const put = await fetch(
        `https://api.github.com/repos/${owner}/${name}/contents/${f.path}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json",
            "User-Agent": "authorityforge-ceo",
          },
          body: JSON.stringify({
            message: `agent(ceo-vercel): cycle ${today}`,
            content: Buffer.from(f.content, "utf8").toString("base64"),
            sha,
            branch: process.env.AF_GITHUB_BRANCH || "main",
          }),
        }
      );
      const body = await put.json();
      results.push({ path: f.path, ok: put.ok, status: put.status, error: body.message });
    } catch (e) {
      results.push({ path: f.path, ok: false, error: e.message });
    }
  }
  return { ok: results.every((r) => r.ok), results };
}
