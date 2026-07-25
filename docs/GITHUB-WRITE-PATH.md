# GitHub write path for AuthorityForge

## Verified working (2026-07-25)

| Path | Status |
|------|--------|
| CLI / agent shell as `royalcarriage` (`gh` + `git push`) | ✅ Admin/push on `royalcarriage/authorityforge` |
| Grok GitHub **connector** (in-product OAuth app) | ⏳ Grant in GitHub UI (see below) |
| Account `royalcarriagelimollc-dot` (Vercel-linked) | Separate user — create/connect repo under that account OR re-point Vercel to `royalcarriage/authorityforge` |

## Grant Grok GitHub connector write access

1. Open GitHub while logged in as **`royalcarriage`**:  
   https://github.com/settings/installations  
   (or https://github.com/settings/applications if OAuth apps)
2. Find **Grok** / **xAI** / **Grok GitHub** application.
3. Configure → **Repository access**:
   - Either **All repositories**, or  
   - **Only select** → add **`royalcarriage/authorityforge`**
4. Permissions must include **Contents: Read and write** (and **Metadata: Read**).
5. Save → return to Grok → reconnect GitHub if prompted (`/mcps` or GitHub connect UI).
6. Smoke test from Grok: create a branch/file on `authorityforge` and push.

## Prefer Vercel account alignment

- Public site: https://authorityforge-tau.vercel.app  
- If Vercel is under `royalcarriagelimollc-dot`, either:
  - **A.** Create `royalcarriagelimollc-dot/authorityforge` and grant `royalcarriage` write, or  
  - **B.** Point Vercel Git integration at `royalcarriage/authorityforge` (simplest if Grok writes there).

## Once write works for the autonomous agent

Immediately:
1. Push full multipage content (guide, blog cluster, resources)
2. Wire Vercel production branch `main`
3. Activate content pipeline (scheduled/PR commits only; no money moves)
