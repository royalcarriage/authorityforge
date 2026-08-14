# Money gates (human only) — 2026-08-14

Agents cannot invent affiliate IDs or finish AdSense review.
Owner does not sell/onboard — only paste IDs / click Google UI.

## P0 · 0 affiliate programs enabled — no commission URLs
- Stream: affiliates
- 16 partners defined (Semrush, Ahrefs, …) but enabled:false and empty url. Cash path blocked until IDs pasted.

## P1 · AdSense status is "getting_ready" not ready
- Stream: adsense
- Client ca-pub-1959018852581373; ADS_ENABLED=true. Google review / CMP may still be needed.

## Apply links (from config)
- **Semrush**: https://www.semrush.com/affiliate-program/
- **Ahrefs**: https://surferseo.com/affiliates/
- **Surfer SEO**: https://surferseo.com/affiliates/
- **Jasper**: https://www.jasper.ai/partners
- **Copy.ai**: https://www.copy.ai/partners
- **Frase**: https://www.frase.io/affiliates/
- **Writesonic**: https://writesonic.com/affiliates
- **Screaming Frog**: https://www.cloudways.com/en/affiliate

When approved: set AFFILIATES.<key>.enabled=true and url=tracking link in js/config.js.
