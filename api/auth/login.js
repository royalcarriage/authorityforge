import { cors, json } from "../lib/runtime.mjs";
import {
  authenticate,
  issueSession,
  setSessionCookie,
  publicUser,
  readBody,
} from "../lib/auth.mjs";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  if (req.method !== "POST") return json(res, 405, { error: "POST JSON { email, password }" });
  try {
    const body = await readBody(req);
    const result = await authenticate(body.email, body.password);
    if (!result.ok) return json(res, 401, result);
    const token = issueSession(result.user);
    setSessionCookie(res, token);
    const next =
      result.user.role === "operator" ? "/app/admin/" : "/app/dashboard/";
    return json(res, 200, {
      ok: true,
      user: publicUser(result.user),
      token,
      next,
    });
  } catch (e) {
    return json(res, 500, { ok: false, error: String(e.message || e) });
  }
}
