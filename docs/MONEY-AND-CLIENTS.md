# Money + client systems (shipped 2026-07-25)

## Live surfaces

| URL | Purpose |
|-----|---------|
| `/systems/money/` | Money OS control plane |
| `/resources/money-dashboard/` | Operator status board |
| `/clients/` | Client systems offer + email intake |
| `/products/` | Free packs + stack → affiliate path |
| `/compare/semrush-vs-ahrefs/` | Commercial compare |
| `/compare/jasper-vs-copy-ai/` | AI writer compare |
| `/resources/affiliates/` | Apply → enable IDs |

## Money model

1. **Affiliates (Phase 1)** — apply programs → paste URL in `js/config.js` → all `data-aff` CTAs upgrade.
2. **AdSense (Phase 2)** — `ca-pub-1959018852581373`, sites **Getting ready** (Google review).
3. **Client systems** — high-ticket OS installs; email only (no agent auto-send).
4. **Products** — free packs now; AF Stripe optional via `AF_STRIPE_*` (never RCL limo Stripe).

## Human gates (only you)

- Affiliate program approvals + tracking IDs
- AdSense Ready status (wait; do not click own ads)
- Client email replies / invoices
- Optional AF Stripe product Payment Links

## Agent commands

```bash
cd ~/.grok/work/authorityforge
npm run scaffold:money   # regenerate money/client pages
npm run pipeline         # publish next free-LLM post
npm run agent:full       # full-radius cycle
```

## Hard rules

- Never move money or send email without approval-queue
- Never click own ads
- Disclosure always on
- AF_ZERO_COST until real revenue
