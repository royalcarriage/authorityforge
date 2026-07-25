export const config = { runtime: "nodejs" };

import { cors, json, requireAgentAuth, freeGemini, readJson, ROOT } from "../lib/runtime.js";
import fs from "node:fs";
import path from "node:path";

/**
 * Publish next queue item using free Gemini or template.
 * Does not git-push unless AF_GITHUB_TOKEN set (optional future).
 * Returns markdown + metadata for CI/agent to commit.
 */
export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  if (req.method !== "POST" && req.method !== "GET") {
    return json(res, 405, { error: "GET or POST" });
  }
  if (process.env.AF_AGENT_SECRET || process.env.CRON_SECRET) {
    const auth = requireAgentAuth(req);
    if (!auth.ok) return json(res, 401, { error: "unauthorized" });
  }

  const queuePath = path.join(ROOT, "content/queue.json");
  const queue = readJson("content/queue.json", { posts: [] });
  const next = (queue.posts || []).find((p) => p.status === "queued");
  if (!next) return json(res, 200, { ok: true, published: null, message: "queue empty" });

  const outline = next.outline || ["Introduction", "Key steps", "Next actions"];
  let body;
  let provider = "template";

  const useLlm = process.env.AF_USE_LLM !== "0";
  if (useLlm) {
    const r = await freeGemini(
      `Write a markdown article for AuthorityForge.
Title: ${next.title}
Description: ${next.description || ""}
Outline:
${outline.map((o) => `- ${o}`).join("\n")}
Start with **Direct answer:** No fake stats. Under 800 words. Link /legal/affiliate-disclosure/ and hub ${next.hub || "/blog/"}.`,
      { maxTokens: 1600 }
    );
    if (r.text && r.text.length > 200) {
      body = r.text;
      provider = r.provider;
    }
  }
  if (!body) {
    body = templateBody(next, outline);
  }

  const date = new Date().toISOString().slice(0, 10);
  const slug = next.slug || slugify(next.title);
  const md = `---
title: "${esc(next.title)}"
description: "${esc(next.description || next.title)}"
date: "${date}"
slug: "${slug}"
tags: [${(next.tags || []).map((t) => `"${t}"`).join(", ")}]
hub: "${next.hub || "/blog/"}"
status: published
source: vercel-api
llm_provider: "${provider}"
llm_cost_usd: 0
---

${body}
`;

  // Mark published in memory response — durable write needs git token workflow
  next.status = "published";
  next.published_at = date;
  next.llm_provider = provider;

  return json(res, 200, {
    ok: true,
    zeroCost: true,
    provider,
    slug,
    path: `content/posts/${slug}.md`,
    markdown: md,
    remainingQueued: (queue.posts || []).filter((p) => p.status === "queued").length,
    note: "Commit markdown via GitHub Action or AF_GITHUB_TOKEN pipeline for durable publish.",
  });
}

function templateBody(item, outline) {
  const lines = [
    `**Direct answer:** ${item.description || item.title}`,
    "",
  ];
  for (const s of outline) {
    lines.push(`## ${s}`, "", `Apply **${s}** this week, then measure.`, "");
  }
  lines.push(
    "## Next step",
    "",
    `See [affiliate disclosure](/legal/affiliate-disclosure/). Hub: [${item.hub || "/blog/"}](${item.hub || "/blog/"}).`
  );
  return lines.join("\n");
}
function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}
function esc(s) {
  return String(s).replace(/"/g, '\\"');
}
