/**
 * Stripe Checkout scaffold — dormant until AF_STRIPE_* env vars exist.
 * Closes the "subscriptions: missing" money-gap (agent-owned).
 *
 * Env (Vercel project settings — AuthorityForge's OWN Stripe account,
 * NEVER the Royal Carriage limo account):
 *   AF_STRIPE_SECRET_KEY    sk_live_… (or sk_test_…)
 *   AF_STRIPE_PRICE_FORGE   price_… ($49/mo Forge Pro)
 *   AF_STRIPE_PRICE_AGENCY  price_… ($199/mo Agency OS)
 *
 * GET  /api/checkout          → { ready, plans }
 * POST /api/checkout {plan}   → { ok, url } Stripe-hosted checkout session
 */
import { cors, json } from "./lib/runtime.mjs";
import { readBody, sessionFromRequest } from "./lib/auth.mjs";

const PLANS = {
  forge: { name: "Forge Pro", priceEnv: "AF_STRIPE_PRICE_FORGE", usd: 49 },
  agency: { name: "Agency OS", priceEnv: "AF_STRIPE_PRICE_AGENCY", usd: 199 },
};

function siteUrl() {
  return (process.env.AF_PRIMARY_URL || "https://authorityforge-tau.vercel.app").replace(/\/$/, "");
}

function readiness() {
  const key = process.env.AF_STRIPE_SECRET_KEY || "";
  const plans = {};
  for (const [id, p] of Object.entries(PLANS)) {
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

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.end();

  if (req.method === "GET") {
    return json(res, 200, { ok: true, ...readiness() });
  }
  if (req.method !== "POST") {
    return json(res, 405, { error: "GET status | POST { plan: forge|agency }" });
  }

  const state = readiness();
  if (!state.keyConfigured) {
    return json(res, 503, {
      ok: false,
      ready: false,
      error: "Payments not enabled yet — AF_STRIPE_SECRET_KEY missing.",
    });
  }

  const body = await readBody(req);
  const plan = PLANS[String(body.plan || "").toLowerCase()];
  if (!plan) return json(res, 400, { ok: false, error: "Unknown plan. Use forge|agency." });
  const price = process.env[plan.priceEnv];
  if (!price) {
    return json(res, 503, { ok: false, error: `${plan.name} price not configured (${plan.priceEnv}).` });
  }

  const sess = sessionFromRequest(req);
  const params = new URLSearchParams({
    mode: "subscription",
    "line_items[0][price]": price,
    "line_items[0][quantity]": "1",
    success_url: `${siteUrl()}/app/dashboard/?upgraded=${encodeURIComponent(body.plan)}`,
    cancel_url: `${siteUrl()}/pricing/`,
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
      return json(res, 502, {
        ok: false,
        error: data?.error?.message || `stripe ${r.status}`,
      });
    }
    return json(res, 200, { ok: true, url: data.url });
  } catch (e) {
    return json(res, 500, { ok: false, error: String(e.message || e) });
  }
}
