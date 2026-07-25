# Zero-cost AI (until the company funds itself)

AuthorityForge agents **must not burn paid API tokens** until real revenue hits the AF treasury.

## Policy

| Rule | Value |
|------|--------|
| `AF_ZERO_COST` | **1** by default (`0` only after revenue + human OK) |
| Paid OpenAI / Anthropic | **Blocked** while zero-cost |
| Allowed | Ollama (local free), Gemini free tier, OpenCode free models, **template fallback** (always free) |
| Hosting | Vercel hobby + GitHub Pages (free tiers) |

Treasury: `agents/treasury/policy.json` → `costPolicy.llm.mode = free_only`  
Company: `agents/company-state.json` → `hardRules.zeroCostUntilSelfFunded = true`

## Provider order (`scripts/free-llm.mjs`)

1. **Ollama** local — `http://127.0.0.1:11434` model `AF_OLLAMA_MODEL` (default `llama3.2`)
2. **Gemini free tier** — `GEMINI_API_KEY` (free quota; no OpenAI bill)
3. **OpenCode** CLI — if installed and free model configured
4. **Template** — deterministic free markdown (no network)

```bash
# smoke test
npm run llm:test

# publish next post with free LLM only
npm run publish:next:free

# force template only
AF_USE_LLM=0 npm run publish:next

# force one provider
AF_LLM_PROVIDER=gemini npm run publish:next:free
AF_LLM_PROVIDER=ollama npm run publish:next:free
```

## GitHub Actions

Content / CEO workflows must set:

```yaml
env:
  AF_ZERO_COST: "1"
  # optional free Gemini for cloud runners (quota only):
  # GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

Do **not** set `OPENAI_API_KEY` for AF pipelines until treasury says revenue > 0 and policy flips.

## When paid LLMs are allowed

1. AdSense or affiliates or Stripe show **real** cleared funds in AF ledger  
2. Human sets `AF_ZERO_COST=0` and `AF_ALLOW_PAID_LLM=1`  
3. Raise treasury `maxAutoSpendCents` only for capped tool spend  

Until then: **cost target = $0**.
