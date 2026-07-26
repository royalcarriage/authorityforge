# Dual-host ops — GitHub Pages + Vercel

**Updated:** 2026-07-26  
**Primary (app + API + demos):** https://authorityforge-tau.vercel.app/  
**Static mirror:** https://royalcarriage.github.io/authorityforge/

---

## Roles

| Host | Serves | Does not |
|------|--------|----------|
| **Vercel** | Multipage static (`dist/`) + `/api/*` (auth, app, health, CEO) | — |
| **GitHub Pages** | Same multipage HTML under `/authorityforge/` | Serverless (uses `AF_CONFIG.apiBase` → Vercel) |

Both share one repo. `node scripts/prepare-vercel.mjs` builds `dist/` for Vercel with root paths + Vercel `siteUrl`.

---

## Health bar (pass/fail)

Run after every promote:

```bash
VZ=https://authorityforge-tau.vercel.app
GH=https://royalcarriage.github.io/authorityforge

# Must NOT be "Files within /"
curl -sS "$VZ/" | head -c 80

curl -sSL -o /dev/null -w "%{http_code}\n" "$VZ/"
curl -sSL -o /dev/null -w "%{http_code}\n" "$VZ/app/signup/"
curl -sS "$VZ/api/health/" | head -c 120
curl -sSL -o /dev/null -w "%{http_code}\n" "$GH/"
curl -sSL -o /dev/null -w "%{http_code}\n" "$GH/services/tracking/"
```

Auth smoke (trailing slash required — `trailingSlash: true`):

```bash
curl -sS -X POST "$VZ/api/auth/" -H 'Content-Type: application/json' \
  -d '{"action":"signup","email":"test@example.com","password":"TestPass123!x","name":"T"}'
```

---

## Hard rules

1. **Never** `vercel deploy` from a half-built or empty folder. Use **git push to main** so `prepare-vercel` runs.
2. **Never** copy `api/` into `dist/` (`prepare-vercel` SKIP list). That produced directory-listing production.
3. Client always hits `/api/auth/` and `/api/app/` **with trailing slash** (see `js/app-auth.js`).
4. User store commits use `[skip ci]` so signup does not thrash redeploys.
5. GSC property: URL-prefix `https://authorityforge-tau.vercel.app/` — keep `google50d44b410e62a715.html` at site root.
6. MERGED ≠ LIVE — curl the public URL after promote.

---

## 2026-07-26 audit snapshot

| Check | GH Pages | Vercel |
|-------|----------|--------|
| Home + key marketing/app routes | 200 | 200 |
| Sitemap URLs (86) | 86/86 200 | 86/86 200 |
| robots + ads.txt + llms.txt | OK | OK |
| GSC verification file | 200 | 200 (via clean URL) |
| `/api/health/` | n/a (404) | 200 |
| Signup/login POST `/api/auth/` | via apiBase | OK |
| Config basePath | `/authorityforge` | `""` (rewritten) |

**Fixed this cycle:** Instant Rollback undo → promote `f93d5e2`; prepare-vercel skips `api`/`agents`; user-store `[skip ci]`.

---

## Customer demo path

Prefer **Vercel**: `/start/` → `/app/signup/` → `/app/onboard/` → `/app/dashboard/`.  
GH Pages signup works but all API calls go to Vercel (`apiBase`).
