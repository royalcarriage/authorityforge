# Tracking Setup Product — GTM · GA4 · Website (access → clean install)
**Company:** AuthorityForge / RC Growth Lab (service arm)  
**Date:** 2026-07-25  
**Status:** Product design — build after Stripe Install path; do **not** reuse RC locked 6366/GTM-WNSZCVTB configs as copy-paste for clients.

---

## 1. The idea (yes — this is a strong money product)

**Customer intention:**  
“I need tracking and analytics that aren’t broken — so I can see leads, sales, and ads ROI.”

**Our offer:**  
If they grant **required access**, we run a **repeatable setup pipeline** (scripts + checklist + human QA) that installs **clean GTM + GA4 + site tags** without spaghetti tags, double fires, or fake events.

This sells better than pure SEO theory because:
- Pain is acute (ads spend with blind conversion data)
- Outcome is concrete (“container live, purchase once, debug view clean”)
- RC already paid to learn the hard version (Moovs → LimoFlow, dual accounts, locks)

**Positioning:**  
> *“We don’t guess tags. You give access; we install a clean measurement system — same discipline we run in production.”*

---

## 2. What we are / aren’t selling

### We sell
| Package | Deliverable |
|---------|-------------|
| **Track Lite** | GA4 property + GTM web container + base pageview + 3–5 key events + docs |
| **Track Commerce** | Lite + purchase/lead events, thank-you rules, basic enhanced measurement hygiene |
| **Track Ads** | Commerce + Google Ads conversion linker + 1–2 primary conversions (their account) |
| **Track Limo** | Commerce + **LimoFlow / booking embed** event contract + purchase path QA |
| **Track Care** | Monthly audit: debug view, tag sprawl, broken triggers (retainer) |

### We do **not** sell (by default)
- Access to **Royal Carriage’s** GTM/GA4/Ads containers  
- Guaranteed ROAS or “perfect attribution”  
- Mutating client Ads campaigns without written scope  
- Copying RC’s locked conversion labels into client accounts  

---

## 3. Required access (customer grants — minimum set)

Document this as a **Access Checklist** before any script runs.

| System | Access needed | Why |
|--------|---------------|-----|
| **Google Tag Manager** | Admin or Publish on **new or empty-ish** container | Create tags/triggers/variables |
| **GA4** | Editor on property (or create new) | Data streams, events, key events |
| **Google Ads** (optional) | Standard or Admin on **their** account | Conversion actions + linker |
| **Website** | Deploy path: WP admin / Vercel / FTP / Git / Cloudflare | Inject GTM snippet once |
| **CMS / booking** (optional) | LimoFlow / Shopify / etc. as scoped | Event contract on thank-you |
| **DNS / domain** | Only if new GA/GSC verification | Verify ownership |

### Access modes (pick one)
1. **Invite us** as Google user (preferred) — temporary Admin, removed after handoff  
2. **Service account** where APIs allow (limited for GTM UI work)  
3. **Customer runs script** with their OAuth (we supply script + guide; they click approve)  

**Never** ask for passwords in email. Prefer Google invite + time-boxed access.

---

## 4. “Runs a script to set things up cleanly” — architecture

### Reality check
- **GTM/GA4 public APIs** can automate a lot, but **full UI parity** is incomplete; hybrid wins: **API + template JSON + human publish QA**.  
- “One magic script” that fully configures any broken container is a lie.  
- “One pipeline that installs a **known-good baseline** on a **clean container**” is true and sellable.

### Pipeline design

```
Customer intake (intent + stack)
        │
        ▼
Access gate (checklist signed)
        │
        ▼
┌───────────────────┐
│ 1. Site probe     │  curl homepage, detect existing GTM/GA4/pixels
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ 2. Baseline plan  │  choose package: Lite / Commerce / Ads / Limo
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ 3. Provision      │  create/attach GA4 stream + GTM container (API or UI)
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ 4. Install snippet│  one GTM head/body snippet on site (PR or WP plugin)
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ 5. Import template│  GTM gallery / JSON import: base tags + triggers
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ 6. Wire money evt │  thank-you URL or dataLayer contract (LimoFlow etc.)
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ 7. QA script      │  Playwright: load pages, assert dataLayer + network
└─────────┬─────────┘
          ▼
Handoff doc + remove elevated access
```

### Repo layout (build under AF or RC-services)

```
packages/tracking-setup/          # or authorityforge/scripts/tracking-setup/
  README.md
  ACCESS.md                       # customer checklist
  probe-site.mjs                  # detect existing tags
  templates/
    gtm-baseline-web.json         # exportable container baseline
    ga4-events.md                 # event dictionary
    limoflow-events.md            # booking purchase contract
  install-snippet/
    wordpress-mu-plugin.php
    next-snippet.tsx
    static-snippet.html
  qa/
    playwright-tracking.spec.ts   # assert gtm.js + dataLayer
  handoff/
    client-report.md.template
```

### What the script **can** automate well
- Probe: is GTM already on site? which IDs?  
- Generate snippet for their `GTM-XXXX`  
- WP/Next/static install PR  
- QA crawl: GTM loads once, no duplicate containers  
- Report: before/after tag inventory  

### What stays human (or semi-auto)
- Publishing GTM workspace (review)  
- Naming conventions per client  
- Ads conversion action creation (API possible, still review)  
- LimoFlow-specific thank-you / postMessage quirks  
- Consent mode / CMP legal choices  

---

## 5. Clean baseline (the product standard)

