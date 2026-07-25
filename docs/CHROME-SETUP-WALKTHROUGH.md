# Chrome walkthrough — AdSense CMP + GSC + Vercel env

**Account:** `royalcarriagelimollc@gmail.com`  
**Site:** `https://authorityforge-tau.vercel.app`

Chrome automation needs you signed in (passkey/password cannot be completed by the agent).

## 0. CDP (for agent-driven Chrome)

```bash
# Quit Chrome, then:
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9222 \
  --user-data-dir="$HOME/Library/Application Support/Google/Chrome"
```

Then tell the agent: **continue Chrome walkthrough**.

## 1. AdSense — European CMP (3 choices)

1. Open: https://adsense.google.com/adsense/new/u/0/pub-1959018852581373/privacymessaging  
2. **European regulations** → Create (or Manage → Create message)  
3. **Sites:** select `authorityforge-tau.vercel.app` (add site first if missing under Sites)  
4. **Do not consent** → **ON** (Consent / Do not consent / Manage options)  
5. Privacy policy URL:  
   `https://authorityforge-tau.vercel.app/legal/privacy/`  
6. **Publish**

## 2. Search Console

1. https://search.google.com/search-console  
2. Add property → **URL prefix** →  
   `https://authorityforge-tau.vercel.app/`  
3. Verify (HTML tag or Google Analytics if available)  
4. Sitemaps → submit:  
   `https://authorityforge-tau.vercel.app/sitemap.xml`

## 3. Vercel env (cloud brain)

1. https://vercel.com → project **authorityforge** → Settings → Environment Variables  
2. Add for Production (and Preview if you want):

| Name | Value |
|------|--------|
| `GEMINI_API_KEY` | your Gemini free key |
| `AF_ZERO_COST` | `1` |
| `AI_GATEWAY_API_KEY` | gateway key (after card unlock for free tier) |

3. Redeploy (Deployments → … → Redeploy) or push any commit.

## 4. AI Gateway free tier unlock (optional)

1. Vercel → team → AI → add credit card (verification only)  
2. Still only call free models (`*-free` / $0) via our router  

## 5. Affiliates (money)

1. https://authorityforge-tau.vercel.app/resources/affiliates/  
2. Apply Semrush + Ahrefs (+ Surfer)  
3. Paste tracking URLs into `js/config.js` `enabled: true`

## Done checklist

- [ ] CMP published  
- [ ] GSC property + sitemap  
- [ ] Vercel GEMINI_API_KEY set  
- [ ] Affiliate IDs enabled  
- [ ] `gh workflow run agent-autonomous.yml` still green  
