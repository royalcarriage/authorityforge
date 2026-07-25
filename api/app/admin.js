import { cors, json } from "../lib/runtime.mjs";
import { sessionFromRequest, operatorSnapshot } from "../lib/auth.mjs";
import { companySnapshot } from "../lib/runtime.mjs";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  if (req.method !== "GET") return json(res, 405, { error: "GET only" });
  try {
    const sess = sessionFromRequest(req);
    if (!sess?.sub) return json(res, 401, { ok: false, error: "Sign in required" });
    if (sess.role !== "operator") {
      return json(res, 403, { ok: false, error: "Operator only" });
    }
    const snap = await operatorSnapshot();
    let company = null;
    try {
      company = companySnapshot();
    } catch {
      company = null;
    }
    return json(res, 200, {
      ok: true,
      admin: snap,
      live: company,
      money: {
        adsense: "getting_ready",
        affiliatesEnabledMin: 3,
        note: "No auto money moves — approval-queue only",
      },
    });
  } catch (e) {
    return json(res, 500, { ok: false, error: String(e.message || e) });
  }
}
