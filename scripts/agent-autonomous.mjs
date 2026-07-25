#!/usr/bin/env node
/**
 * Full-radius autonomous company cycle (GitHub Actions + local).
 * Zero paid APIs. Free Gemini → plan → act → optional publish → state.
 *
 * Env:
 *   AF_ZERO_COST=1 (default)
 *   AF_CEO_PUBLISH=1  — also publish next queue item via free LLM
 *   GEMINI_API_KEY    — free tier
 *   AF_PRIMARY_URL    — production site
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const today = new Date().toISOString().slice(0, 10);
const now = new Date().toISOString();
const ZERO = process.env.AF_ZERO_COST !== "0";
const DO_PUBLISH = process.env.AF_CEO_PUBLISH === "1";

function readJson(rel, fb) {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
  } catch {
    return fb;
  }
}
function writeJson(rel, obj) {
  fs.mkdirSync(path.dirname(path.join(ROOT, rel)), { recursive: true });
  fs.writeFileSync(path.join(ROOT, rel), JSON.stringify(obj, null, 2) + "\n");
}

async function gemini(prompt, maxTokens = 1200) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  for (const m of [
    "gemini-2.0-flash-lite",
    "gemini-2.0-flash",
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash",
  ]) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${encodeURIComponent(key)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: maxTokens, temperature: 0.5 },
          }),
        }
      );
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join("");
      if (text) return text;
    } catch {
      /* next model */
    }
  }
  return null;
}

const primary =
  process.env.AF_PRIMARY_URL || "https://authorityforge-tau.vercel.app";
const health = {};
for (const p of [
  "/",
  "/ads.txt",
  "/company/",
  "/css/styles.css",
  "/api/company/status",
  "/api/health",
]) {
  try {
    const code = execSync(
      `curl -sS -o /dev/null -w "%{http_code}" -L --max-time 12 "${primary}${p}"`,
      { encoding: "utf8" }
    ).trim();
    health[p] = code;
  } catch {
    health[p] = "ERR";
  }
}

const state = readJson("agents/company-state.json", {});
const queue = readJson("content/queue.json", { posts: [] });
let posts = queue.posts || [];
let queued = posts.filter((p) => p.status === "queued");

const actions = [];

// 1) Plan (free Gemini)
const planText = await gemini(
  `AuthorityForge autonomous agent. Zero paid APIs. Niche: AI productivity + SEO systems for affiliates/AdSense.
Health: ${JSON.stringify(health)}. Queued posts: ${queued.length}. Published: ${posts.filter((p) => p.status === "published").length}.
List 5 concrete improvements as markdown bullets. Be specific to AuthorityForge (not generic ecommerce).`
);
actions.push({ step: "plan", ok: Boolean(planText) });

// 2) Research log
const researchPath = path.join(ROOT, "agents/memory/research-log.md");
fs.appendFileSync(
  researchPath,
  `\n### Full-radius cycle ${now}\n- health: ${JSON.stringify(health)}\n- queued: ${queued.length}\n- zeroCost: ${ZERO}\n- publish: ${DO_PUBLISH}\n- plan:\n${planText || "(no gemini — template mode)"}\n`
);
actions.push({ step: "research_log", ok: true });

