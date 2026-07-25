# AuthorityForge — CEO Company Playbook
**Date:** 2026-07-25 · **Owner:** royalcarriagelimollc@gmail.com  
**Live product:** Vercel `authorityforge-tau.vercel.app` + GitHub Pages content

---

## 1. What company are we?

**AuthorityForge is a productized “search authority + monetization OS.”**

We are **not** selling:
- Random blog posts
- “We’ll do your SEO” vague retainers
- Fake rank guarantees
- AdSense clicks / black-hat

We **are** selling:
1. **A system customers run** (login → dashboard → projects → checklists → publish → measure → money)
2. **Done-with-you / done-for-you installs** of that same system on *their* brand
3. **Education that creates operators**, not dependents — so they come back weekly

**One-line pitch:**  
> *“We install the same ranking + revenue operating system we run on AuthorityForge — and give you a dashboard so you actually use it.”*

---

## 2. Purpose for the customer (why they exist in our world)

| Customer type | Pain today | What we give them | Why they come back |
|---------------|------------|-------------------|--------------------|
| **Solo affiliate / content operator** | Knows SEO theory, no system, thin money | Free forge + checklists + AI briefs + affiliate path | Weekly progress on *their* project, not more articles to read |
| **SaaS / AI tool founder** | Content team flailing, no topical ownership | Cluster architecture + commercial pages + measurement loop | Pipeline cadence + measurable CTR/index gains |
| **Agency / freelancer** | Reinvents process per client | White-label OS + Agency plan workspaces | Client delivery speed = margin |
| **Local service business (later)** | Pays agencies for opaque work | Simpler “local authority pack” (phase 2 product) | Rankings + lead path they can see |

**Emotional promise:** control + clarity + a money path they can open tomorrow morning.

**Rational promise:** one hub owns intent; spokes earn; affiliates then AdSense; measure weekly.

---

## 3. What are we teaching them? (the curriculum)

Everything we teach must map to **action in the dashboard**.

### Core curriculum (must master)
1. **Intent ownership** — one primary URL per job-to-be-done  
2. **Hub / spoke clusters** — architecture before word count  
3. **Commercial pages without spam** — compare / best-of / tools with disclosure  
4. **Money wiring** — affiliates first, AdSense after quality traffic  
5. **Measurement loops** — GSC impressions → CTR rewrites → next publish  
6. **Agent-assisted ops without index spam** — free LLM + human edit gate  

### What we never teach
- Guaranteed #1 rankings  
- Buying links as a strategy  
- Clicking your own ads  
- Undisclosed sponsorships  

---

## 4. Live blast radius (tested 2026-07-25)

### GREEN (works)
| Surface | Status |
|---------|--------|
| Marketing pages Vercel + GH Pages | 200 (`/`, `/start/`, `/pricing/`, systems, clients, products, blog) |
| Signup / login API | `ok: true`, `storeVia: "github"` (durable users) |
| Customer dashboard UI | 200 |
| Free AI brief (Gemini) | Works when key present, `$0` |
| Health / company APIs | Gemini configured, zero-cost mode |
| AdSense code + ads.txt | Live on both hosts |
| ~83 HTML pages, 18 posts | Content surface exists |

### YELLOW (works but incomplete)
| Item | Risk |
|------|------|
| Affiliate IDs mostly `enabled: false` | No passive $ until human applies/enables 3+ |
| AdSense status “Getting ready” | Days–weeks; no display revenue yet |
| Plan upgrades = email only | No Stripe Checkout for AF plans yet |
| Operator HQ needs owner signup with owner email | Auto-promote only if email matches |
| GH Pages has no APIs | Auth always depends on Vercel; cross-origin OK via `apiBase` |
| Memory vs GitHub store | Token set — still monitor cold starts / write races |

