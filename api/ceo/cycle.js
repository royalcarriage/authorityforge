export const config = { runtime: "nodejs", maxDuration: 60 };

import { cors, json, requireAgentAuth, runCeoCycle } from "../lib/runtime.mjs";

/**
 * Vercel Cron + manual trigger.
 * Auth: Authorization: Bearer $AF_AGENT_SECRET  or ?secret=
 * Cron: Vercel sends Authorization: Bearer $CRON_SECRET when configured.
 */
export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  if (req.method !== "GET" && req.method !== "POST") {
    return json(res, 405, { error: "GET or POST" });
  }

  const auth = requireAgentAuth(req);
  // If secret configured, require it for cycle (mutates / burns free quota)
  if (process.env.AF_AGENT_SECRET || process.env.CRON_SECRET) {
    if (!auth.ok) return json(res, 401, { error: "unauthorized" });
  }

  try {
    const withLlm = req.query?.llm !== "0";
    const report = await runCeoCycle({ withLlm });
    return json(res, 200, { ok: true, report });
  } catch (e) {
    return json(res, 500, { ok: false, error: String(e.message || e) });
  }
}
