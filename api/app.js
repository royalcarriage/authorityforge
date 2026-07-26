/**
 * Consolidated customer/operator app API (Hobby function limit).
 * GET/POST /api/app  body.action = projects|checklist|brief|admin
 * Also serves /api/checkout via vercel.json rewrite (no session needed) —
 * a 13th function file would break the 12-function Hobby cap.
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

/**
 * Stripe Checkout scaffold — dormant until AF_STRIPE_* env vars exist.
 * Env (AuthorityForge's OWN Stripe account, NEVER the RC limo account):
 *   AF_STRIPE_SECRET_KEY · AF_STRIPE_PRICE_FORGE · AF_STRIPE_PRICE_AGENCY
 * GET → { ready, plans } · POST {plan: forge|agency} → { ok, url }
 */
const CHECKOUT_PLANS = {
  forge: { name: "Forge Pro", priceEnv: "AF_STRIPE_PRICE_FORGE", usd: 49 },
  agency: { name: "Agency OS", priceEnv: "AF_STRIPE_PRICE_AGENCY", usd: 199 },
};

function checkoutReadiness() {
  const key = process.env.AF_STRIPE_SECRET_KEY || "";
  const plans = {};
  for (const [id, p] of Object.entries(CHECKOUT_PLANS)) {
    plans[id] = {
      name: p.name,
      usd: p.usd,
      priceConfigured: Boolean(process.env[p.priceEnv]),
    };
  }
  return {
    ready: Boolean(key) && Object.values(plans).some((p) => p.priceConfigured),
    keyConfigured: Boolean(key),
    plans,
  };
}

async function handleCheckout(req, res) {
  if (req.method === "GET") {
    return json(res, 200, { ok: true, ...checkoutReadiness() });
  }
  if (req.method !== "POST") {
    return json(res, 405, { error: "GET status | POST { plan: forge|agency }" });
  }
  const state = checkoutReadiness();
  if (!state.keyConfigured) {
    return json(res, 503, {
      ok: false,
      ready: false,
      error: "Payments not enabled yet — AF_STRIPE_SECRET_KEY missing.",
    });
  }
  const body = await readBody(req);
  const plan = CHECKOUT_PLANS[String(body.plan || "").toLowerCase()];
  if (!plan) return json(res, 400, { ok: false, error: "Unknown plan. Use forge|agency." });
  const price = process.env[plan.priceEnv];
  if (!price) {
    return json(res, 503, { ok: false, error: `${plan.name} price not configured (${plan.priceEnv}).` });
  }
  const site = (process.env.AF_PRIMARY_URL || "https://authorityforge-tau.vercel.app").replace(/\/$/, "");
  const sess = sessionFromRequest(req);
  const params = new URLSearchParams({
    mode: "subscription",
    "line_items[0][price]": price,
    "line_items[0][quantity]": "1",
    success_url: `${site}/app/dashboard/?upgraded=${encodeURIComponent(body.plan)}`,
    cancel_url: `${site}/pricing/`,
    allow_promotion_codes: "true",
  });
  if (sess?.email) params.set("customer_email", sess.email);
  if (sess?.sub) params.set("client_reference_id", sess.sub);
  try {
    const r = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AF_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    const data = await r.json();
    if (!r.ok || !data.url) {
      return json(res, 502, { ok: false, error: data?.error?.message || `stripe ${r.status}` });
    }
    return json(res, 200, { ok: true, url: data.url });
  } catch (e) {
    return json(res, 500, { ok: false, error: String(e.message || e) });
  }
}

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

  // Checkout runs BEFORE the session gate — pricing page probes it pre-auth.
  const urlStr = String(req.url || "");
  if (urlStr.includes("checkout") || req.query?.op === "checkout") {
    try {
      return await handleCheckout(req, res);
    } catch (e) {
      return json(res, 500, { ok: false, error: String(e.message || e) });
    }
  }

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
