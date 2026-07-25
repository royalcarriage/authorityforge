# Deploy AuthorityForge to Vercel (root domain)

**Does not touch** royalcarriagelimo.com (Hostinger VPS).

## Production URL
https://authorityforge-tau.vercel.app

## How deploy works
1. `vercel.json` runs `node scripts/prepare-vercel.mjs`
2. Script writes `dist/` with **root** paths (`/css/...`) and Vercel canonicals
3. Source tree on `main` keeps **GitHub Pages** paths (`/authorityforge/...`)

## Deploy (CLI)
```bash
export VERCEL_TOKEN=...   # full-account token
export SITE_URL=https://authorityforge-tau.vercel.app
npx vercel@latest --prod --yes --token "$VERCEL_TOKEN"
```

Or link project once: `npx vercel link --project authorityforge-tau` then `npx vercel --prod`

## After deploy verify
```bash
curl -sS -o /dev/null -w "%{http_code}\n" https://authorityforge-tau.vercel.app/css/styles.css
curl -sS https://authorityforge-tau.vercel.app/ads.txt
curl -sS https://authorityforge-tau.vercel.app/ | grep -E 'ca-pub|styles.css'
```
