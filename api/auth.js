/**
 * Consolidated auth handler (Hobby plan function limit).
 * Routes: /api/auth  POST {action} | GET me
 * Also accepts legacy paths via rewrites: /api/auth/signup etc.
 */
import { cors, json } from "./lib/runtime.mjs";
import {
  createUser,
  authenticate,
  issueSession,
  setSessionCookie,
  clearSessionCookie,
  publicUser,
  readBody,
  sessionFromRequest,
  getUserById,
  listProjectsForUser,
} from "./lib/auth.mjs";

function opFromReq(req) {
  const url = String(req.url || "");
  if (url.includes("/signup")) return "signup";
  if (url.includes("/login")) return "login";
  if (url.includes("/logout")) return "logout";
  if (url.includes("/me")) return "me";
  const q = req.query?.op || req.query?.action;
  if (q) return String(q);
  return null;
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();

  try {
    let op = opFromReq(req);
    if (req.method === "GET" && (!op || op === "me")) {
      const sess = sessionFromRequest(req);
      if (!sess?.sub) return json(res, 401, { ok: false, error: "Not signed in" });
      const user = await getUserById(sess.sub);
      if (!user) return json(res, 401, { ok: false, error: "Session expired" });
      const projects = await listProjectsForUser(user.id);
      return json(res, 200, {
        ok: true,
        user: publicUser(user),
        projects,
        services: user.services || {},
        revenue: user.revenue || {},
        plans: {
          free: {
            name: "Free Forge",
            priceUsd: 0,
            projects: 2,
            features: ["Cluster checklist", "Money wiring guide", "1 AI brief/day"],
          },
          forge: {
            name: "Forge Pro",
            priceUsd: 49,
            projects: 10,
            features: [
              "Full Money OS templates",
              "Affiliate stack setup",
              "Weekly content pipeline",
              "Priority support queue",
            ],
          },
          agency: {
            name: "Agency OS",
            priceUsd: 199,
            projects: 50,
            features: [
              "Client workspaces",
              "White-label runbooks",
              "Design system delivery",
              "Operator co-pilot notes",
            ],
          },
        },
      });
    }

    if (req.method !== "POST") {
      return json(res, 405, { error: "GET me | POST { action: signup|login|logout }" });
    }

    const body = await readBody(req);
    op = op || body.action || body.op;
    if (op === "signup") {
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
        next: "/app/onboard/",
      });
    }
    if (op === "login") {
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
    }
    if (op === "logout") {
      clearSessionCookie(res);
      return json(res, 200, { ok: true });
    }
    return json(res, 400, { error: "Unknown action. Use signup|login|logout|me" });
  } catch (e) {
    return json(res, 500, { ok: false, error: String(e.message || e) });
  }
}
