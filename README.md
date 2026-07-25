# AuthorityForge

**Live:** https://authorityforge-tau.vercel.app  

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
