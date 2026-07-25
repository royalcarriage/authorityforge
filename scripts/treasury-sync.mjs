#!/usr/bin/env node
/**
 * Sync AuthorityForge treasury ledger from Stripe (read-only).
 * Never moves money. Optional AdSense estimate is manual JSON input.
 *
 * Env:
 *   AF_STRIPE_SECRET_KEY  — sk_live_… or sk_test_… for AF account ONLY
 *   AF_TREASURY_HALT=1   — skip all writes except halt log
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TDIR = path.join(ROOT, "agents", "treasury");
const ledgerPath = path.join(TDIR, "ledger.json");
const policyPath = path.join(TDIR, "policy.json");

const policy = JSON.parse(fs.readFileSync(policyPath, "utf8"));
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));

if (process.env.AF_TREASURY_HALT === "1") {
  console.log(JSON.stringify({ ok: false, reason: "AF_TREASURY_HALT=1" }));
  process.exit(0);
}

const now = new Date().toISOString();
const key = process.env.AF_STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY || "";

async function stripeGet(p) {
  const res = await fetch(`https://api.stripe.com/v1${p}`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || res.statusText);
  return data;
}

const report = { at: now, stripe: null, errors: [] };

if (key) {
  try {
    const bal = await stripeGet("/balance");
    const available = (bal.available || []).reduce((s, x) => s + (x.amount || 0), 0);
    const pending = (bal.pending || []).reduce((s, x) => s + (x.amount || 0), 0);
    ledger.balances.stripe_available_cents = available;
    ledger.balances.stripe_pending_cents = pending;

    const reservePct = policy.autonomy.reservePct || 30;
    const reinvestPct = policy.autonomy.maxMonthlyReinvestPct || 70;
    const total = available;
    ledger.balances.reserve_cents = Math.floor((total * reservePct) / 100);
    ledger.balances.reinvest_pool_cents = Math.floor((total * reinvestPct) / 100);

    ledger.entries.push({
      id: `sync-${now}`,
      type: "stripe_balance_sync",
      available_cents: available,
      pending_cents: pending,
      at: now,
    });
    // keep last 200 entries
    if (ledger.entries.length > 200) ledger.entries = ledger.entries.slice(-200);

    report.stripe = { available_cents: available, pending_cents: pending };
  } catch (e) {
    report.errors.push(String(e.message || e));
  }
} else {
  report.errors.push("No AF_STRIPE_SECRET_KEY — ledger not updated from Stripe");
}

// Manual estimates file (optional)
const estPath = path.join(TDIR, "manual-estimates.json");
if (fs.existsSync(estPath)) {
  try {
    const est = JSON.parse(fs.readFileSync(estPath, "utf8"));
    if (typeof est.adsense_estimated_cents === "number") {
      ledger.balances.adsense_estimated_cents = est.adsense_estimated_cents;
    }
    if (typeof est.affiliates_estimated_cents === "number") {
      ledger.balances.affiliates_estimated_cents = est.affiliates_estimated_cents;
    }
  } catch (e) {
    report.errors.push("manual-estimates: " + e.message);
  }
}

ledger.lastSyncAt = now;
fs.writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2) + "\n");
fs.writeFileSync(
  path.join(TDIR, `sync-report-${now.slice(0, 10)}.json`),
  JSON.stringify(report, null, 2) + "\n"
);

console.log(JSON.stringify({ ok: true, ...report, balances: ledger.balances }, null, 2));
