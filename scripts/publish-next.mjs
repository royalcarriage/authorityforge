#!/usr/bin/env node
/**
 * Publish the next queued topic from content/queue.json into content/posts/.
 *
 * LLM policy (zero-cost by default):
 *   - Uses scripts/free-llm.mjs (Ollama → Gemini free → OpenCode → template)
 *   - NEVER calls OpenAI/Anthropic while AF_ZERO_COST≠0 (default)
 *   - AF_USE_LLM=0 forces template only
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT, today, slugify, write } from "./lib.mjs";
import { freeComplete, zeroCostMode } from "./free-llm.mjs";

const queuePath = path.join(ROOT, "content/queue.json");
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const next = (queue.posts || []).find((p) => p.status === "queued");

if (!next) {
  console.log("No queued posts. Add items to content/queue.json with status: queued");
  process.exit(0);
}

const slug = next.slug || slugify(next.title);
const date = today();
const outline = next.outline || ["Introduction", "Key steps", "Common mistakes", "Next actions"];

let body;
let llmMeta = { provider: "template", costUsd: 0 };
if (process.env.AF_USE_LLM === "0") {
  body = generateTemplate(next, outline);
} else {
  const result = await generateWithFreeLlm(next, outline);
  body = result.body;
  llmMeta = result.meta;
}

const md = `---
title: "${escapeYaml(next.title)}"
description: "${escapeYaml(next.description || next.title)}"
date: "${date}"
slug: "${slug}"
tags: [${(next.tags || []).map((t) => `"${t}"`).join(", ")}]
hub: "${next.hub || "/blog/"}"
status: published
source: content-pipeline
llm_provider: "${llmMeta.provider}"
llm_cost_usd: ${llmMeta.costUsd || 0}
zero_cost_mode: ${zeroCostMode()}
---

${body}
`;

const outRel = `content/posts/${slug}.md`;
if (fs.existsSync(path.join(ROOT, outRel))) {
  console.error(`Post already exists: ${outRel}`);
  process.exit(1);
}
write(outRel, md);

next.status = "published";
next.published_at = date;
next.published_path = outRel;
next.llm_provider = llmMeta.provider;
fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + "\n");

console.log(
  JSON.stringify(
    {
      published: slug,
      path: outRel,
      llm: llmMeta,
      zeroCost: zeroCostMode(),
      remaining: queue.posts.filter((p) => p.status === "queued").length,
    },
    null,
    2
  )
);

function generateTemplate(item, outline) {
  const lines = [];
  lines.push(
    `**Direct answer:** ${item.description || item.title} This post is part of the AuthorityForge cluster and links back to the related system hub.`
  );
  lines.push("");
  for (const section of outline) {
    lines.push(`## ${section}`);
    lines.push("");
    lines.push(
      `${section} matters because durable rankings come from systems, not one-off posts. Apply this section on your own site this week, then measure impressions and CTR.`
    );
    lines.push("");
    lines.push(
      `- Define the owner URL for this intent\n- Ship one concrete improvement\n- Link to the hub: [${item.hub || "/blog/"}](${item.hub || "/blog/"})`
    );
    lines.push("");
  }
  lines.push("## Next step");
  lines.push("");
  lines.push(
    `See [affiliate disclosure](/legal/affiliate-disclosure/) when recommending tools. Return to the [Search Authority Playbook](/guide/search-authority-playbook/) or browse the [blog cluster](/blog/).`
  );
  lines.push("");
  lines.push(
    `*Published by the AuthorityForge content pipeline (zero-cost template path) from queue id \`${item.id || slugify(item.title)}\`.*`
  );
  return lines.join("\n");
}

async function generateWithFreeLlm(item, outline) {
  const prompt = `Write a markdown article for AuthorityForge, a site read by hands-on SEO operators.

Title: ${item.title}
Description: ${item.description || ""}
Outline sections:
${outline.map((o) => `- ${o}`).join("\n")}
Hub path: ${item.hub || "/blog/"}

Voice rules (strict):
- Start with **Direct answer:** one specific paragraph (40-60 words) a search engine could quote verbatim.
- Use ## for each outline section.
- Every section must contain at least one CONCRETE element: an exact step, a number, a named tool setting, a short example, or a checklist. Never a paragraph of pure generalities.
- Where two or more options are compared, use a small markdown table with real criteria.
- BANNED words/phrases (never use): seamless, seamlessly, robust, crucial, comprehensive, leverage, elevate, delve, landscape, game-changer, unlock, supercharge, "in today's world", "it's essential to", "look no further".
- No invented statistics, no fake reviews, no hype.
- Write like an operator sharing a working procedure, not a brochure.
- End with a "## Next step" section linking the hub path, /legal/affiliate-disclosure/, and /blog/.
- 900–1300 words.`;

  try {
    const r = await freeComplete(prompt, { maxTokens: 2600 });
    if (r.text && r.text.length > 200) {
      return {
        body: r.text,
        meta: { provider: r.provider, costUsd: 0 },
      };
    }
    console.warn("Free LLM empty/short; using template. errors=", r.errors || []);
  } catch (e) {
    console.warn("Free LLM failed; using template:", e.message);
  }
  return { body: generateTemplate(item, outline), meta: { provider: "template", costUsd: 0 } };
}

function escapeYaml(s) {
  return String(s).replace(/"/g, '\\"');
}
