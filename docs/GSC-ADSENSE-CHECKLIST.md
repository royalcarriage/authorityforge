# GSC + AdSense checklist (royalcarriagelimollc@gmail.com)

## A. Google Search Console

1. Open https://search.google.com/search-console while signed in as **royalcarriagelimollc@gmail.com**
2. **Add property** → **URL prefix**
3. Enter: `https://royalcarriage.github.io/authorityforge/`
4. Verify (HTML tag preferred if DNS not owned):
   - Copy meta tag → paste into a PR on all pages’ `<head>` *or*
   - Use **Google Analytics** / **Google Tag Manager** if already on account *or*
   - HTML file upload to repo root if offered
5. After verified → **Sitemaps** → submit:
   `https://royalcarriage.github.io/authorityforge/sitemap.xml`
6. Optional second property: `https://royalcarriage.github.io/` (covers domain-root ads.txt)

## B. Google AdSense

1. https://www.google.com/adsense/ → same Gmail
2. Sites → add / confirm:
   `https://royalcarriage.github.io/authorityforge`
3. Confirm ads.txt crawls:
   `https://royalcarriage.github.io/ads.txt`
   Line must include: `google.com, pub-1959018852581373, DIRECT, f08c47fec0942fa0`
4. Site code already loads:
   `adsbygoogle.js?client=ca-pub-1959018852581373`
5. Wait for review; do not create invalid traffic

## C. Affiliates (passive commissions)

1. Open https://royalcarriage.github.io/authorityforge/resources/affiliates/
2. Apply to Semrush, Ahrefs, Surfer, Jasper, etc. with the **live site URL**
3. When approved, set in `js/config.js`:

```js
semrush: {
  name: "Semrush",
  enabled: true,
  url: "https://…your-tracking-url…",
  // ...
}
```

4. Push `main` — CTAs with `data-aff="semrush"` auto-update.

## D. Proof commands

```bash
curl -sS https://royalcarriage.github.io/ads.txt
curl -sS -o /dev/null -w "%{http_code}\n" https://royalcarriage.github.io/authorityforge/css/styles.css
curl -sS https://royalcarriage.github.io/authorityforge/ | grep -E 'ca-pub|adsbygoogle|data-aff'
```
