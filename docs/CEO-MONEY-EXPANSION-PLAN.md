# CEO Money Expansion Plan — AuthorityForge + Limo / Logistics Lane
**Date:** 2026-07-25 · **Status:** strategy + live test notes  
**Companies in play:** AuthorityForge (content/SEO OS) · Royal Carriage (limo ops, LimoFlow *user*) · LimoFlow.com (third-party dispatch SaaS)

> **Critical ownership fact:** LimoFlow is **not** Royal Carriage’s product. It is external software RC **uses** for booking/dispatch (Moovs retired). limoflow.com markets LimoFlow as booking + dispatch + marketing tools for limo/transport operators.  
> Any “sell LimoFlow” path = **referral / reseller / implementation partner**, **not** claiming we own their IP — unless you negotiate a formal partnership.

---

## 1. Do we know what we’re selling?

### A. AuthorityForge (what we built)

| Layer | What the customer buys | Working today? | Useful today? |
|-------|------------------------|----------------|---------------|
| **Product** | Free account + dashboard + projects + checklists + AI briefs | **Yes** (signup→GitHub store→dashboard) | **Partially** — good for structure; thin without their real site data |
| **Education** | Systems pages + blog (clusters, money, measurement) | **Yes** | **Yes** for operators who will do the work |
| **Done-for-you** | Client Install / Sprint (`/clients/`) | **Offer page only** | High value if sold; not automated |
| **Subscriptions** | Pro $49 / Agency $199 | **Mailto only** — no Stripe Checkout | Not useful until pay wall works |
| **Passive (our site)** | Affiliates + AdSense | Plumbing live; **IDs/approval incomplete** | Not making $ yet |

**Honest verdict:**  
We are selling **“an operating system for search authority + monetization”** (login + process), not “rankings.”  
**Is it working?** Core product loop works in tests.  
**Is it useful enough to pay for?** Free tier: yes for motivated operators. Paid tier: not yet — missing billing, email, GSC, real integrations.

### B. What customers *think* we sell (risk)
If sales says “we’ll get you traffic,” we oversell.  
Correct frame: **system + accountability + optional install.**

---

## 2. Customer simulation (live test)

**Simulated customer:** Indie Operator  
**Path:** signup → me → project auto-created → checklist → brief

| Step | Result |
|------|--------|
| Signup | `ok: true`, `storeVia: github`, `next: /app/onboard/` |
| Me | `ok: true`, 1 project “first forge” |
| Checklist | Works when called correctly (revenue metric increments) |
| AI brief | Works with Gemini (may return control chars in raw JSON edge cases) |
| Onboard / help / pricing pages | 200 on Vercel |

### Friction a real customer feels
1. **After signup:** must understand onboard (good) but no email nudge if they leave.  
2. **Checklist** doesn’t connect to *their* live website (manual honesty).  
3. **“Projected checklist value”** is motivational, not real money — can feel fake if not labeled carefully.  
4. **Upgrade** = email, not one-click pay.  
5. **No integrations** with GSC, WordPress, Webflow, LimoFlow, Stripe (their business).  
6. **No proof pack** (before/after for a third party).  

---

## 3. How else can we make money here?

### Stream map (priority order for *cash*)

| # | Stream | Who pays | Difficulty | Time to $ | Notes |
|---|--------|----------|------------|-----------|--------|
| 1 | **Client Installs** (Forge on their domain) | Limo / SaaS / affiliate site owners | Med | **Fastest** | Sell what we already dogfood |
| 2 | **Pro subscriptions** | Operators using free weekly | Med | After Stripe | Need Checkout + activation |
| 3 | **Agency OS** | Freelancers selling SEO | Med | After 5 Pro | White-label runbooks |
| 4 | **Our AdSense** | Google | Low effort / long wait | Slow | Pending review |
| 5 | **Our affiliates** | Networks (Semrush etc.) | Low | After IDs | Apply 3 programs this week |
| 6 | **Templates / packs** | Same as Free users | Low | Medium | Paid Notion/PDF packs |
| 7 | **Limo marketing retainers** | Limo companies | High | Medium | Uses RC real-world proof |
| 8 | **LimoFlow referral / reseller** | LimoFlow + operator | High (partner) | Medium–slow | Only with contract |
| 9 | **Implementation: LimoFlow + tracking + ads** | Limo fleets | High skill | **Strong** | RC’s unfair advantage |
| 10 | **Logistics / NEMT / shuttle vertical packs** | Adjacent fleets | High | Later | Same ops pattern |

### Money we should **not** chase yet
- Building a full competitor to LimoFlow/LimoAnywhere (years + capital)  
- Paid ads to Free AF until activation >40%  
- Crypto / weird payment rails  

---

## 4. Who is the client base? How do we reach them?

### AuthorityForge ICPs