Every client gets the **same philosophy** (not the same RC IDs):

| Rule | Why |
|------|-----|
| **One** GTM web container per site (or clear multi-domain plan) | No double pageviews |
| GA4 via GTM only (not also hard-coded gtag unless justified) | Single control plane |
| **One primary money event** | Ads doesn’t learn on noise |
| Purchase/lead requires **transaction_id** (or equivalent) when possible | Dedup |
| No click spam as primary conversion | Avoid RC’s past launch-pack mistake |
| Consent mode documented if EU traffic | Legal + accuracy |
| Handoff: DebugView video or screenshots | Proof of work |

### Event dictionary (minimal Commerce)

| Event | When | Params |
|-------|------|--------|
| `page_view` | All pages (GA4 enhanced or GTM) | page_location |
| `generate_lead` | Form success / quote | value optional |
| `begin_checkout` | Checkout start | value, currency |
| `purchase` | Payment success | transaction_id, value, currency |

### Limo package add-on
Align to **one** documented contract (inspired by RC learnings, **client-specific names**):
- Prefer provider native purchase signal → single GTM trigger → GA4 + optional Ads  
- Never dual-fire two primaries without explicit design  

---

## 6. Pricing (service SKUs)

| Package | Price band | Includes |
|---------|------------|----------|
| **Track Lite** | $750–$1.5k | GTM+GA4 baseline, snippet, QA, 1 revision |
| **Track Commerce** | $1.5k–$3k | + purchase/lead path |
| **Track Ads** | +$500–$1.5k | + Ads conversion + linker |
| **Track Limo** | $2.5k–$6k | + booking embed path + flight/book QA |
| **Track Care** | $300–$800/mo | monthly audit + fix hours |

Bundle with **AuthorityForge Install** for website+SEO+tracking = highest ticket.

---

## 7. How this sits next to AuthorityForge app

| AF Free dashboard | Tracking Setup service |
|-------------------|------------------------|
| Teaches *what* to measure | *Installs* measurement |
| Checklist item “measurement loop” | Turns checklist green for real |
| Lead magnet for operators | Cash for RC Growth / AF services |

**In-app upsell copy:**  
“Need GTM/GA4 installed cleanly? Grant access → we run the Track pipeline.”

---

## 8. Safety / blast radius

| Risk | Mitigation |
|------|------------|
| Client gives access to wrong property | Written property IDs in intake form |
| Break existing tags | Probe first; prefer new container or isolated workspace |
| Legal (PII in GA4) | No PII in event params policy |
| RC credentials leak | Separate Google Workspace user `setup@…`; never personal ads accounts |
| Over-automation | Human publish gate before container goes Live |
| Scope creep | Fixed package events only; change orders for more |

**Hard rule:** Never connect client work to **RC Ads 6366 / GTM-WNSZCVTB** production.

---

## 9. Sales motion (how we get customers)

1. **Outbound limo fleets** already bleeding on Moovs/broken GA4  
2. **AF Free users** who check “measurement” and ask for help  
3. **Web design agencies** white-label Track Lite  
4. **Ads freelancers** who hate fixing containers  

**Discovery questions:**
1. Do you run Google Ads / Meta today?  
2. Can you show a purchase in GA4 DebugView right now?  
3. Who has GTM publish access?  
4. Booking platform? (LimoFlow / other / none)  

If they can’t show a clean purchase → **Track Commerce / Limo** is the close.

---

## 10. Build order (engineering)

### Phase 0 (this week) — sell before full automation
- Intake form + Access checklist PDF  
- Manual delivery using templates  
- Handoff report template  

### Phase 1 — scripts customers benefit from
- `probe-site.mjs` (public)  
- Snippet installers (WP / Next / static)  
- Playwright QA suite  

### Phase 2 — API automation
- GA4 Admin API: create property/stream (where permitted)  
- GTM API: create container, import baseline tags  
- OAuth app for “customer clicks Allow”  

### Phase 3 — AF dashboard
- “Request Track Setup” button → creates sales lead  
- Status: access received → in progress → QA → done  

---

## 11. Customer “why” (one paragraph for sales)

You need this if ads or SEO spend is real but **you don’t trust the numbers**. Broken GTM/GA4 means you optimize noise. We take temporary access, install a **clean baseline**, wire your real money event once, prove it in DebugView, then hand you the keys. You keep the container; we don’t hold your data hostage.

---

## 12. Decision for owner

| Option | Do this if |
|--------|------------|
| **A. Service-only first** | Want cash this month (recommended) |
| **B. Script pack open-source lite** | Want AF brand authority |
| **C. Full OAuth product** | After 5 paid Track jobs fund it |

**Recommendation:** Sell **Track Lite/Commerce/Limo as services** now using a disciplined checklist; invest in scripts that cut delivery time from 2 days → 2 hours. Don’t wait for perfect automation to take money.

---

## 13. Relation to LimoFlow sale

- **Tracking Setup** pairs perfectly with **LimoFlow implementation** (embed + purchase event).  
- Still **not** “we sell LimoFlow software” unless partnered — we sell **setup of their stack** (LF + GTM + GA4 + site).  

Bundle name option: **“Operator Launch Stack”**  
1. Booking (LimoFlow or existing)  
2. Track Limo  
3. AuthorityForge site system (optional)  

---

*Next concrete build when approved: `scripts/tracking-setup/probe-site.mjs` + Access checklist page under `/services/tracking/` on AuthorityForge.*
