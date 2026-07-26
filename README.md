# AuthorityForge

**Live:** https://authorityforge-tau.vercel.app  
**Owner steps (the only manual work):** [docs/OPERATOR-15MIN-RUNBOOK.md](docs/OPERATOR-15MIN-RUNBOOK.md)

> Host policy: **Vercel is primary** — every page canonicalizes to
> `authorityforge-tau.vercel.app` (enforced by `scripts/fix-canonicals.mjs`);
> the GH Pages mirror defers via canonical and is never self-indexed.
> IndexNow pings Bing/DuckDuckGo/Copilot automatically on every publish
> (`scripts/indexnow-ping.mjs`, key file at site root).
> User PII lives in the private repo `royalcarriage/authorityforge-data`
> once `AF_GITHUB_DATA_REPO` is set on Vercel.


Self-optimizing systems for **search authority & rankings**.  
Primary market: **AI Productivity Tools + Practical SEO Systems**.  
Monetization: **affiliates first → AdSense later**.

## Stack
Static HTML/CSS/JS on Vercel. Schema (JSON-LD), `sitemap.xml`, `robots.txt`, `llms.txt`.

## Local
Open `index.html` or `npx serve .`

## Deploy
Push to `main` → Vercel production (connect this repo in Vercel project settings).

## Structure
- `/systems/*` — engines
- `/guide/*` — playbooks
- `/blog/*` — cluster spokes
- `/resources/*` — checklists & templates


## Content pipeline

- Queue: `content/queue.json`
- Posts: `content/posts/*.md`
- Build: `npm run build`
- Auto: GitHub Action **Content pipeline** (Tuesdays + manual)
- Docs: [docs/CONTENT-PIPELINE.md](docs/CONTENT-PIPELINE.md)

```bash
npm run pipeline   # publish next + rebuild
```

## Commercial cluster (AdSense gate)

Target: **15–25 strong commercial pages** before AdSense application.

Shipped clusters on `main`:
- `/tools/*` (8 categories + hub)
- `/compare/*`
- `/stacks/*`
- `/solutions/*`
- `/use-cases/*`

Plus systems, guides, blog, legal, resources.

**Live Vercel:** reconnect Git to this repo so production serves the full cluster (not the stub).


## Use Grok in the browser

1. Open **https://grok.com**
2. Connect GitHub → **royalcarriage/authorityforge** (write)
3. Follow **[docs/GROK-BROWSER-USAGE.md](docs/GROK-BROWSER-USAGE.md)**
4. On-site page: **/resources/grok-browser/**

Starter prompt is in that doc.

## Vercel agentic company OS

Production: https://authorityforge-tau.vercel.app/company/

- Autonomous improve: `GET /api/agent/autonomous` (needs `AF_GITHUB_TOKEN` + `GEMINI_API_KEY`)
- Status: `/api/agent/status`
- Docs: [docs/AUTONOMOUS-VERCEL-CONTROL-PLANE.md](docs/AUTONOMOUS-VERCEL-CONTROL-PLANE.md)

Zero-cost LLMs only until self-funded.
