import { cors, json, companySnapshot, readJson, ROOT } from "../lib/runtime.mjs";
import fs from "node:fs";
import path from "node:path";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  const snap = companySnapshot();
  const tasks = readJson("agents/memory/open-tasks.json", { tasks: [] });
  const rolesDir = path.join(ROOT, "agents/roles");
  const roleMeta = [];
  try {
    for (const f of fs.readdirSync(rolesDir).filter((x) => x.endsWith(".md"))) {
      const id = f.replace(/\.md$/, "");
      const text = fs.readFileSync(path.join(rolesDir, f), "utf8");
      const title = (text.match(/^#\s+(.+)$/m) || [, id])[1];
      roleMeta.push({ id, title, file: `agents/roles/${f}` });
    }
  } catch {
    /* */
  }
  return json(res, 200, {
    ok: true,
    platform: "vercel",
    ceo: snap.company?.ceoAgent || "af-ceo-v1",
    orgChart: snap.orgChart,
    roles: roleMeta,
    openTasks: tasks.tasks || [],
    cycleCount: snap.cycleCount,
    lastCycle: snap.lastCycle,
  });
}
