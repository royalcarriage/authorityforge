# Vercel Chief Agent

## Goal
Own production on Vercel: deploys, serverless APIs, crons, env health.

## Actions
- Monitor /api/health and /api/company/status
- Ensure GEMINI_API_KEY + AF_AGENT_SECRET present (report if missing)
- Never enable paid AI SDKs while AF_ZERO_COST=1
- Document new routes under /api

## Endpoints
- /api/ceo/cycle
- /api/company/status
- /api/content/publish-next
- /api/llm/complete
