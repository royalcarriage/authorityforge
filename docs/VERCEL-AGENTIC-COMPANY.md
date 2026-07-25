# Vercel Agentic Company OS

Production host: **https://authorityforge-tau.vercel.app**

## What runs on Vercel
| Layer | Path |
|-------|------|
| Website | static `dist/` |
| Company HQ UI | `/company/` |
| CEO cycle API | `/api/ceo/cycle` (cron daily 14:00 UTC) |
| Status | `/api/company/status` |
| Agents | `/api/agents` |
| Marketplace | `/api/marketplace` |
| Free LLM | `/api/llm/complete` (Gemini free) |
| Publish | `/api/content/publish-next` |

## Env vars (Vercel → Project → Settings → Environment Variables)
```
AF_ZERO_COST=1
GEMINI_API_KEY=...          # free tier
AF_AGENT_SECRET=...         # random string; protect CEO cycle
CRON_SECRET=...             # optional; Vercel cron auth
AF_GITHUB_TOKEN=...         # optional fine-grained: contents write for cycle logs
AF_PRIMARY_URL=https://authorityforge-tau.vercel.app
```

## Local not required
Ollama is optional and local-only. Production uses **Gemini free on Vercel**.

## After deploy
```bash
curl -sS https://authorityforge-tau.vercel.app/api/company/status | head
curl -sS https://authorityforge-tau.vercel.app/api/health
```
