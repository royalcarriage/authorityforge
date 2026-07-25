# Fully autonomous company — real money loop (AuthorityForge)

You want: **agent earns real money → controls that money → reinvests → earns more**, with its own **Stripe**, **bank path**, optional **Bitcoin**, and **email**.

This doc is the real architecture. It is honest about law, risk, and what code can do today.

---

## Truth first (read this)

| Wish | Reality |
|------|---------|
| Agent “owns” a company | A **human** must be legal owner / beneficial owner for Stripe, bank, AdSense, taxes (US). The agent is an **operator**, not a legal person. |
| Agent opens bank alone | Banks/KYC require a human. You open; agent gets **API keys** with least privilege. |
| Agent freely wires money | Extremely high fraud/abuse risk. We support **policy-gated** spend, default **approve every outflow**. |
| Agent reads Gmail | Needs a **dedicated mailbox** + IMAP secret. Not the limo ops inbox mixed with RC. |
| Full autopilot day 1 | Earn stack first (ads/affiliates/Stripe products). Money autonomy is **levelled**. |

**Hard rule preserved:** no silent email blasts, no silent bank wires.  
Autonomy increases only when you raise `agents/treasury/policy.json` → `autonomy.level` and set spend caps.

---

## Money flywheel

```text
[Traffic] → AdSense + Affiliates + Stripe products
     ↓
[AF Stripe balance / bank]  ← separate from Royal Carriage
     ↓
treasury-sync (read balances)
     ↓
treasury-propose (reinvest plan)
     ↓
CEO cycle spends budget on: content LLM, SEO tools, hosting, product
     ↓
Better site → more traffic → more money
```

---

## Accounts to create (you, once)

### 1. Stripe — AuthorityForge only
1. https://dashboard.stripe.com → **new account** (or Connect express for AF brand)  
2. **Do not** use RC limo `acct_1OV50CIasqIvj9Vm`  
3. Business name: AuthorityForge / your legal entity  
4. Enable payouts to **AF business bank**  
5. Create Restricted key: **Read** balance + charges; write only when you enable level-2 spend  
6. GitHub Action / server secret: `AF_STRIPE_SECRET_KEY`

### 2. Bank
- Business checking under the same tax ID as Stripe/AdSense  
- AdSense + Impact pay **here**  
- Optionally transfer a % into Stripe balance for card-based tool spend  

### 3. Bitcoin (optional)
- Create **receive-only** address in a wallet you control (hardware preferred)  
- Set `AF_BTC_RECEIVE_ADDRESS` for display/tips  
- **Hot auto-send is OFF** in policy (`hotWalletEnabled: false`)  

### 4. Email — company CEO inbox
- New address: e.g. `ceo@authorityforge.com` or `authorityforge.ceo@gmail.com`  
- App password → `AF_EMAIL_IMAP_URL` / `AF_EMAIL_SMTP_URL`  
- Agent: **read + draft**; send only with `AF_EMAIL_SEND=1` + allowlist  

### 5. AdSense + affiliates
- Already on site (`ca-pub-1959018852581373`)  
- Payouts → same AF bank  

---

## Autonomy levels (policy.json)

| Level | Behavior |
|-------|----------|
| **0** | Observe ledger only |
| **1** (default) | Propose reinvestment → `agents/approval-queue/` |
| **2** | Auto digital spend ≤ `maxAutoSpendCents` / day caps (Stripe to known vendors) — **you must enable** |
| **3** | Not implemented (full vendor pay / crypto hot) |

Kill switch: `AF_TREASURY_HALT=1`

---

## Commands

```bash
npm run treasury:sync      # pull Stripe balances into ledger
npm run treasury:propose  # write reinvestment approval doc
npm run ceo               # full operating cycle (content + health + treasury hooks)
npm run email:check       # inbox status (IMAP when configured)
```

---

## What “full autonomous” means in this repo

**Automated end-to-end:**
- Content publish pipeline  
- SEO rebuilds  
- Health checks  
- Revenue sync (with keys)  
- Budget proposals  
- Role agents (hire via tasks)  
- Vercel deploy on git push  

**Human-gated until you raise level:**
- Card/bank outflows  
- Outbound email  
- Tax/entity filings  
- AdSense identity  

That is how you get a system that **can** run a company 24/7 without one prompt draining the bank.

---

## Separation from Royal Carriage

| | Royal Carriage | AuthorityForge |
|--|----------------|----------------|
| Site | royalcarriagelimo.com (VPS) | authorityforge-tau.vercel.app |
| Stripe | Limo booking account | **New AF account** |
| Ads | Google Ads 6366 etc. | AdSense publisher |
| Agent money | Never auto | AF treasury policy only |

Never commingle agent reinvestment with limo fleet cash.

---

## Next 7 days (execute order)

1. Create AF Stripe + bank linkage  
2. Create CEO mailbox  
3. Put `AF_STRIPE_SECRET_KEY` in secrets; run `npm run treasury:sync`  
4. Finish AdSense CMP + affiliate IDs so **revenue > 0**  
5. Leave autonomy at **1** until first real payout hits  
6. Then set small `maxAutoSpendCents` (e.g. 2000 = $20) for LLM API only  

When revenue is real, we can implement level-2 Stripe PaymentIntent to a **vendor allowlist** (OpenAI, Vercel, etc.) — still not open-world wires.