| Segment | Size of pain | How we reach them | Offer |
|---------|--------------|-------------------|--------|
| **A. Affiliate / niche site operators** | High | SEO Twitter/X, Reddit r/juststart, FB groups, YouTube | Free → Pro |
| **B. Solo SaaS / AI tool founders** | High | Indie Hackers, Product Hunt, LinkedIn | Install Sprint |
| **C. Boutique SEO freelancers** | Med | Agency communities, Upwork profiles | Agency OS |
| **D. Local service businesses** | High but slow | Google “SEO for [trade]” content | Install + content |
| **E. Limo / black car / party bus owners** | **Very high for RC** | Industry Facebook groups, associations, LimoFlow user communities, competitors of Moovs | **Marketing OS + optional LimoFlow setup** |

### How to get in front of them (practical)

| Channel | Play | Cost |
|---------|------|------|
| **Outbound** | 20 limo operators/week: “We run LimoFlow + Google Ads + authority sites — here’s the OS” | Time |
| **Inbound AF content** | Commercial SEO posts → signup | Free LLM + edit |
| **Partnerships** | Web designers, GTM freelancers | Rev share |
| **Referral** | Free users invite operators after activation | Credits |
| **RC proof** | Case study: RC migrated Moovs→LimoFlow + tracking (anonymized metrics only when true) | Trust |
| **LimoFlow ecosystem** | If partner: co-marketing, app directory, webinars | Partner dependent |

---

## 5. LimoFlow sale to dispatchers / limo / logistics — deep take

### What LimoFlow is (market)
Public positioning (limoflow.com + 2026 roundups): all-in-one **booking + dispatch + ops + marketing** for limo, chauffeur, shuttle, taxi-like fleets. Competitors include **Limo Anywhere**, **Moovs** (easier UX; RC left it), Transfervista, etc.

### What RC uniquely has
- Live production use of LimoFlow on **royalcarriagelimo.com** + RCB  
- Painful real migration knowledge (Moovs → LimoFlow)  
- Google Ads / GTM / conversion plumbing around LimoFlow purchases  
- Rate card / unit economics discipline  
- AuthorityForge as **marketing OS** next to ops software  

### Three ways to “sell LimoFlow” without owning it

| Model | What we sell | Who pays us | Requirements |
|-------|--------------|-------------|--------------|
| **A. Referral partner** | Recommend LimoFlow; get % of SaaS fee | LimoFlow | Written partner agreement |
| **B. Implementation partner** | Setup, rates, embeds, GTM, training | Limo company ($3k–$15k project) | Productized setup package |
| **C. Bundle** | “Ops (LimoFlow) + Growth (AuthorityForge Install)” | Limo company | Two products, one proposal |

### Logistics companies — expand carefully
| Vertical | Fit for LimoFlow | Fit for AF Install |
|----------|------------------|--------------------|
| Black car / limo / party bus | **Native** | Strong (airport/wedding/corporate content) |
| Airport shuttle | Strong | Strong |
| NEMT / medical transport | Partial (if LimoFlow supports) | Different content SEO |
| Last-mile logistics / freight | **Poor** for LimoFlow | Different stack entirely |
| Corporate ground transport | Strong | Strong |

**Do not** pitch LimoFlow as “logistics ERP.” Pitch **chauffeured ground transport operators** first.

### Risks of LimoFlow sales motion
- Channel conflict with LimoFlow’s own sales  
- Support burden if we don’t control product roadmap  
- Mixing RC operational secrets into generic playbooks  
- Confusing prospects: “Are you LimoFlow or a limo company?”  

**Positioning if we do it:**  
> “Royal Carriage / AuthorityForge — **implementation + growth partner** for operators on modern dispatch (including LimoFlow). We’re operators first.”

---

## 6. Easy setup & integrations roadmap

### Principle
Every integration must answer: **reduces time-to-first-value for the customer.**

### Integration backlog (ordered by ROI)

| Integration | Customer benefit | Effort | Depends on |
|-------------|------------------|--------|------------|
| **Stripe Checkout (AF account)** | Pay Pro in 30s | Med | New Stripe acct |
| **Email (Resend/Postmark)** | Onboard + recover churn | Med | Domain DNS |
| **GSC OAuth read-only** | Real impressions in dashboard | High | Google Cloud |
| **WordPress / Webflow export** | Ship spokes faster | Med | Templates |
| **Webhook out** | Connect their Zapier | Low | API key |
| **LimoFlow embed helper** | Limo clients get booking live | Med | LF docs + partner |
| **Google Business Profile checklist** | Local operators | Low | Content |
| **Referral codes** | Growth | Med | DB/store |
| **Calendar booking (Cal.com)** | Sales Install calls | Low | OSS/SaaS |

### “Easy setup” product packaging

**Forge Setup Wizard (product):**
1. Niche  
2. Money model  
3. Site platform (WP / Webflow / static / none)  
4. Connect domain later  
5. Generate first brief + checklist  

**Limo Operator Setup Pack (service):**
1. LimoFlow rates + vehicles  
2. Website embed on /book-now  
3. GTM purchase events  
4. Authority pages (airport, wedding, fleet)  
5. 30-day content queue  

---

## 7. Expanded product architecture (systems view)

