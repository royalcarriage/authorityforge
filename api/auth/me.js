import { cors, json } from "../lib/runtime.mjs";
import {
  sessionFromRequest,
  getUserById,
  listProjectsForUser,
  publicUser,
} from "../lib/auth.mjs";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  if (req.method !== "GET") return json(res, 405, { error: "GET only" });
  try {
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
  } catch (e) {
    return json(res, 500, { ok: false, error: String(e.message || e) });
  }
}
