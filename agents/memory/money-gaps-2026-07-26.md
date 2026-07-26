# Money gaps — 2026-07-26

**Streams:** affiliates `blocked` · AdSense `waiting` · subscriptions `missing` · content `ok`

## What's missing (priority)
- **P0** [human] **0 affiliate programs enabled — no commission URLs** — 11 partners defined (Semrush, Ahrefs, …) but enabled:false and empty url. Cash path blocked until IDs pasted. → _Agent:_ Keep commercial compare/stack pages shipping; approval-queue lists apply URLs.
- **P1** [human] **AdSense status is "getting_ready" not ready** — Client ca-pub-1959018852581373; ADS_ENABLED=true. Google review / CMP may still be needed. → _Agent:_ Keep commercial pages live; ads.txt + privacy/disclosure already required.
- **P1** [agent] **No AF Stripe checkout/subscription API yet** — Pro $49 / Agency $199 cannot collect payment. Separate from RC limo Stripe. → _Agent:_ Scaffold /api checkout against AF_STRIPE_* env when human creates AF Stripe account; until then price pages stay info-only.

## Next agent work
- (P1) monetization-chief: Scaffold /api checkout against AF_STRIPE_* env when human creates AF Stripe account; until then price pages stay info-only.
- (P1) content-chief: Publish next queued commercial/affiliate post; keep queue ≥5 money topics
- (P1) monetization-chief: Grow data-aff CTAs (now ~114) on compare/tools/blog so IDs earn the day they're pasted
- (P1) content-chief: Add Start free + /demo CTAs from blog and commercial pages (self-serve conversion)
- (P2) content-chief: Review latest 3 published posts for affiliate CTA + money path links; rewrite thin ones
- (P1) seo-chief: Expand compare cluster (now 7 pages) for high-intent tool buyers

## Metrics snapshot
```json
{
  "affiliatesEnabled": 0,
  "affiliatesDisabled": 11,
  "affiliatesEnabledNames": [],
  "adsenseStatus": "getting_ready",
  "adsEnabled": true,
  "adsenseClient": "ca-pub-1959018852581373",
  "adsTxtOk": true,
  "stripeCheckoutWired": false,
  "dataAffCtas": 114,
  "signupCtaRefs": 31,
  "comparePages": 7,
  "contentQueued": 6,
  "contentPublished": 16,
  "commercialTaggedPosts": 15,
  "hasDemo": true,
  "hasPricing": true,
  "hasMoneyOs": true
}
```
