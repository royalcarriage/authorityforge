import { cors, json, companySnapshot } from "../lib/runtime.mjs";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  if (req.method !== "GET") return json(res, 405, { error: "GET only" });
  try {
    return json(res, 200, companySnapshot());
  } catch (e) {
    return json(res, 500, { ok: false, error: String(e.message || e) });
  }
}
