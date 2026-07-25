# AuthorityForge — autonomous passive-income system

**Canonical live site:** https://royalcarriage.github.io/authorityforge/  
**Owner email:** royalcarriagelimollc@gmail.com  
**Repo:** https://github.com/royalcarriage/authorityforge  
**AdSense:** `ca-pub-1959018852581373` / ads.txt at https://royalcarriage.github.io/ads.txt  

## Money model (what actually pays)

| Stream | When it pays | Setup |
|--------|----------------|-------|
| **Tool affiliates** | After program approval + traffic to commercial pages | Apply → paste URL in `js/config.js` `AFFILIATES` → `enabled: true` |
| **Google AdSense** | After site approval + crawl of ads.txt + real sessions | Publisher ID already live; slots optional |
| **Optional later** | Digital templates / labeled sponsorships | Only with disclosure |

**Not autonomous without you once:** tax/identity for AdSense & affiliate networks, bank payout, program approvals.

## What the agent runs alone

1. **Content pipeline** (GitHub Action `content-pipeline.yml`)
   - Cron: Tuesdays 15:00 UTC (+ manual `workflow_dispatch`)
   - Pulls next `status=queued` item from `content/queue.json`
   - Writes post → rebuilds blog + sitemap → pushes `main`
   - GitHub Pages redeploys automatically

2. **On-site monetization code**
   - AdSense loader: `js/ads.js` + `ADS_ENABLED`
   - Affiliate resolver: `js/affiliates.js` + `data-aff="key"`
   - Disclosure every page + `/legal/*`

3. **Operator one-time gates** (you click; agent cannot invent KYC)
   - AdSense site URL = GitHub Pages (not Vercel stub)
   - Search Console property for GH Pages URL + sitemap submit
   - Affiliate program applications (list: `/resources/affiliates/`)

## Daily / weekly loop (agent)

```text
Monday    Review GSC impressions (MCP gsc) → queue CTR rewrites
Tuesday   Content pipeline auto-publishes next post
Wednesday Spot-check live pages + ads.txt curl
Thursday  Add 1–2 queue topics from keyword gaps
Friday    Enable any newly approved affiliate IDs in config.js
```

Local/CLI agent commands:

```bash
cd ~/.grok/work/authorityforge   # or clone
export SITE_URL=https://royalcarriage.github.io/authorityforge
export BASE_PATH=/authorityforge
npm run publish:next             # one post
npm run build                    # blog + sitemap
git add -A && git commit -m "content: pipeline" && git push
```

## Search Console

Property type: **URL prefix**  
`https://royalcarriage.github.io/authorityforge/`

Sitemap:  
`https://royalcarriage.github.io/authorityforge/sitemap.xml`

Verification: HTML tag in all pages *or* GitHub ownership of `royalcarriage`.

## AdSense rules (do not break)

- Site in AdSense UI: **GitHub Pages**, not `authorityforge-tau.vercel.app` until full deploy
- Domain-root ads.txt: `https://royalcarriage.github.io/ads.txt`
- Never click own ads
- Privacy policy linked

## Vercel

Project ID (reference only): `prj_WWd0vZqwWWUUo9juFizhTEq76xmi`  
Needs a **full-access** token under the team that owns the project. Until then, ignore Vercel stub.

## Success metrics

| Metric | Early target |
|--------|----------------|
| Indexed pages | 40+ |
| Affiliate programs live (enabled) | 3+ |
| AdSense “Ready / Serving” | yes |
| Organic sessions / mo | 1k+ before expecting meaningful $ |

## Hard rules

- No email/SMS/money moves without owner approval
- No fake reviews or invented stats
- Disclosure always visible
- Quality gate: one intent per URL, edit thin AI drafts before publish at scale
