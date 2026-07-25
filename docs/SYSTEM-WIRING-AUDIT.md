# System wiring audit (2026-07-25)

## Live status (all green)

| Endpoint | Status |
|----------|--------|
| Site / company / blog / ads.txt / sitemap | 200 |
| `/api/company/status` | 200 real JSON |
| `/api/health` | 200 real JSON |
| `/api/ceo/cycle` | 200 real sense+plan |
| `/api/agents` `/api/marketplace` | 200 |

## Autonomous thinking (proven)

| Run | Result |
|-----|--------|
| Local free LLM | `SYSTEM_CHECK_OK` via Ollama, $0 |
| GHA full-radius | **success** — published `build-programmatic-seo-without-spam` with **Gemini $0**, committed to main |
| CEO Vercel | Plans roles; LLM null until GEMINI on Vercel env |

## CI fixes applied

1. **Repo Actions workflow permissions** were `read` only → set to **`write`** so agent can push.
2. **`GEMINI_API_KEY`** added to GitHub Actions secrets.
3. Workflows upgraded toward Node 24; wire `AI_GATEWAY_API_KEY` secret name (set when card unlocked).
4. Earlier `startup_failure` was permissions/queue; resolved.

## Still missing (human)

| Item | Why |
|------|-----|
| Vercel env `GEMINI_API_KEY` | CEO cycle LLM briefing on Vercel |
| Vercel + GH `AI_GATEWAY_API_KEY` + card unlock | Free Gateway models on cloud |
| AdSense CMP publish | EEA ads compliance |
| Affiliate tracking IDs in `js/config.js` | Real affiliate $ |
| GSC property | Search data loop |
| Stripe AF account | Product revenue (optional later) |

## Commands

```bash
npm run system:check   # full wiring report
npm run agent:full     # full-radius publish cycle
gh workflow run agent-autonomous.yml
```

## Objective

`agents/control-plane/objective.json` — north star + success criteria.
