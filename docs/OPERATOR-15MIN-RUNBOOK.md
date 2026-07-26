# Operator runbook — the ONLY human steps left (≈15–30 min total)

Everything else runs itself: content ships Tue/Fri + daily agent cycles, IndexNow
pings Bing on every publish, canonicals point at the Vercel primary, checkout and
affiliate links activate on their own the moment the IDs below exist.

Ordered by cash impact per minute:

## 1. Paste affiliate IDs (highest impact — site earns nothing without them)
Apply order + expectations: see `agents/approval-queue/AFFILIATE-FAST-PATH.md`.
When an approval email arrives, edit `js/config.js` → `AFFILIATES.<key>`:
set `enabled: true` and `url: "<your tracking link>"`. Commit to main — done.
~114 CTAs across compare/tools/blog light up on the next deploy.

## 2. Vercel env vars (5 min, one time) — Project **authorityforge** → Settings → Environment Variables
| Var | Value | Why |
| --- | --- | --- |
| `AF_SESSION_SECRET` | any long random hex (e.g. `openssl rand -hex 32`) | stable login sessions; without it sessions reset on cold starts (security fail-closed is already in code) |
| `AF_GITHUB_DATA_REPO` | `royalcarriage/authorityforge-data` | moves signup PII (emails) into the private repo — already created + seeded |
| `AF_GITHUB_TOKEN` | fine-grained PAT with **Contents: Read/Write** on `authorityforge-data` (and `authorityforge` if agent endpoints commit) | durable user store |

## 3. Google Search Console (5 min, one time)
Under the Google account that owns AdSense (royalcarriagelimollc@gmail.com):
1. GSC → Add property → URL prefix → `https://authorityforge-tau.vercel.app/`
   (HTML-file verification is already deployed: `google50d44b410e62a715.html`).
2. Sitemaps → submit `sitemap.xml`.
Bing side needs nothing — IndexNow is automated.

## 4. AdSense (waiting on Google, not on us)
Client `ca-pub-1959018852581373`, status "getting_ready". ads.txt is live.
When AdSense says **Ready**: set `MONEY.adsense.status: "ready"` in `js/config.js`
and paste slot IDs into `ADS_SLOTS` if you create manual units (auto ads work without).

## 5. Stripe for AF subscriptions (only if/when you want paid plans live)
Create a SEPARATE Stripe account (NOT the Royal Carriage limo account), then in
Vercel env: `AF_STRIPE_SECRET_KEY`, `AF_STRIPE_PRICE_FORGE` (=$49/mo price id),
`AF_STRIPE_PRICE_AGENCY` (=$199/mo price id).
Pricing-page buttons switch from signup-fallback to live Stripe Checkout automatically
(`/api/checkout` + `js/checkout.js`).

## 6. Optional but highest-leverage SEO buy: custom domain (~$12/yr)
A real domain (e.g. authorityforge.com) beats a `.vercel.app` subdomain for
rankings, AdSense trust, and affiliate approvals. Add it in Vercel → Domains,
then set `SITE_URL` in the three workflow files + rerun `node scripts/fix-canonicals.mjs`.
Until then everything is wired to authorityforge-tau.vercel.app.

---
*Generated 2026-07-26 by the improvement pass. Agents keep the rest running.*
