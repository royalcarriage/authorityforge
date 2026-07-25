import { cors, json } from "../lib/runtime.mjs";
import {
  sessionFromRequest,
  createProject,
  updateChecklist,
  listProjectsForUser,
  readBody,
} from "../lib/auth.mjs";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  const sess = sessionFromRequest(req);
  if (!sess?.sub) return json(res, 401, { ok: false, error: "Sign in required" });

  try {
    if (req.method === "GET") {
      const projects = await listProjectsForUser(sess.sub);
      return json(res, 200, { ok: true, projects });
    }
    if (req.method === "POST") {
      const body = await readBody(req);
      if (body.action === "checklist") {
        const r = await updateChecklist(
          sess.sub,
          body.projectId,
          body.itemId,
          body.done
        );
        if (!r.ok) return json(res, 400, r);
        return json(res, 200, r);
      }
      const r = await createProject(sess.sub, {
        name: body.name,
        type: body.type,
      });
      if (!r.ok) return json(res, r.upgrade ? 402 : 400, r);
      return json(res, 201, r);
    }
    return json(res, 405, { error: "GET or POST" });
  } catch (e) {
    return json(res, 500, { ok: false, error: String(e.message || e) });
  }
}
