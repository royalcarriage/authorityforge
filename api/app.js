/**
 * Consolidated customer/operator app API (Hobby function limit).
 * GET/POST /api/app  body.action = projects|checklist|brief|admin
 */
import { cors, json, freeGemini, companySnapshot } from "./lib/runtime.mjs";
import {
  sessionFromRequest,
  createProject,
  updateChecklist,
  listProjectsForUser,
  operatorSnapshot,
  readBody,
} from "./lib/auth.mjs";

function opFromReq(req, body) {
  const url = String(req.url || "");
  if (url.includes("/projects")) return body?.action === "checklist" ? "checklist" : "projects";
  if (url.includes("/admin")) return "admin";
  if (url.includes("/brief")) return "brief";
  return body?.action || body?.op || (req.method === "GET" ? "projects" : null);
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();

  try {
    const sess = sessionFromRequest(req);
    if (!sess?.sub) return json(res, 401, { ok: false, error: "Sign in required" });

    let body = {};
    if (req.method === "POST") body = await readBody(req);
    const op = opFromReq(req, body);

    if (req.method === "GET" && (op === "projects" || !op)) {
      const projects = await listProjectsForUser(sess.sub);
      return json(res, 200, { ok: true, projects });
    }

    if (op === "admin" || (req.method === "GET" && String(req.url || "").includes("admin"))) {
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
    }

    if (req.method === "GET") {
      const projects = await listProjectsForUser(sess.sub);
      return json(res, 200, { ok: true, projects });
    }

    if (req.method !== "POST") return json(res, 405, { error: "POST required for this action" });

    if (op === "checklist") {
      const r = await updateChecklist(
        sess.sub,
        body.projectId,
        body.itemId,
        body.done
      );
      if (!r.ok) return json(res, 400, r);
      return json(res, 200, r);
    }

    if (op === "projects" || op === "create") {
      const r = await createProject(sess.sub, {
        name: body.name,
        type: body.type,
      });
      if (!r.ok) return json(res, r.upgrade ? 402 : 400, r);
      return json(res, 201, r);
    }

    if (op === "brief") {
      const topic = String(body.topic || "").trim().slice(0, 200);
      if (!topic) return json(res, 400, { error: "topic required" });
      const prompt = `Write a tight SEO money brief for a content site operator.
Topic: ${topic}
Include:
1) Primary search intent (one sentence)
2) Hub page angle
3) 6 spoke page titles (commercial where possible)
4) Monetization path (affiliates first, AdSense later)
5) One measurement loop metric to watch
No fake stats. Max 350 words.`;
      const llm = await freeGemini(prompt, {
        system:
          "You are AuthorityForge. Practical, specific, zero fluff. Disclose affiliates when recommending tools.",
      });
      const text =
        llm.text ||
        [
          `# Brief: ${topic}`,
          ``,
          `**Intent:** Operators want a clear system to rank and monetize ${topic}.`,
          `**Hub:** Own the category with a playbook-style hub.`,
          `**Spokes:** How-to, compare, stack, checklist, mistakes, narrative.`,
          `**Money:** Affiliates first; AdSense after quality traffic.`,
          `**Measure:** GSC impressions → CTR rewrites weekly.`,
        ].join("\n");
      return json(res, 200, {
        ok: true,
        topic,
        provider: llm.provider || "template",
        costUsd: llm.costUsd ?? 0,
        text,
      });
    }

    return json(res, 400, {
      error: "Unknown action. Use projects|checklist|brief|admin",
    });
  } catch (e) {
    return json(res, 500, { ok: false, error: String(e.message || e) });
  }
}
