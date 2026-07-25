#!/usr/bin/env node
/**
 * Autonomous company cycle for GitHub Actions (primary durable runner).
 * Uses free Gemini + git commits. Zero paid APIs.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const today = new Date().toISOString().slice(0, 10);
const now = new Date().toISOString();
const ZERO = process.env.AF_ZERO_COST !== "0";

function readJson(rel, fb) {
  try { return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8")); }
  catch { return fb; }
}
function writeJson(rel, obj) {
  fs.writeFileSync(path.join(ROOT, rel), JSON.stringify(obj, null, 2) + "\n");
}

async function gemini(prompt) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  for (const m of ["gemini-2.0-flash-lite", "gemini-2.0-flash", "gemini-2.5-flash-lite"]) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${encodeURIComponent(key)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 1200, temperature: 0.5 },
          }),
        }
      );
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join("");
      if (text) return text;
    } catch { /* next */ }
  }
  return null;
}

// Health
const primary = process.env.AF_PRIMARY_URL || "https://authorityforge-tau.vercel.app";
const health = {};
for (const p of ["/", "/ads.txt", "/company/", "/css/styles.css"]) {
  try {
    const code = execSync(`curl -sS -o /dev/null -w "%{http_code}" -L --max-time 12 "${primary}${p}"`, { encoding: "utf8" }).trim();
    health[p] = code;
  } catch { health[p] = "ERR"; }
}

const state = readJson("agents/company-state.json", {});
const queue = readJson("content/queue.json", { posts: [] });
const queued = (queue.posts || []).filter((p) => p.status === "queued");

// Free LLM plan
const planText = await gemini(`AuthorityForge autonomous agent. Zero paid APIs.
Health: ${JSON.stringify(health)}. Queued posts: ${queued.length}.
List 5 concrete improvements as bullets for a content SEO affiliate site.`);

// Research log
const researchPath = path.join(ROOT, "agents/memory/research-log.md");
fs.appendFileSync(
  researchPath,
  `\n### Autonomous GHA cycle ${now}\n- health: ${JSON.stringify(health)}\n- queued: ${queued.length}\n- zeroCost: ${ZERO}\n- plan:\n${planText || "(no gemini key — template mode)"}\n`
);

// Refill queue if thin
if (queued.length < 5) {
  const id = `auto-gha-${today.replace(/-/g, "")}`;
  if (!(queue.posts || []).some((p) => p.id === id)) {
    queue.posts = queue.posts || [];
    queue.posts.push({
      id,
      slug: id,
      title: `Autonomous Ops Notes ${today}`,
      description: "System-generated topic from Vercel/GitHub autonomous cycle.",
      tags: ["agents", "ops"],
      hub: "/systems/agent-company/",
      status: "queued",
      outline: ["Status", "Improvements", "Next experiments"],
      source: "gha-autonomous",
    });
    writeJson("content/queue.json", queue);
  }
}

// State
state.cycleCount = (state.cycleCount || 0) + 1;
state.lastCycle = { at: now, platform: "github-actions", health, queued: queued.length };
state.runtime = {
  host: "vercel+github-actions",
  primaryUrl: primary,
  autonomous: "scripts/agent-autonomous.mjs",
  zeroCost: ZERO,
};
writeJson("agents/company-state.json", state);

// Log
fs.mkdirSync(path.join(ROOT, "agents/logs"), { recursive: true });
fs.writeFileSync(
  path.join(ROOT, `agents/logs/autonomous-gha-${today}.json`),
  JSON.stringify({ at: now, health, planText, cycleCount: state.cycleCount, zeroCost: ZERO }, null, 2) + "\n"
);

console.log(JSON.stringify({ ok: true, platform: "github-actions", cycleCount: state.cycleCount, health, hasPlan: Boolean(planText) }, null, 2));