### RED / blast radius (can break trust or money)
| Risk | Blast radius | Mitigation |
|------|--------------|------------|
| **User store on GitHub** (OAuth token in Vercel) | Token leak = repo write; concurrent signups can race on `users.json` | Fine-grained PAT; rotate after any log exposure; later KV/DB |
| **Hobby 12-function limit** | New API files break deploy | Keep consolidated `/api/auth` + `/api/app` |
| **Stripe on project is RCL/integration noise** | Confusing AF with limo Stripe | Never wire limo acct to AF checkout; separate AF Stripe later |
| **AdSense on thin/new product** | Policy review delay / rejection | Keep content quality, no invalid traffic |
| **Teaching without dashboard habit** | Churn after free signup | Email onboarding sequence (approval-queue only for now) |
| **Selling Agency without CS capacity** | Refunds / bad reviews | Cap Agency seats; CS playbook before scale |

---

## 5. What we sell (SKU map)

### Product (self-serve)
| SKU | Price | Customer gets | Success metric |
|-----|-------|---------------|----------------|
| **Free Forge** | $0 | Account, 2 projects, checklists, AI briefs, public systems | Activation: project + 3 checklist items in 7 days |
| **Forge Pro** | $49/mo | 10 projects, money OS templates, pipeline cadence, priority queue | 1 publish/week + 1 affiliate path live |
| **Agency OS** | $199/mo | 50 projects / client workspaces, white-label runbooks, design system delivery | 1 client install / month |

### Services (sales-led)
| Offer | Typical price band* | Delivery |
|-------|---------------------|----------|
| **Forge Install** (cluster + money wiring on their domain) | $2.5k–$8k one-time | Architecture + pages + handoff |
| **Authority Sprint** (30 days) | $1.5k–$4k | Hub + 8–15 spokes + measurement setup |
| **Agency White-Label License** | Agency OS + setup fee | Training + templates |
| **Retainer Ops** | $1k–$3k/mo | Queue, publish, CTR loop (after install) |

\*Bands are planning anchors — quote per scope; no fake case studies.

### Passive (company treasury)
| Stream | Status | Owner action |
|--------|--------|--------------|
| Tool affiliates | Plumbing live, IDs off | Apply + enable 3+ |
| AdSense | Getting ready | Wait; never click own ads |
| Product subscriptions | Email upgrade only | Stripe AF account when volume justifies |

---

## 6. Motivation engine (why they act)

**Progress > content.**  
Motivation comes from:
1. **Visible checklist completion** (dopamine + money path)  
2. **A project that is *theirs*** (identity: “I’m an operator”)  
3. **Weekly ritual** (brief → publish → measure)  
4. **Social proof of the live demo** (AuthorityForge itself is the case study)  
5. **Referral unlocks** (see §9) — status + credits  

Sales language:
- “You’ll leave with a system, not a PDF.”  
- “Same OS we run publicly.”  
- “Free until the checklist is making you money.”

---

## 7. Sales team — how we get customers onboarded

### ICP priority (this quarter)
1. Affiliate / content operators (fastest Free → Pro)  
2. Small SaaS founders (Install offers)  
3. Boutique agencies (Agency OS)  

### Funnel
```
Content / social / referral
    → /start/ (why join)
    → /app/signup/ (free)
    → dashboard activation (project + checklist)
    → /pricing/ or email upgrade
    → Install quote (Sales)
    → CS handoff after payment
```

### Sales process (operator playbook)
| Stage | Action | Tool |
|-------|--------|------|
| **Prospect** | Share `/start/` + one commercial post matching niche | Blog, LinkedIn, X |
| **Qualify** | 3 questions: site URL, money model, who publishes | Email / call |
| **Demo** | Show *our* live Money OS + their free dashboard | Screen share |
| **Close Free** | “Start free now — 2 projects” | Signup link |
| **Close Paid** | Map checklist gaps → Pro or Install SKU | Pricing + proposal |
| **Handoff** | CS gets: plan, project, goals, due dates | Internal note / sheet |

