# Using Grok in the browser with AuthorityForge

This guide is for **https://grok.com** (or xAI Grok web/app) plus this repo.

## 1. Open Grok in the browser

1. Go to **https://grok.com** (or the Grok surface you use with GitHub connected).
2. Sign in with the account that has access to **`royalcarriage`** GitHub (or a collaborator with **write** on this repo).
3. Connect GitHub if prompted:
   - Grok settings / integrations → **GitHub**
   - Grant access to **`royalcarriage/authorityforge`**
   - Permissions: **Contents read/write**

## 2. Point Grok at this repo

In a new chat, start with:

```text
Repo: https://github.com/royalcarriage/authorityforge
Live site: https://authorityforge-tau.vercel.app
Stack: static HTML/CSS/JS on Vercel. Content pipeline: content/queue.json → content/posts → npm run build → main.

Hard rules:
- Do not invent fake stats or AggregateRating.
- Affiliate links must stay disclosed (see /legal/affiliate-disclosure/).
- Prefer editing markdown in content/posts/ then run npm run build.
- Push to main only after local build; Vercel should deploy from main.
```

## 3. High-value prompts (copy/paste)

### Publish next queued post
```text
In royalcarriage/authorityforge: run the content pipeline — publish the next item from content/queue.json, rebuild blog + sitemap, commit and push to main. Summarize the new slug and remaining queue count.
```

### Add a commercial page
```text
Add a new commercial page under /tools/ for [TOPIC]. Match existing layout (disclosure bar, footer legal links, direct-answer paragraph, FAQ schema if FAQs). Update sitemap via npm run build / scripts/build-sitemap.mjs. Push main.
```

### Audit cluster
```text
Audit AuthorityForge for cannibalization: list pages that share near-identical primary intents. Propose one owner URL per conflict. Do not delete without a 301 plan.
```

### AdSense readiness check
```text
Count strong commercial pages (tools/compare/stacks/solutions/use-cases). Report how close we are to the 15–25 page gate and any thin pages to deepen before AdSense.
```

## 4. Browser + local CLI hybrid (recommended)

| Step | Where |
|------|--------|
| Explore ideas / drafts | Grok browser |
| Bulk file edits / pipeline | Grok browser **or** CLI agent with `gh` as `royalcarriage` |
| Verify write | `git push` to `royalcarriage/authorityforge` |
| Live check | Open https://authorityforge-tau.vercel.app in browser after Vercel git link |

CLI proof (already works on this machine):

```bash
cd ~/.grok/work/authorityforge   # or your clone
git pull origin main
npm run pipeline                 # optional: publish next queue item
git status
git push origin main
```

## 5. Vercel (required for “full cluster live”)

If the public site is still a stub:

1. Browser → [Vercel Dashboard](https://vercel.com/dashboard)
2. Project for **authorityforge-tau**
3. **Settings → Git** → connect **`royalcarriage/authorityforge`**
4. Production branch: **`main`**
5. **Deployments → Redeploy**

Then in browser verify:

- `/tools/`
- `/legal/affiliate-disclosure/`
- `/blog/`
- `/sitemap.xml`

## 6. What Grok browser should not do

- Auto-send email/SMS or move money
- Add fake review stars schema
- Push force to main without reason
- Enable AdSense before ~15–25 strong commercial pages + real traffic

## 7. Quick links

| Resource | URL |
|----------|-----|
| Repo | https://github.com/royalcarriage/authorityforge |
| Live | https://authorityforge-tau.vercel.app |
| Grok | https://grok.com |
| Pipeline docs | [CONTENT-PIPELINE.md](./CONTENT-PIPELINE.md) |
| Write path | [GITHUB-WRITE-PATH.md](./GITHUB-WRITE-PATH.md) |
| Monetization | /legal/monetization/ |
