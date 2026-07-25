# Autonomous company on Vercel (how it actually works)

## Research summary (correct architecture)

Vercel **cannot** keep a forever-running process on the free/hobby sandbox. The correct pattern (see [vercel-labs/open-agents](https://github.com/vercel-labs/open-agents)):

| Need | Solution on Vercel |
|------|---------------------|
| Brain / planning | Serverless + **Gemini free** |
| Durable memory & code edits | **GitHub** as source of truth (Contents API) |
| Schedule | **Vercel Cron** hits `/api/agent-autonomous` |
| Deploy | Push/PR to `main` → Vercel auto-deploy |
| Multi-project | `projects.json` registry + token scopes |
| Long multi-step | Multiple cron ticks / maxSteps per invoke |

**Not local:** production agent runs only on Vercel + GitHub + Gemini.

## Full control checklist (you set once in Vercel → Settings → Env)

| Variable | Purpose |
|----------|---------|
| `GEMINI_API_KEY` | Free LLM planning/writing |
| `AF_GITHUB_TOKEN` | **Required for autonomy** — fine-grained PAT: Contents R/W (+ PR) on `royalcarriage/authorityforge` |
| `AF_AGENT_SECRET` | Protects agent endpoints (also use as `CRON_SECRET` if desired) |
| `AF_AGENT_AUTONOMY` | `pr` (safe default: branch+PR) · `full` (commit main) · `plan_only` |
| `AF_ZERO_COST` | `1` — block paid LLMs |
| `AF_VERCEL_TOKEN` | Optional — inspect project/env/deploys |
| `AF_VERCEL_PROJECT_ID` | Optional — project id |
| `AF_VERCEL_DEPLOY_HOOK_URL` | Optional — force redeploy |
| `AF_PRIMARY_URL` | `https://authorityforge-tau.vercel.app` |

### Create GitHub token
1. GitHub → Settings → Developer settings → Fine-grained tokens  
2. Resource: `royalcarriage/authorityforge`  
3. Permissions: **Contents: Read and write**, **Pull requests: Read and write**  
4. Paste into Vercel as `AF_GITHUB_TOKEN`  
5. Redeploy

Without this token the agent **plans** on Vercel but **cannot upgrade the repo**.

## Endpoints

| URL | Role |
|-----|------|
| `/api/agent-status` | Readiness checklist |
| `/api/agent-autonomous` | Full improve cycle (cron 15:00 UTC) |
| `/api/ceo/cycle` | CEO sense/plan (cron 14:00 UTC) |
| `/api/company/status` | Public HQ JSON |
| `/api/projects` | Primary + sister projects |

## Manual trigger

```bash
export AF_AGENT_SECRET='your-secret'
curl -sS -H "Authorization: Bearer $AF_AGENT_SECRET" \
  "https://authorityforge-tau.vercel.app/api/agent-autonomous"
```

## Sister projects
POST `/api/projects` with `{ "id", "repo", "vercel?" }` after token can write.  
Primary agent learns playbooks from `agents/control-plane/`.

## Hard limits (by design)
- No unsupervised money movement  
- No unsupervised email  
- No paid LLM until you flip policy  
- Write allowlist (content, agents, api, docs, site pages — not secrets)

## After env is set
1. Open `/api/agent-status` — all checklist greens  
2. Hit `/api/agent-autonomous` once  
3. See PR under github.com/royalcarriage/authorityforge/pulls **or** commits on main if `full`  
4. Cron keeps improving daily  
