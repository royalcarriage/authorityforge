# How AuthorityForge autonomy works (correct architecture)

## Production layout

| Layer | Where | Role |
|-------|--------|------|
| **Public site + company APIs** | **Vercel** | Serves site, `/api/company/status`, `/api/ceo/cycle`, `/api/health` |
| **Autonomous improve loop** | **GitHub Actions** (daily) | Free Gemini plans; writes agent state + content queue to git; Vercel redeploys from git |
| **Source of truth** | **GitHub** | Code, agents, logs |
| **LLM** | **Gemini free** | No paid OpenAI |

This matches how cloud agents are supposed to work: Vercel is the edge/runtime; long durable writes go through git ([vercel-labs/open-agents](https://github.com/vercel-labs/open-agents) pattern).

## Vercel env vars (Project → Settings → Environment Variables)

```
GEMINI_API_KEY=...          # free tier — used by CEO cycle when present
AF_ZERO_COST=1
AF_PRIMARY_URL=https://authorityforge-tau.vercel.app
AF_AGENT_SECRET=...         # optional protect /api/ceo/cycle
```

## GitHub secrets (repo → Settings → Secrets → Actions)

```
GEMINI_API_KEY=...          # same free key — autonomous workflow
```

`GITHUB_TOKEN` is automatic for commits from Actions.

## Manual autonomous run

```bash
gh workflow run agent-autonomous.yml
# or locally:
node scripts/agent-autonomous.mjs
```

## Company HQ
https://authorityforge-tau.vercel.app/company/

## Full control of Vercel project settings
Requires `AF_VERCEL_TOKEN` (you create once). Without it the agent still improves **code** via GitHub and deploys on push — it does not need the Vercel API for day-to-day autonomy.

## Sister projects
Register under `agents/control-plane/projects.json`. Autonomy playbooks live in `agents/control-plane/constitution.md`.

## Hard rules still on
- Zero paid LLM until self-funded  
- No unsupervised money/email  
- Human is legal owner  
