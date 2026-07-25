import { cors, json, freeGemini } from "../lib/runtime.mjs";
import { sessionFromRequest, readBody } from "../lib/auth.mjs";

/** Free AI brief for signed-in customers (Gemini free / template). */
export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  if (req.method !== "POST") return json(res, 405, { error: "POST { topic }" });
  try {
    const sess = sessionFromRequest(req);
    if (!sess?.sub) return json(res, 401, { ok: false, error: "Sign in required" });
    const body = await readBody(req);
    const topic = String(body.topic || "").trim().slice(0, 200);
    if (!topic) return json(res, 400, { error: "topic required" });

    const prompt = `Write a tight SEO money brief for a content site operator.
Topic: ${topic}
Include:
1) Primary search intent (one sentence)
2) Hub page angle
3) 6 spoke page titles (commercial where possible)
4) Monetization path (affiliates first, AdSense later)
5) One measurement loop metric to watch
No fake stats. Max 350 words.`;

    const llm = await freeGemini(prompt, {
      system:
        "You are AuthorityForge. Practical, specific, zero fluff. Disclose affiliates when recommending tools.",
    });

    const text =
      llm.text ||
      [
        `# Brief: ${topic}`,
        ``,
        `**Intent:** Operators want a clear system to rank and monetize ${topic}.`,
        `**Hub:** Own the category with a playbook-style hub (definition + process + tools).`,
        `**Spokes:** How-to, compare, stack, checklist, mistakes, case-style narrative (no fake results).`,
        `**Money:** Affiliates on tool pages first; AdSense after quality traffic.`,
        `**Measure:** GSC impressions → CTR rewrites weekly on the hub.`,
      ].join("\n");

    return json(res, 200, {
      ok: true,
      topic,
      provider: llm.provider || "template",
      costUsd: llm.costUsd ?? 0,
      text,
    });
  } catch (e) {
    return json(res, 500, { ok: false, error: String(e.message || e) });
  }
}
