#!/usr/bin/env node
/**
 * Publish the next queued topic from content/queue.json into content/posts/.
 * Uses template generation by default. If OPENAI_API_KEY is set, can expand body (optional).
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT, today, slugify, write } from "./lib.mjs";

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
if (process.env.OPENAI_API_KEY && process.env.AF_USE_LLM === "1") {
  body = await generateWithLlm(next, outline);
} else {
  body = generateTemplate(next, outline);
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
---

${body}
`;

const outRel = `content/posts/${slug}.md`;
if (fs.existsSync(path.join(ROOT, outRel))) {
  console.error(`Post already exists: ${outRel}`);
  process.exit(1);
}
write(outRel, md);

// mark queue item published
next.status = "published";
next.published_at = date;
next.published_path = outRel;
fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + "\n");

console.log(JSON.stringify({ published: slug, path: outRel, remaining: queue.posts.filter((p) => p.status === "queued").length }, null, 2));

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
    `*Published by the AuthorityForge content pipeline from queue id \`${item.id || slugify(item.title)}\`.*`
  );
  return lines.join("\n");
}

async function generateWithLlm(item, outline) {
  // Optional: only when AF_USE_LLM=1 and OPENAI_API_KEY set
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.AF_LLM_MODEL || "gpt-4o-mini",
        temperature: 0.5,
        messages: [
          {
            role: "system",
            content:
              "You write practical SEO/AI productivity articles for AuthorityForge. Use markdown. Start with a bold Direct answer paragraph. No fake stats. No hype. Link style: [label](/path/).",
          },
          {
            role: "user",
            content: `Title: ${item.title}\nDescription: ${item.description}\nOutline:\n${outline.map((o) => `- ${o}`).join("\n")}\nHub: ${item.hub || "/blog/"}`,
          },
        ],
      }),
    });
    if (!res.ok) throw new Error(`LLM HTTP ${res.status}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || generateTemplate(item, outline);
  } catch (e) {
    console.warn("LLM failed, using template:", e.message);
    return generateTemplate(item, outline);
  }
}

function escapeYaml(s) {
  return String(s).replace(/"/g, '\\"');
}
