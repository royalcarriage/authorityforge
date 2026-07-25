# Why AdSense said "not live" + fix

## Root cause
AdSense was almost certainly checking **https://authorityforge-tau.vercel.app**

That Vercel deployment is still an **old stub**:
- ❌ no `/ads.txt`
- ❌ no privacy / full cluster
- ❌ no AdSense script on all routes

The **full site** (with ads + ads.txt) is live at:

| URL | Role |
|-----|------|
| https://royalcarriage.github.io/authorityforge/ | Full multipage site |
| https://royalcarriage.github.io/ads.txt | **Domain-root ads.txt** (required by Google) |
| https://authorityforge-tau.vercel.app | Stub until Git linked |

## Google ads.txt rule
`ads.txt` must be at the **root of the domain**:
- ✅ `https://royalcarriage.github.io/ads.txt`
- ❌ not only under `/authorityforge/ads.txt`

## What to put in AdSense "Site"
Use:
```
https://royalcarriage.github.io/authorityforge
```
or the root:
```
https://royalcarriage.github.io
```

**Do not** use the Vercel tau URL until it serves the full site.

## After Vercel is linked
Point AdSense at `https://authorityforge-tau.vercel.app` and ensure
`https://authorityforge-tau.vercel.app/ads.txt` returns the pub line.