### Objection handling
| Objection | Answer |
|-----------|--------|
| “I can read SEO blogs free” | “Reading doesn’t ship hubs. The dashboard does.” |
| “Agencies are cheaper hourly” | “You’re buying a reusable OS + speed, not hours.” |
| “Will I rank?” | “We own process and measurement; rankings follow intent ownership. No guarantees.” |
| “I don’t have time” | “That’s why Free starts with a 5-step money checklist.” |

### Sales KPI (CEO dashboard)
- Free signups / week  
- Activation rate (project + 3 checks in 7d)  
- Free → Pro conversion  
- Install pipeline $  
- Referral-sourced %  

---

## 8. Development team — what to build next (priority)

### P0 — this week (revenue / trust)
1. **Activation email draft** (approval-queue only) — day 0/2/7 sequences  
2. **Stripe AF Checkout** for Pro / Agency (separate from limo Stripe)  
3. **Affiliate enablement UI** in dashboard (paste URL → request enable)  
4. **Operator HQ real metrics** — signups, activation, failed logins  
5. **Race-safe user store** — or Vercel KV when free tier allows  

### P1 — next 2–4 weeks (retention)
1. **Onboarding wizard** after signup (niche → first project → first brief)  
2. **In-app publish status** (link to their site / GSC later)  
3. **Referral codes** (credits toward Pro)  
4. **Customer “wins” log** (non-fake: pages shipped, checklists, briefs used)  
5. **CS ticket / help center** (static FAQ + email SLA)  

### P2 — quarter (scale)
1. White-label client portals for Agency  
2. Multi-user seats  
3. Integrations: GSC OAuth read-only  
4. Template marketplace (paid packs)  

### Dev principles
- Stay under **Hobby 12 functions** until revenue  
- **AF_ZERO_COST** until net cash  
- Never couple RCL limo payments to AF  
- Ship behind feature flags when possible  

---

## 9. Referrals — gain motion + referrals at the same time

### Design
| Actor | Gives | Gets |
|-------|-------|------|
| **Customer** | Unique `/start/?ref=CODE` | 1 free project slot or $20 Pro credit after referee activates |
| **Referee** | Signs up free | Same Free Forge + bonus checklist pack |
| **AF** | Both activate | Two operators in the system, content loops compound |

### Rules
- Credit only after **activation** (not empty signup)  
- No cash payouts until Stripe + policy (treasury level 1)  
- Disclosure if affiliate-like rewards scale  

### Motion tactics
1. Dashboard CTA: “Invite an operator — unlock a project slot”  
2. End of every AI brief: soft share prompt  
3. Agency OS: white-label includes “powered by AuthorityForge” optional backlink  
4. Public leaderboard later (opt-in): “projects completed this month” — status, not spam  

---

## 10. Customer service team — how we help

### CS mission
Help customers **finish the next checklist item** and **not break policy**.

### Tiers
| Plan | Channel | SLA (target) |
|------|---------|--------------|
| Free | Email only | 72h |
| Pro | Email priority | 24–48h |
| Agency / Install | Email + scheduled call | 24h + kickoff call |

### Top ticket types & scripts
1. **“What do I do first?”** → Open dashboard → create project → niche checklist  
2. **“How do I make money?”** → Affiliates hub → enable IDs → commercial spokes  
3. **“AdSense pending”** → Normal; don’t click ads; keep shipping content  
4. **“AI brief is generic”** → Tighten topic; add niche + offer  
5. **“I want you to do it for me”** → Route to Sales Install SKU  

### CS must not
- Promise rankings or revenue numbers  
- Click customer ads  
- Send money/refunds without owner approval  
- Share other customers’ data  

### CS tools (now → next)
- Now: email + public docs + dashboard  
- Next: help center (`/help/`), ticket statuses in operator HQ  

---

## 11. Blog & content — what to write (and why)

### Content roles
| Type | Goal | Example |
|------|------|---------|
| **Activation** | Free users complete checklist | “Your first 7 days in the Forge dashboard” |
| **Commercial** | Affiliates + Pro | Semrush vs Ahrefs, AI writers, compare pages |
| **Trust / legal-adjacent** | AdSense + disclosure | How content sites pass review |
| **Sales enablement** | Installs | Client systems delivery playbook |
| **Product** | Feature adoption | Money OS walkthrough |

