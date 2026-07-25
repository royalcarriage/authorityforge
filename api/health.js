import { cors, json, healthCheck, companySnapshot } from "../lib/runtime.mjs";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();
  const h = await healthCheck();
  const snap = companySnapshot();
  const ok = Object.values(h.health).every((c) => c === 200 || c === "200");
  return json(res, ok ? 200 : 503, {
    ok,
    ...h,
    cycleCount: snap.cycleCount,
    zeroCost: snap.zeroCost,
    platform: "vercel",
  });
}
