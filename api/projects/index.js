import { cors, json, readJson, requireAgentAuth } from "../lib/runtime.mjs";
import * as gh from "../lib/github.mjs";

/** List / register sister projects the primary agent may operate */
export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();

  if (req.method === "GET") {
    const projects = readJson("agents/control-plane/projects.json", {});
    return json(res, 200, { ok: true, ...projects });
  }

  if (req.method === "POST") {
    if (process.env.AF_AGENT_SECRET) {
      const auth = requireAgentAuth(req);
      if (!auth.ok) return json(res, 401, { error: "unauthorized" });
    }
    let body = {};
    try {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
    } catch {
      body = {};
    }
    if (!body.id || !body.repo) {
      return json(res, 400, { error: "id and repo required" });
    }
    if (!gh.githubConfigured()) {
      return json(res, 400, {
        error: "AF_GITHUB_TOKEN required to persist sister project",
        draft: body,
      });
    }
    try {
      const file = await gh.getFile("agents/control-plane/projects.json");
      const projects = JSON.parse(file.content);
      projects.sisterProjects = projects.sisterProjects || [];
      if (!projects.sisterProjects.some((p) => p.id === body.id)) {
        projects.sisterProjects.push({
          id: body.id,
          repo: body.repo,
          vercel: body.vercel || null,
          role: body.role || "sister",
          registeredAt: new Date().toISOString(),
          access: "via_token_scope",
        });
      }
      await gh.putFile({
        path: "agents/control-plane/projects.json",
        content: JSON.stringify(projects, null, 2) + "\n",
        message: `agent: register sister project ${body.id}`,
        sha: file.sha,
      });
      return json(res, 200, { ok: true, projects });
    } catch (e) {
      return json(res, 500, { ok: false, error: e.message });
    }
  }

  return json(res, 405, { error: "GET or POST" });
}
