#!/usr/bin/env node
/**
 * Zero-cost LLM router for AuthorityForge.
 *
 * DEFAULT: never call paid OpenAI / Anthropic / paid Vercel AI.
 * Order:
 *   1) Ollama local (free)
 *   2) Gemini free tier (GEMINI_API_KEY — free quota)
 *   3) OpenCode CLI if available (free models when configured)
 *   4) null → caller uses template (free)
 *
 * Force: AF_LLM_PROVIDER=ollama|gemini|opencode|none
 * Kill paid: AF_ZERO_COST=1 (default on). Set AF_ZERO_COST=0 only after revenue + explicit policy.
 */
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ZERO =
  process.env.AF_ZERO_COST !== "0" && process.env.AF_ALLOW_PAID_LLM !== "1";

export function zeroCostMode() {
  return ZERO;
}

export async function freeComplete(prompt, opts = {}) {
  const maxTokens = opts.maxTokens || 1200;
  const system =
    opts.system ||
    "You write practical SEO/AI-productivity content. No invented statistics. Short paragraphs. Include a direct-answer first sentence.";

  if (ZERO && (process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY)) {
    // Ignore paid keys while zero-cost is on
  }

  const force = (process.env.AF_LLM_PROVIDER || "").toLowerCase();
  const order =
    force && force !== "auto"
      ? [force]
      : ["ollama", "gemini", "opencode", "none"];

  const errors = [];
  for (const p of order) {
    try {
      if (p === "ollama") {
        const text = await viaOllama(prompt, system, maxTokens);
        if (text) return { provider: "ollama", text, costUsd: 0 };
      } else if (p === "gemini") {
        const text = await viaGemini(prompt, system, maxTokens);
        if (text) return { provider: "gemini", text, costUsd: 0 };
      } else if (p === "opencode") {
        const text = await viaOpencode(prompt, system);
        if (text) return { provider: "opencode", text, costUsd: 0 };
      } else if (p === "none") {
        return { provider: "none", text: null, costUsd: 0 };
      }
    } catch (e) {
      errors.push(`${p}: ${e.message || e}`);
    }
  }
  return { provider: "none", text: null, costUsd: 0, errors };
}

async function viaOllama(prompt, system, maxTokens) {
  // Prefer an installed local model (see `ollama list`)
  let model = process.env.AF_OLLAMA_MODEL || "";
  if (!model) {
    try {
      const list = spawnSync("ollama", ["list"], { encoding: "utf8", timeout: 5000 });
      if (list.status !== 0) return null;
      const lines = (list.stdout || "").split("\n").slice(1).map((l) => l.split(/\s+/)[0]).filter(Boolean);
      model =
        lines.find((n) => /qwen2\.5:14b/i.test(n)) ||
        lines.find((n) => /qwen2\.5-coder/i.test(n)) ||
        lines.find((n) => /qwen/i.test(n)) ||
        lines.find((n) => /llama/i.test(n)) ||
        lines[0];
      if (!model) return null;
    } catch {
      return null;
    }
  }
  const body = {
    model,
    stream: false,
    options: { num_predict: maxTokens },
    messages: [
      { role: "system", content: system },
      { role: "user", content: prompt },
    ],
  };
  const res = await fetch("http://127.0.0.1:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) return null;
  const data = await res.json();
  const text = data.message?.content || data.response || "";
  return text.trim() || null;
}

async function viaGemini(prompt, system, maxTokens) {
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!key) return null;
  // Free-tier friendly model names (listed via ModelService for this key)
  const models = [
    process.env.AF_GEMINI_MODEL,
    "gemini-2.0-flash-lite",
    "gemini-2.0-flash",
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash",
    "gemini-flash-lite-latest",
    "gemini-flash-latest",
  ].filter(Boolean);

  let lastErr;
  for (const m of [...new Set(models)]) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${encodeURIComponent(key)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${system}\n\n---\n\n${prompt}` }],
            },
          ],
          generationConfig: {
            maxOutputTokens: maxTokens,
            temperature: 0.7,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        lastErr = data.error?.message || res.statusText;
        continue;
      }
      const text = data.candidates?.[0]?.content?.parts
        ?.map((p) => p.text)
        .join("")
        ?.trim();
      if (text) return text;
    } catch (e) {
      lastErr = e.message;
    }
  }
  if (lastErr) throw new Error(lastErr);
  return null;
}

async function viaOpencode(prompt, system) {
  // Non-interactive best-effort; many opencode builds need TTY.
  try {
    const r = spawnSync(
      "opencode",
      ["run", "--", `${system}\n\n${prompt}`.slice(0, 4000)],
      { encoding: "utf8", timeout: 120000, env: { ...process.env } }
    );
    if (r.status === 0 && r.stdout && r.stdout.trim().length > 80) {
      return r.stdout.trim();
    }
  } catch {
    /* ignore */
  }
  return null;
}

// CLI smoke test
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("free-llm.mjs")) {
  const prompt = process.argv.slice(2).join(" ") || "Say hello in one sentence about free SEO agents.";
  const r = await freeComplete(prompt, { maxTokens: 100 });
  console.log(JSON.stringify({ zeroCost: ZERO, ...r, textPreview: (r.text || "").slice(0, 200) }, null, 2));
}
