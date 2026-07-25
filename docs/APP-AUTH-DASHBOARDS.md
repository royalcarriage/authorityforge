# App auth + dashboards (product surface)

## Why this exists

Static systems pages educate. **Accounts + dashboards** make people return, complete money checklists, and pay for upgrades / client installs.

## URLs

| Surface | Path |
|---------|------|
| Why join | `/start/` |
| Pricing | `/pricing/` |
| Sign up | `/app/signup/` |
| Log in | `/app/login/` |
| Customer dashboard | `/app/dashboard/` |
| Operator HQ | `/app/admin/` |

APIs (Vercel) — consolidated for Hobby 12-function limit:

- `GET /api/auth` — current user (me)
- `POST /api/auth` `{ action: "signup"|"login"|"logout", ... }`
- `GET|POST /api/app` `{ action: "projects"|"checklist"|"brief"|"admin", ... }`

## Env (Vercel)

| Var | Purpose |
|-----|---------|
| `AF_SESSION_SECRET` | JWT signing (required in prod) |
| `AF_GITHUB_TOKEN` | Persist users to `agents/data/users.json` on signup |
| `AF_GITHUB_REPO` | default `royalcarriage/authorityforge` |
| `AF_OPERATOR_EMAILS` | comma list; also auto-promotes company owner email |
| `GEMINI_API_KEY` | free AI briefs in dashboard |

## Operator access

Sign up / log in with `royalcarriagelimollc@gmail.com` (or any email in `AF_OPERATOR_EMAILS`) → role `operator` → `/app/admin/`.

## Money flow

1. Free signup → dashboard projects + checklists  
2. Affiliates / AdSense paths guided in-app  
3. Upgrade requests (email or future Stripe AF links)  
4. Client high-ticket via `/clients/`  

Never auto-send email or move money.
