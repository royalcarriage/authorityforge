import { cors, json, requireAgentAuth, freeGemini } from "../lib/runtime.mjs";

/** Free Gemini complete — paid models refused */
export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  if (req.method !== "POST") return json(res, 405, { error: "POST JSON { prompt }" });

  if (process.env.AF_AGENT_SECRET) {
    const auth = requireAgentAuth(req);
    if (!auth.ok) return json(res, 401, { error: "unauthorized" });
  }

  if (process.env.AF_ZERO_COST === "0" && process.env.AF_ALLOW_PAID_LLM === "1") {
    // still free-first
  }

  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch {
    body = {};
  }
  // Vercel may not parse body for all runtimes
  if (!body.prompt && req.method === "POST") {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    try {
      body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
    } catch {
      body = {};
    }
  }

  const prompt = body.prompt || body.text;
  if (!prompt) return json(res, 400, { error: "prompt required" });

  const r = await freeGemini(prompt, {
    maxTokens: body.maxTokens || 1024,
    system: body.system,
  });
  return json(res, 200, {
    ok: Boolean(r.text),
    zeroCost: true,
    paidBlocked: true,
    ...r,
  });
}