// 3) Seed high-value queue topics from company plan (idempotent)
const seeds = [
  {
    id: "schema-product-review-for-tool-pages",
    slug: "schema-product-review-for-tool-pages",
    title: "Product + Review Schema for AI/SEO Tool Pages (Without Fake Stars)",
    description:
      "How AuthorityForge-style commercial pages add Product/Service JSON-LD and FAQ safely for rich results without aggregateRating spam.",
    tags: ["schema", "seo", "affiliates"],
    hub: "/systems/eeat/",
    outline: [
      "Why Product/Service not AggregateRating spam",
      "JSON-LD pattern for tool pages",
      "FAQPage pairing",
      "Validation checklist",
      "AuthorityForge implementation notes",
    ],
  },
  {
    id: "internal-link-silos-for-affiliate-clusters",
    slug: "internal-link-silos-for-affiliate-clusters",
    title: "Internal Link Silos for Affiliate Content Clusters",
    description:
      "Hub-and-spoke linking so commercial tool pages and blog spokes reinforce each other without spam.",
    tags: ["seo", "internal-links", "clusters"],
    hub: "/systems/topical-clusters/",
    outline: [
      "Pillar vs spoke roles",
      "Anchor text rules",
      "Weekly link audit",
      "Examples from AuthorityForge",
      "Metrics that matter",
    ],
  },
  {
    id: "best-of-comparison-pages-that-convert",
    slug: "best-of-comparison-pages-that-convert",
    title: "Best-Of and Comparison Pages That Convert (Disclosed Affiliates)",
    description:
      "How to structure Best-Of / vs pages for AI writing and SEO tools with criteria-first recommendations.",
    tags: ["affiliates", "compare", "conversion"],
    hub: "/compare/",
    outline: [
      "Criteria before rankings",
      "Table layout",
      "Disclosure placement",
      "CTA after value",
      "What not to do",
    ],
  },
];
const ids = new Set(posts.map((p) => p.id));
let seeded = 0;
for (const s of seeds) {
  if (ids.has(s.id)) continue;
  posts.push({
    ...s,
    status: "queued",
    source: "full-radius-autonomous",
  });
  ids.add(s.id);
  seeded++;
}
if (seeded) {
  queue.posts = posts;
  writeJson("content/queue.json", queue);
  actions.push({ step: "seed_queue", ok: true, seeded });
  queued = posts.filter((p) => p.status === "queued");
}

// 4) Optional publish next (free LLM pipeline)
let published = null;
if (DO_PUBLISH && queued.length > 0) {
  try {
    const out = execSync("node scripts/publish-next.mjs", {
      cwd: ROOT,
      encoding: "utf8",
      env: {
        ...process.env,
        AF_ZERO_COST: "1",
        AF_USE_LLM: process.env.GEMINI_API_KEY ? "1" : "0",
        SITE_URL: primary,
        BASE_PATH: "",
      },
    });
    published = out.trim().slice(0, 500);
    execSync("node scripts/build-blog.mjs && node scripts/build-sitemap.mjs", {
      cwd: ROOT,
      encoding: "utf8",
      env: { ...process.env, SITE_URL: primary, BASE_PATH: "" },
    });
    // Rebuild GH-pages-friendly paths are in source; prepare-vercel handles Vercel on deploy
    actions.push({ step: "publish_next", ok: true, detail: published });
  } catch (e) {
    actions.push({ step: "publish_next", ok: false, error: String(e.message || e).slice(0, 300) });
  }
}

// 5) KPI snapshot file for HQ
const kpi = {
  at: now,
  cycle: (state.cycleCount || 0) + 1,
  health,
  queued: readJson("content/queue.json", { posts: [] }).posts?.filter((p) => p.status === "queued")
    .length,
  publishedCount: readJson("content/queue.json", { posts: [] }).posts?.filter(
    (p) => p.status === "published"
  ).length,
  zeroCost: ZERO,
  primary,
};
writeJson("agents/memory/kpi-latest.json", kpi);

// 6) State
const q2 = readJson("content/queue.json", { posts: [] });
state.cycleCount = (state.cycleCount || 0) + 1;
state.lastCycle = {
  at: now,
  platform: "full-radius",
  health,
  queued: (q2.posts || []).filter((p) => p.status === "queued").length,
  actions: actions.length,
  published: Boolean(published),
};
state.runtime = {
  host: "vercel+github-actions",
  primaryUrl: primary,
  autonomous: "scripts/agent-autonomous.mjs",
  zeroCost: ZERO,
  lastFullRadiusAt: now,
};
writeJson("agents/company-state.json", state);

fs.mkdirSync(path.join(ROOT, "agents/logs"), { recursive: true });
const log = {
  at: now,
  health,
  planText,
  actions,
  cycleCount: state.cycleCount,
  zeroCost: ZERO,
  published,
};
fs.writeFileSync(
  path.join(ROOT, `agents/logs/autonomous-gha-${today}.json`),
  JSON.stringify(log, null, 2) + "\n"
);

console.log(
  JSON.stringify(
    {
      ok: true,
      platform: "full-radius",
      cycleCount: state.cycleCount,
      health,
      hasPlan: Boolean(planText),
      actions,
      seeded,
    },
    null,
    2
  )
);
