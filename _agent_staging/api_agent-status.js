export const config = { runtime: "nodejs" };

import { cors, json, companySnapshot } from "./lib/runtime.js";
import { githubConfigured } from "./lib/github.js";
import { vercelConfigured } from "./lib/vercel-api.js";
import { readJson } from "./lib/runtime.js";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  const snap = companySnapshot();
  const skills = readJson("agents/control-plane/skills.json", { skills: [] });
  const projects = readJson("agents/control-plane/projects.json", {});
  return json(res, 200, {
    ok: true,
    platform: "vercel",
    autonomous: {
      endpoint: "/api/agent/autonomous",
      autonomyMode: process.env.AF_AGENT_AUTONOMY || "pr",
      githubWrite: githubConfigured(),
      vercelControl: vercelConfigured(),
      gemini: Boolean(process.env.GEMINI_API_KEY),
      secretProtected: Boolean(process.env.AF_AGENT_SECRET || process.env.CRON_SECRET),
      zeroCost: process.env.AF_ZERO_COST !== "0",
    },
    skills: skills.skills || [],
    projects,
    company: snap.company,
    cycleCount: snap.cycleCount,
    lastCycle: snap.lastCycle,
    readyChecklist: {
      geminiKey: Boolean(process.env.GEMINI_API_KEY),
      githubToken: githubConfigured(),
      agentSecret: Boolean(process.env.AF_AGENT_SECRET || process.env.CRON_SECRET),
      vercelToken: vercelConfigured(),
    },
  });
}
