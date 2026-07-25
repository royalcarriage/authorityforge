# Google AdSense setup — AuthorityForge

## Status

| Step | Status |
|------|--------|
| 15–25+ commercial pages in repo | ✅ (~25 commercial cluster pages) |
| Affiliate disclosure + monetization policy | ✅ `/legal/*` |
| Privacy policy (required) | ✅ `/legal/privacy/` |
| AdSense loader (off until approved) | ✅ `js/ads.js` + `js/config.js` |
| ads.txt placeholder | ✅ `/ads.txt` |
| AdSense account application | ⏳ Owner Google login in Chrome |
| ADS_ENABLED = true | ⏳ Only after approval |

## Apply in Chrome (you must sign in)

1. Open **https://www.google.com/adsense/start/**
2. Sign in with the Google account that will own AdSense (e.g. royalcarriagelimollc)
3. Click **Get started**
4. **Website URL** — use the **public** URL Google can crawl:
   - Preferred after Vercel git link: `https://authorityforge-tau.vercel.app`
   - Available now: `https://royalcarriage.github.io/authorityforge`
5. Country / payments profile as prompted
6. Submit for review (can take days–weeks)

## After approval

1. Copy **Publisher ID** (`ca-pub-…` / `pub-…`)
2. Edit `js/config.js`:
   ```js
   ADSENSE_CLIENT: "ca-pub-XXXXXXXXXXXXXXXX",
   ADS_ENABLED: true,
   ```
3. Edit `ads.txt` — uncomment and set:
   ```
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
4. Create ad units in AdSense → paste slot IDs into `ADS_SLOTS` (optional)
5. Commit + push `main` → redeploy
6. In AdSense, request review / verify ads.txt at:
   `https://YOUR-DOMAIN/ads.txt`

## Chrome checklist while applying

- Site has real content (not under construction)
- Privacy policy linked in footer
- Contact / about present
- No prohibited content
- Navigation works on public URL

## Do not

- Enable `ADS_ENABLED` before approval (invalid traffic risk)
- Click your own ads
- Stuff auto ads on every pixel before UX check
