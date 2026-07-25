export const config = { runtime: "nodejs", maxDuration: 60 };

import { cors, json, readJson, ROOT } from "../lib/runtime.mjs";
import fs from "node:fs";
import path from "node:path";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  const state = readJson("agents/company-state.json", {});
  const rolesDir = path.join(ROOT, "agents/roles");
  const roles = {};
  try {
    for (const f of fs.readdirSync(rolesDir).filter((x) => x.endsWith(".md"))) {
      const id = f.replace(/\.md$/, "");
      roles[id] = fs.readFileSync(path.join(rolesDir, f), "utf8").slice(0, 4000);
    }
  } catch {
    /* empty */
  }
  return json(res, 200, {
    ok: true,
    company: state.company,
    orgChart: state.orgChart,
    hardRules: state.hardRules,
    roles,
    legalNote:
      "Human owner is legal CEO. Agents operate systems under hardRules; no unsupervised money/email.",
  });
}
