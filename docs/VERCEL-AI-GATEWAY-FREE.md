# Vercel AI Gateway — free LLM only (no budget burn)

## Research summary (correct use)

| Fact | Detail |
|------|--------|
| Endpoint | `https://ai-gateway.vercel.sh/v1` (OpenAI-compatible) |
| Auth | `Authorization: Bearer $AI_GATEWAY_API_KEY` |
| Free tier | ~**$5/month credits** per team + **$0-priced free models** |
| Free models | Must use [Free Tier models](https://vercel.com/ai-gateway/models?freeTier=true) or `$0/$0` pricing |
| Card check | Gateway may return `customer_verification_required` until a card is on file — unlocks free credits; **does not mean you must buy credits** if you only call free models |
| Paid models | Blocked by our code when `AF_ZERO_COST=1` |

### Free models we hard-allow (catalog probe 2026-07-25)

- `inclusionai/ling-3.0-flash-free` — input/output **$0**
- `poolside/laguna-s-2.1-free` — **$0**
- `zai/glm-4.6v-flash` — **$0**

Anything with non-zero pricing is **never** called in zero-cost mode.

### Still truly free (no Gateway credits)

1. **Ollama local** — $0  
2. **Gemini free tier** — Google quota  
3. **Template fallback** — always  

## Env (never commit keys)

| Variable | Where |
|----------|--------|
| `AI_GATEWAY_API_KEY` | Vercel project env + GitHub Actions secrets |
| `AF_ZERO_COST=1` | Always until self-funded |
| `AF_LLM_PROVIDER=vercel` | Optional force Gateway free models |
| `AF_VERCEL_FREE_MODEL=inclusionai/ling-3.0-flash-free` | Optional pin |

**Do not** paste keys into git, chat long-term, or client JS.

### Vercel dashboard
1. Project → Settings → Environment Variables  
2. Add `AI_GATEWAY_API_KEY` = your gateway key  
3. Add `AF_ZERO_COST` = `1`  
4. Redeploy  

If requests say “add a credit card”:  
https://vercel.com → team → AI Gateway → add card for **verification only** (unlock free tier).  
Still only call free models so **spend stays $0**.

## Code path

`scripts/free-llm.mjs` → `viaVercelGateway()`  
Used by `publish-next.mjs` and agent cycles.

```bash
# Test (key in env only)
export AI_GATEWAY_API_KEY=...   # not committed
export AF_ZERO_COST=1
export AF_LLM_PROVIDER=vercel
npm run llm:test
```

## Curl (manual)

```bash
curl https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "inclusionai/ling-3.0-flash-free",
    "messages": [{"role":"user","content":"Say FREE_OK"}],
    "max_tokens": 20
  }'
```

## Policy

`agents/treasury/policy.json` → free_only  
If free credits exhaust or card unlock fails → fall back to Ollama/Gemini/template. **Never** auto-upgrade to paid models.
