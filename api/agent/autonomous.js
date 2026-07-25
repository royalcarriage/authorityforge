export const config = { runtime: "nodejs", maxDuration: 60 };

import { cors, json, requireAgentAuth } from "../lib/runtime.mjs";
import { runAutonomousCycle } from "../lib/autonomous.mjs";

/**
 * Full autonomous improve cycle inside Vercel.
 * GET/POST /api/agent/autonomous
 * Auth: Bearer AF_AGENT_SECRET (recommended)
 *
 * Env:
 *  AF_GITHUB_TOKEN — required to write/upgrade repo
 *  GEMINI_API_KEY — free planning
 *  AF_AGENT_AUTONOMY — pr (default) | full | plan_only
 *  AF_ZERO_COST=1
 */
export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  if (req.method !== "GET" && req.method !== "POST") {
    return json(res, 405, { error: "GET or POST" });
  }

  if (process.env.AF_AGENT_SECRET || process.env.CRON_SECRET) {
    const auth = requireAgentAuth(req);
    if (!auth.ok) return json(res, 401, { error: "unauthorized — set AF_AGENT_SECRET" });
  }

  try {
    const report = await runAutonomousCycle({
      maxSteps: req.query?.steps || 4,
    });
    return json(res, 200, { ok: true, report });
  } catch (e) {
    return json(res, 500, { ok: false, error: String(e.message || e) });
  }
}
