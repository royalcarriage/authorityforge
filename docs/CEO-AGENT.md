# AuthorityForge CEO Agent (company OS)

An **AI operating system** for this site-business: a CEO agent that runs cycles, hires role agents, expands content, checks production, and drafts money moves — **without** sending email or moving funds on its own.

## Live product URLs
- Vercel (primary): https://authorityforge-tau.vercel.app  
- CEO desk (site): `/resources/ceo-desk/`  
- Agent company system: `/systems/agent-company/`

## Install / run

```bash
cd authorityforge   # this repo

# One cycle (safe defaults)
node scripts/ceo-run.mjs

# Cycle + publish next content item
AF_CEO_PUBLISH=1 node scripts/ceo-run.mjs

# npm alias
npm run ceo
npm run ceo:publish
```

**GitHub Action:** `.github/workflows/ceo-cycle.yml` — daily 14:00 UTC + manual dispatch.

## Org chart (hired roles)

| Role | File | Job |
|------|------|-----|
| CEO | `agents/roles/ceo.md` | Sense → plan → delegate → report |
| Content chief | `agents/roles/content-chief.md` | Queue + publish |
| SEO chief | `agents/roles/seo-chief.md` | Index / CTR / structure |
| Monetization chief | `agents/roles/monetization-chief.md` | Affiliates + AdSense path |
| DevOps chief | `agents/roles/devops-chief.md` | Health + Vercel notes |
| Research chief | `agents/roles/research-chief.md` | Money & expansion ideas |
| Legal gate | `agents/roles/legal-gate.md` | Block unsafe automation |

State: `agents/company-state.json`  
Tasks: `agents/memory/open-tasks.json`  
Approvals: `agents/approval-queue/`  
Logs: `agents/logs/`

## What it can do alone
- Refill content queue
- Publish next post (when `AF_CEO_PUBLISH=1`)
- Rebuild blog/sitemap
- Curl production health
- Write research notes
- Open approval items for you

## What it will never do alone
- Send email/SMS
- Move money / pay people
- Click ads
- Form a legal LLC for you (draft checklist only)
- Log into Gmail (no mailbox token installed)

Those go to **approval-queue** for you (or a future browser session you authorize).

## “Start a company” reality check
The agent runs the **AuthorityForge digital business system**.  
**You** remain legal owner, tax payer, AdSense/affiliate account holder, and bank controller.  
That split is intentional and required by law + network rules.

## Expand the company
1. Add a role markdown under `agents/roles/`  
2. Add standing tasks in `open-tasks.json`  
3. Extend `scripts/ceo-run.mjs` with allowlisted actions  
4. Wire secrets only via GitHub Actions / env — never commit tokens  

## Money growth loop
1. CEO publishes commercial content  
2. You enable affiliate IDs in `js/config.js`  
3. AdSense + Google CMP on Vercel  
4. Research chief logs new experiments  
5. You approve experiments → CEO implements content/config  

See also: `PASSIVE-INCOME-AUTONOMOUS.md`, `GOOGLE-CMP-CONSENT.md`, `VERCEL-DEPLOY.md`.
