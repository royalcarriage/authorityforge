import { cors, json } from "../lib/runtime.mjs";
import { clearSessionCookie } from "../lib/auth.mjs";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  clearSessionCookie(res);
  return json(res, 200, { ok: true });
}