### Priority queue (write / publish next)
1. *Money OS for content sites: affiliates before ads* (queued)  
2. *Client SEO systems delivery playbook* (queued) — Sales PDF later  
3. *Comparison pages that earn* (queued)  
4. *Productized templates for affiliate sites* (queued)  
5. **NEW needed:**  
   - “What you get when you sign up free (tour tour)”  
   - “Free vs Pro vs Agency — who should pay”  
   - “How referrals work”  
   - “First client install case process (anonymized template)”  
   - “Weekly measurement loop you can run in 45 minutes”  

### Cadence
- 2 posts / week minimum (GHA + free LLM + edit gate)  
- 1 commercial + 1 activation/education mix  

---

## 12. Design / product UX advice (stand out)

### Differentiation
Most SEO sites: cream blogs, generic “services” pages.  
**We look like an operating system:** dark forge UI, dashboards, status, checklists.

### Design priorities
1. **Signup hero** — outcome first (“Open your forge”), not features  
2. **Empty states** that teach the first action  
3. **Money path always visible** in dashboard  
4. **Trust bar** — disclosure, no guarantees, live demo site  
5. **Mobile dashboard** — operators work on phone  

### Brand line for all surfaces
> **Ship authority. Wire money. Measure weekly.**

---

## 13. 90-day company scoreboard

| Metric | Day 30 | Day 60 | Day 90 |
|--------|--------|--------|--------|
| Free signups | 50 | 150 | 400 |
| Activation rate | 40% | 50% | 55% |
| Paying Pro seats | 3 | 10 | 25 |
| Install deals closed | 1 | 2 | 4 |
| Affiliate programs enabled (AF own) | 3 | 5 | 5 |
| AdSense | Pending | Pending/Ready | Ready + first $ |
| Blog posts | +8 | +16 | +24 |
| Referral-sourced signups | 10% | 20% | 25% |

---

## 14. CEO operating rhythm

| Cadence | Agenda |
|---------|--------|
| **Daily** | Signups, errors, AdSense/affiliate status, one sales touch |
| **Weekly** | Publish 2, enable any affiliate IDs, CS ticket review, pipeline $ |
| **Monthly** | SKU pricing, churn, treasury reinvest proposals (approval-queue) |

### Non-negotiables
- Human is legal CEO  
- No auto email/SMS/money  
- Zero paid LLM until net cash  
- AuthorityForge demo stays public and honest  

---

## 15. Immediate next actions (this week)

### Owner (you)
1. Sign up with **owner email** → confirm Operator HQ  
2. Apply to 3 affiliate programs (Semrush, Ahrefs, Surfer)  
3. Do not chase AdSense — wait on “Getting ready”  
4. Share `/start/` with 10 operators manually  

### Development
1. Stripe AF checkout for Pro  
2. Activation email drafts → approval-queue  
3. Onboarding wizard v1  

### Sales
1. One Install offer one-pager from this playbook  
2. 5 discovery calls from free signups  

### CS
1. FAQ from top 5 tickets (even before volume)  
2. Script: “next checklist item”  

### Content
1. Publish the 4 queued posts  
2. Write “dashboard tour” activation post  

---

## 16. Bottom line

**Purpose:** Turn confused SEO readers into **operators with a money path**.  
**Product:** Dashboard OS + optional install.  
**Teaching:** Intent, clusters, commercial pages, affiliates, measurement.  
**Return loop:** Progress on *their* projects + weekly ritual + referrals.  
**Company:** Sales onboard to free → paid; Dev ships activation/retention; CS unblocks the next checklist; Treasury only after real cash.

If we only ship more blogs without activation, we fail.  
If we only ship features without a clear sale, we fail.  
**Win condition:** Free user finishes checklist → either earns (affiliates) or pays (Pro/Install).
