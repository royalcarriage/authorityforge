import { cors, json, companySnapshot } from "./lib/runtime.mjs";

/** Lightweight health — no outbound fetches (avoids FUNCTION_INVOCATION_FAILED) */
export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  try {
    const snap = companySnapshot();
    return json(res, 200, {
      ok: true,
      platform: "vercel",
      zeroCost: snap.zeroCost,
      cycleCount: snap.cycleCount,
      company: snap.company?.name || "AuthorityForge",
      gemini: snap.llm?.geminiKeyConfigured || false,
      content: snap.content,
      generatedAt: new Date().toISOString(),
    });
  } catch (e) {
    return json(res, 200, {
      ok: false,
      platform: "vercel",
      error: String(e.message || e),
    });
  }
}
