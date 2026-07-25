# Google certified CMP — European consent (EEA / UK / CH)

**Goal:** Collect consent for ads so EEA, UK, and Switzerland traffic does not lose personalization / revenue under Google’s EU User Consent Policy.

**Recommendation for AuthorityForge + future sites:**  
Use **Google’s own CMP** (Privacy & messaging) with **3 choices**:

| Button | Meaning |
|--------|---------|
| **Consent** | Accept ad partners / purposes (personalized ads when allowed) |
| **Do not consent** | Decline in one click (non-personalized / limited ads path) |
| **Manage options** | Granular purposes & vendors (TCF-style) |

**Why 3 choices (not 2):** clearer decline, better user trust, still Google-certified.  
**Why not a third-party CMP yet:** extra cost and install; Google’s CMP ships with AdSense and applies to every site you attach to the message—including future ones—without another vendor.

---

## Prerequisites (AuthorityForge — already done)

| Check | Status |
|-------|--------|
| AdSense code (`ca-pub-1959018852581373`) | On pages |
| `ads.txt` | Live on Vercel + GH Pages domain root |
| Privacy policy URL | `/legal/privacy/` |
| Referrer-Policy allows CMP | `strict-origin-when-cross-origin` in `vercel.json` |

Primary production URL for AdSense / CMP:

```text
https://authorityforge-tau.vercel.app
```

Privacy policy URL to paste into the message:

```text
https://authorityforge-tau.vercel.app/legal/privacy/
```

(Also valid: `https://royalcarriage.github.io/authorityforge/legal/privacy/`)

---

## Create the message in AdSense (you click — ~10 minutes)

Sign in as the AdSense owner (**royalcarriagelimollc@gmail.com**).

### Path

1. Open **[AdSense](https://www.google.com/adsense/)** → **Privacy & messaging**  
   Direct (if pub id matches):  
   https://adsense.google.com/adsense/new/u/0/pub-1959018852581373/privacymessaging
2. On the **European regulations** card → **Create** (or **Manage** → **Create message**).
3. **Select sites**
   - Check **authorityforge-tau.vercel.app** (and GH Pages site if listed).
   - Leave room for **future sites**: when you add a new site in AdSense later, open this message → **Select sites** → add it (or create a second message that targets “all sites” if offered).
4. **Languages**
   - Default: **English**
   - Additional: only languages your content actually uses (avoid managing en + en-GB unless needed).
5. **User choices → “Do not consent”**
   - Turn **ON** → this is the **3-choice** layout  
     (Consent · Do not consent · Manage options)
   - Turn **OFF** → **2-choice** layout  
     (Consent · Manage options only)
6. Optional: **Close (do not consent)** = X dismisses as decline — optional.
7. **Optimize my consent message** — leave **ON** unless you have a compliance reason to force one format (Google may A/B standard vs limited messages).
8. **Message name** (internal only), e.g.  
   `AF-EU-3choice-default-2026`
9. **Privacy policy URL** (required):  
   `https://authorityforge-tau.vercel.app/legal/privacy/`
10. Style/copy: keep short; match dark site if the editor allows brand colors.
11. **Publish** (not just Save draft).

### 2-choice vs 3-choice (your decision)

| Mode | AdSense control | Use when |
|------|-----------------|----------|
| **3 choices** (recommended) | Do not consent = **ON** | Default for all AF + future content sites |
| **2 choices** | Do not consent = **OFF** | Only if you want decline only via Manage options |

You asked for both patterns — **create one published 3-choice message for production**.  
A second **draft** 2-choice message is optional for testing; do **not** publish two competing EU messages on the same site.

---

## Future sites (same AdSense account)

When you launch a new monetized site:

1. **Sites** in AdSense → add the domain + ads.txt + AdSense code.  
2. **Privacy & messaging** → open `AF-EU-3choice-default-2026` → **Select sites** → add new domain → save/publish.  
3. Confirm privacy policy URL still resolves on the new domain (or add site-specific policy and update message if required).

No second CMP vendor required.

---

## Alternative: third-party certified CMP

Only if you outgrow Google’s UI (multi-brand legal, custom IAB GVL, non-Google ads):

- Use a **Google-certified CMP** from Google’s list (e.g. Cookiebot, OneTrust, Quantcast Choice — verify current list in AdSense help).
- Wire **Google Consent Mode v2** + TCF if using GA4/Ads with the same CMP.
- **Do not** run Google’s CMP and a third-party EU message on the same page (double banners / invalid consent).

For AuthorityForge now: **skip third-party**.

---

## How the message appears (no extra install)

After **Publish**, Google’s CMP loads **with the AdSense tag** for users in EEA / UK / CH (and regions you configure).  
You do **not** paste a separate Funding Choices snippet if the standard AdSense code is already on the page.

Verify:

1. AdSense → Privacy & messaging → message **Published**.  
2. Browser VPN / location ≈ Germany or UK → hard-refresh  
   https://authorityforge-tau.vercel.app/  
3. Banner shows **Consent / Do not consent / Manage options**.  
4. After Consent, ads may personalize; after Do not consent, limited/non-personalized path.

---

## Site checklist (code)

- [x] AdSense client script sitewide  
- [x] Privacy policy  
- [x] Referrer-Policy not `no-referrer`  
- [ ] Message **Published** in AdSense (human step)  
- [ ] Site(s) selected on the message  
- [ ] Spot-check from EU IP  

---

## royalcarriagelimo.com

**Out of scope for this AdSense CMP** unless you put AdSense on RCL.  
RCL is Hostinger/VPS, booking/tracking stack — do not enable AdSense CMP there without a separate ads decision.

---

## Operator one-liner

> Privacy & messaging → European regulations → Create → all AF sites → **Do not consent ON** → privacy URL → **Publish**.
