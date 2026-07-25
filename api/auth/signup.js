import { cors, json } from "../lib/runtime.mjs";
import {
  createUser,
  issueSession,
  setSessionCookie,
  publicUser,
  readBody,
} from "../lib/auth.mjs";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  if (req.method !== "POST") return json(res, 405, { error: "POST JSON { email, password, name? }" });
  try {
    const body = await readBody(req);
    const result = await createUser({
      email: body.email,
      password: body.password,
      name: body.name,
    });
    if (!result.ok) return json(res, 400, result);
    const token = issueSession(result.user);
    setSessionCookie(res, token);
    return json(res, 201, {
      ok: true,
      user: publicUser(result.user),
      token,
      storeVia: result.storeVia,
      next: "/app/dashboard/",
    });
  } catch (e) {
    return json(res, 500, { ok: false, error: String(e.message || e) });
  }
}
