# Operator contract — AuthorityForge is autonomous

**You do not sell. You do not onboard. You do not demo.**  
Agents + scheduled jobs run the company. You are legal owner + one-time gates only.

---

## What the machine owns (default)

| Loop | Who runs it |
|------|-------------|
| Content research → queue → publish → deploy | CEO / autonomous GHA daily |
| Site health, dual-host, GSC file, sitemap | Devops agent + scripts |
| Affiliate/AdSense **prep** (pages, ads.txt, config) | Monetization agent |
| Self-serve signup → dashboard (if anyone arrives) | Product APIs — zero human |
| Money drafts / treasury proposals | Agents → **approval-queue only** |

North star (control plane): **self-operating content + affiliate + AdSense** at near-zero cost.

---

## What is never your job

- Cold sales, demos, discovery calls  
- Manual customer onboarding  
- “Start free” coaching calls  
- Hand-running Track Setup for clients (unless later fully productized + access-granted automation)  
- Writing outreach emails to prospects  

If an agent plans those, **kill the plan** — wrong mode.

---

## Human gates (one-time / rare — not daily ops)

1. Paste secrets (Gemini, `AF_GITHUB_TOKEN`, etc.)  
2. Click AdSense / CMP approve when Google asks  
3. Apply to affiliate programs once → paste IDs into config  
4. GSC verify once (done for Vercel primary)  
5. Approve money/email from `agents/approval-queue/` — never auto-send  

---

## How it runs without you watching

```bash
# Daily (GitHub Actions)
agent-autonomous.yml   # full radius, free LLM, publish optional
ceo-cycle.yml          # company OS cycle
content-pipeline.yml   # content factory

# Manual kick (agents / this session)
gh workflow run agent-autonomous.yml
# or: AF_ZERO_COST=1 AF_CEO_PUBLISH=1 node scripts/agent-autonomous.mjs
```

Primary URL: https://authorityforge-tau.vercel.app/  
HQ: `/company/` · Money OS: `/systems/money/` · Ops: `docs/HOW-AUTONOMY-WORKS.md`

---

## Product surfaces that look like “sales”

`/clients/`, `/start/`, `/app/signup/` exist as **self-serve product UI**, not a script for you to pitch.  
Inbound strangers can use them; **you never run that funnel.**

Deferred: high-touch “Track Setup installs” as owner-delivered services.  
Future only if **fully automated** (access → scripts → handoff) with no human in the loop.

---

**Policy flag:** `ownerDoesNotSellOrOnboard: true` in `agents/company-state.json` + `objective.json`.
