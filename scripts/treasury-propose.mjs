#!/usr/bin/env node
/**
 * Propose reinvestment from ledger → approval-queue (and optional PO in budget.json).
 * Does NOT charge cards or send money.
 *
 * Level 2 autonomy (future): when maxAutoSpendCents > 0 and AF_TREASURY_AUTONOMY=2,
 * could create Stripe PaymentIntents to known vendors — not enabled by default.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TDIR = path.join(ROOT, "agents", "treasury");
const approvalDir = path.join(ROOT, "agents", "approval-queue");
const policy = JSON.parse(fs.readFileSync(path.join(TDIR, "policy.json"), "utf8"));
const ledger = JSON.parse(fs.readFileSync(path.join(TDIR, "ledger.json"), "utf8"));
const budget = JSON.parse(fs.readFileSync(path.join(TDIR, "budget.json"), "utf8"));

if (process.env.AF_TREASURY_HALT === "1") {
  console.log(JSON.stringify({ ok: false, reason: "halted" }));
  process.exit(0);
}

const today = new Date().toISOString().slice(0, 10);
const pool = ledger.balances.reinvest_pool_cents || 0;
const available = ledger.balances.stripe_available_cents || 0;
const proposals = [];

function dollars(c) {
  return `$${(c / 100).toFixed(2)}`;
}

for (const rule of policy.reinvestmentRules || []) {
  // simple parser: if available_cents >= N
  const m = String(rule.if).match(/available_cents\s*>=\s*(\d+)/);
  const need = m ? Number(m[1]) : Infinity;
  if (available >= need || pool >= need) {
    proposals.push({
      rule: rule.then,
      capCents: rule.capCents,
      reason: rule.if,
    });
  }
}

// Always propose growth plan when pool is zero (bootstrap)
if (!proposals.length) {
  proposals.push({
    rule: "bootstrap_earn_first",
    capCents: 0,
    reason: "No reinvest pool yet — focus on AdSense approval + affiliate IDs + content velocity",
  });
}

const lines = proposals
  .map(
    (p, i) =>
      `### ${i + 1}. ${p.rule}\n- Cap: ${dollars(p.capCents)}\n- Trigger: ${p.reason}\n`
  )
  .join("\n");

const body = `# Treasury reinvestment proposal — ${today}

## Balances (agent ledger)
| Bucket | Amount |
|--------|--------|
| Stripe available | ${dollars(available)} |
| Stripe pending | ${dollars(ledger.balances.stripe_pending_cents || 0)} |
| Reinvest pool | ${dollars(pool)} |
| Reserve | ${dollars(ledger.balances.reserve_cents || 0)} |
| AdSense est. | ${dollars(ledger.balances.adsense_estimated_cents || 0)} |
| Affiliates est. | ${dollars(ledger.balances.affiliates_estimated_cents || 0)} |

## Autonomy level
**${policy.autonomy.level}** — ${policy.autonomy.levels[String(policy.autonomy.level)]}

maxAutoSpendCents = **${policy.autonomy.maxAutoSpendCents}** (0 = human must approve every spend)

## Proposals
${lines}

## How money becomes more money (loop)
1. Site earns (AdSense / affiliates / Stripe products)
2. \`treasury-sync\` updates ledger
3. This script proposes reinvestment
4. You approve → pay from **AF Stripe/bank only**
5. CEO agent spends budget on content/LLM/tools → more traffic → more revenue

## Owner actions
- [ ] Confirm AF Stripe account is **not** RC Limo \`acct_1OV50…\`
- [ ] Set \`AF_STRIPE_SECRET_KEY\` in GitHub Actions secrets (read for sync)
- [ ] Deposit path: AdSense + affiliates → bank → optional transfer into AF Stripe
- [ ] Approve specific line items below by checking boxes when you execute

## Forbidden
${(policy.autonomy.forbidden || []).map((f) => `- ${f}`).join("\n")}
`;

fs.mkdirSync(approvalDir, { recursive: true });
const out = path.join(approvalDir, `${today}-treasury-reinvest.md`);
fs.writeFileSync(out, body);

for (const p of proposals) {
  if (p.capCents <= 0) continue;
  budget.openPurchaseOrders.push({
    id: `po-${today}-${p.rule}`,
    rule: p.rule,
    capCents: p.capCents,
    status: "proposed",
    createdAt: new Date().toISOString(),
  });
}
// cap open POs
if (budget.openPurchaseOrders.length > 50) {
  budget.openPurchaseOrders = budget.openPurchaseOrders.slice(-50);
}
budget.history.push({ at: new Date().toISOString(), proposals: proposals.length, pool });
fs.writeFileSync(path.join(TDIR, "budget.json"), JSON.stringify(budget, null, 2) + "\n");

console.log(JSON.stringify({ ok: true, file: path.relative(ROOT, out), proposals }, null, 2));
