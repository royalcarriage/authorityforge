# Money gaps — 2026-08-25

**Streams:** affiliates `blocked` · AdSense `waiting` · subscriptions `partial` · content `thin`

## What's missing (priority)
- **P0** [human] **0 affiliate programs enabled — no commission URLs** — 16 partners defined (Semrush, Ahrefs, …) but enabled:false and empty url. Cash path blocked until IDs pasted. → _Agent:_ Keep commercial compare/stack pages shipping; approval-queue lists apply URLs.
- **P1** [human] **AdSense status is "getting_ready" not ready** — Client ca-pub-1959018852581373; ADS_ENABLED=true. Google review / CMP may still be needed. → _Agent:_ Keep commercial pages live; ads.txt + privacy/disclosure already required.
- **P1** [agent] **Content queue depth 4 < 5** — Autonomous publish needs backlog of monetizable topics. → _Agent:_ Seed queue with commercial SEO/affiliate topics.

## Next agent work
- (P1) content-chief: Seed queue with commercial SEO/affiliate topics.
- (P1) content-chief: Publish next queued commercial/affiliate post; keep queue ≥5 money topics
- (P1) monetization-chief: Grow data-aff CTAs (now ~234) on compare/tools/blog so IDs earn the day they're pasted
- (P1) content-chief: Add Start free + /demo CTAs from blog and commercial pages (self-serve conversion)
- (P2) content-chief: Review latest 3 published posts for affiliate CTA + money path links; rewrite thin ones
- (P1) seo-chief: Expand compare cluster (now 7 pages) for high-intent tool buyers

## Metrics snapshot
```json
{
  "affiliatesEnabled": 0,
  "affiliatesDisabled": 16,
  "affiliatesEnabledNames": [],
  "adsenseStatus": "getting_ready",
  "adsEnabled": true,
  "adsenseClient": "ca-pub-1959018852581373",
  "adsTxtOk": true,
  "stripeCheckoutWired": true,
  "dataAffCtas": 234,
  "signupCtaRefs": 34,
  "comparePages": 7,
  "contentQueued": 4,
  "contentPublished": 56,
  "commercialTaggedPosts": 52,
  "hasDemo": true,
  "hasPricing": true,
  "hasMoneyOs": true
}
```