```
                    ┌─────────────────────────────┐
                    │     DEMAND / ACQUISITION     │
                    │ content · ads · outbound ·   │
                    │ LimoFlow partner · referrals │
                    └──────────────┬──────────────┘
                                   ▼
                    ┌─────────────────────────────┐
                    │   AUTHORITYFORGE APP (SaaS)  │
                    │ signup · onboard · dashboard │
                    │ projects · briefs · plans    │
                    └──────┬──────────────┬───────┘
                           │              │
              self-serve   │              │ sales-led
                           ▼              ▼
                    ┌────────────┐  ┌──────────────────┐
                    │ Pro/Agency │  │ Install / Sprint  │
                    │ Stripe $   │  │ High-ticket $     │
                    └────────────┘  └────────┬─────────┘
                                             │
                         limo vertical       ▼
                                  ┌──────────────────────┐
                                  │ LIMO GROWTH BUNDLE    │
                                  │ AF site systems +     │
                                  │ LimoFlow implement    │
                                  │ (partner/referral)    │
                                  └──────────────────────┘
```

---

## 8. Is the current setup “working and useful”?

### Working (technical)
- Auth + durable users  
- Dashboard project/checklist  
- Free AI briefs  
- Public Money OS / sales kit / help  
- Zero-cost LLM path  

### Not yet useful enough for serious MRR
- No payment capture  
- No email lifecycle  
- No real site data (GSC)  
- Weak proof for non-RC verticals  
- Affiliate IDs not enabled for AF itself  

### Customer-useful minimum (definition of done for “sellable”)
- [x] Signup + login  
- [x] Project + checklist  
- [x] Onboard wizard  
- [x] Help for CS  
- [x] Sales kit  
- [ ] Stripe Pro  
- [ ] Day-0 email  
- [ ] 1 public case study (even RC marketing system, careful metrics)  
- [ ] 3 affiliate IDs live on AF  

---

## 9. 90-day money plan (dual track)

### Track 1 — AuthorityForge (software + install)
| Week | Focus |
|------|--------|
| 1–2 | Stripe Pro; activation email drafts; enable 3 affiliates on AF site |
| 3–4 | 20 outbound operator demos; 5 Install conversations |
| 5–8 | First paid Install; first 5 Pro seats |
| 9–12 | Agency OS pilot with 1 freelancer; referral v1 |

### Track 2 — Limo / dispatch lane
| Week | Focus |
|------|--------|
| 1–2 | Clarify LimoFlow partner options (referral vs implement-only) |
| 3–4 | Productize “Limo Operator Setup Pack” one-pager + price |
| 5–8 | 15 outbound limo companies (not using modern dispatch or stuck on Moovs) |
| 9–12 | 1–2 paid implementations; document playbook inside AF Agency |

**Cash hierarchy:** Install cash → Pro MRR → AF passive → LimoFlow residual (if partner).

---

## 10. Competitive context (limo software)

| Player | Angle | Our angle vs them |
|--------|--------|-------------------|
| LimoFlow | Ops + marketing software | We can implement + grow on top |
| Limo Anywhere | Established dispatch | Migration/implement + marketing OS |
| Moovs | Easy booking (RC left) | “We already migrated once” story |
| Generic SEO agencies | Content retainers | Productized OS + operator proof |

We do **not** win by rebuilding dispatch. We win by **growth + setup expertise** beside it.

---

## 11. Recommended “company portfolio” naming

Keep brands clear:

| Brand | Audience | Promise |
|-------|----------|---------|
| **AuthorityForge** | Operators / agencies / founders | Search authority OS |
| **Royal Carriage** | Riders | Limo rides |
| **RC Growth Lab** (optional DBA) | Other limo fleets | LimoFlow + ads + authority installs |

Never put limo rider ads and AF SaaS ads in the same Google Ads account logic.

---

## 12. Immediate decisions for the owner

1. **Is LimoFlow sales a partner motion or implement-only?** (Decide this week.)  
2. **Ship Stripe on AF** before more features.  
3. **Sell Installs hard** — software free tier is the funnel, services are the cash.  
4. **Enable AF affiliates** — passive side needs human KYC.  
5. **Do not build logistics TMS** — out of scope.  

---

## 13. One-page answer to “how else do we make money?”

1. Sell **Installs** to people who won’t do the work.  
2. Convert active Free users to **Pro**.  
3. Monetize **our** site with affiliates + AdSense.  
4. Productize **RC’s LimoFlow + tracking + content** expertise for other fleets.  
5. Optionally take **LimoFlow referral %** if partnered.  
6. Later: Agency seats + template marketplace.  

**Purpose for customers:** turn chaos (random SEO / broken booking ops) into a **weekly operating system**.  
**Purpose for us:** free product as wedge; paid systems and installs as cash; limo vertical as unfair advantage because we run it for real.

---

*Companion docs: `CEO-COMPANY-PLAYBOOK.md`, `SALES-READY-CHECKLIST.md`, `MONEY-AND-CLIENTS.md`, `APP-AUTH-DASHBOARDS.md`*
