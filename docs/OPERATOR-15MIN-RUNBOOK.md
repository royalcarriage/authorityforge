# Operator runbook — the ONLY human steps left (≈15–30 min total)

Everything else runs itself: content ships Tue/Fri + daily agent cycles, IndexNow
pings Bing on every publish, canonicals point at the Vercel primary, checkout and
affiliate links activate on their own the moment the IDs below exist.

Ordered by cash impact per minute:

## 1. Paste affiliate IDs (highest impact — site earns nothing without them)
Apply order + expectations: see `agents/approval-queue/AFFILIATE-FAST-PATH.md`.
Start with the 3 no-review programs (systeme.io → Writesonic → NeuronWriter,
~30–40 min, cannot be rejected). Hold Semrush/Cloudways/Frase until after the
custom domain (step 6) — manual reviewers soft-reject bare vercel.app sites.
When an approval arrives, edit `js/config.js` → `AFFILIATES.<key>`:
set `enabled: true` and `url: "<your tracking link>"`. Commit to main — done.
~114 CTAs across compare/tools/blog light up on the next deploy.
(Ahrefs, Screaming Frog, Notion: no joinable program — already marked in config.)

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

## 4. AdSense — BLOCKED until the custom domain exists
Verified 2026-07-26: **AdSense does not approve *.vercel.app subdomains.**
Client `ca-pub-1959018852581373` will sit in "getting_ready" forever on this host.
Order of operations: buy domain (step 6) → point site at it → re-add the site in
AdSense → wait for review. Then set `MONEY.adsense.status: "ready"` in `js/config.js`
and paste slot IDs into `ADS_SLOTS` if you create manual units (auto ads work without).

## 5. Stripe for AF subscriptions (only if/when you want paid plans live)
Create a SEPARATE Stripe account (NOT the Royal Carriage limo account), then in
Vercel env: `AF_STRIPE_SECRET_KEY`, `AF_STRIPE_PRICE_FORGE` (=$49/mo price id),
`AF_STRIPE_PRICE_AGENCY` (=$199/mo price id).
Pricing-page buttons switch from signup-fallback to live Stripe Checkout automatically
(`/api/checkout` + `js/checkout.js`).

## 6. Custom domain (~$12/yr) — the highest-leverage $12 in the project
Not optional anymore: AdSense cannot approve *.vercel.app (step 4), and the
manual-review affiliate programs (Semrush $200/sale, Cloudways) soft-reject
bare subdomains. A real domain unblocks BOTH streams plus rankings.
Add it in Vercel → Domains, then set `SITE_URL` in the three workflow files +
rerun `node scripts/fix-canonicals.mjs` (one command — agents handle the rest).
Until then everything is wired to authorityforge-tau.vercel.app.

---
*Generated 2026-07-26 by the improvement pass. Agents keep the rest running.*
