export const config = { runtime: "nodejs", maxDuration: 10 };

import { cors, json, readJson } from "../lib/runtime.mjs";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  const catalog = readJson("agents/marketplace/catalog.json", { plugins: [] });
  return json(res, 200, { ok: true, platform: "vercel", ...catalog });
}
