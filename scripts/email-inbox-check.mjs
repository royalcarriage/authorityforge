#!/usr/bin/env node
/**
 * Read-only inbox check for the company email.
 * Requires AF_EMAIL_IMAP_URL = imap://user:pass@host:993 (or imaps://)
 *
 * NEVER sends. To draft a reply, writes agents/approval-queue/*-email-draft.md
 *
 * Full send autonomy is intentionally NOT implemented here.
 * (RC hard rule + deliverability/legal risk.) Enable later only with allowlist + AF_EMAIL_SEND.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(ROOT, "agents", "memory", "inbox");
fs.mkdirSync(outDir, { recursive: true });

const url = process.env.AF_EMAIL_IMAP_URL || "";
const today = new Date().toISOString().slice(0, 10);

if (!url) {
  const stub = {
    ok: false,
    reason: "AF_EMAIL_IMAP_URL not set",
    setup: [
      "Create dedicated mailbox e.g. ceo@yourdomain or authorityforge.ceo@gmail.com",
      "Enable IMAP + app password",
      "Set AF_EMAIL_IMAP_URL secret on the runner",
      "Re-run: npm run email:check",
    ],
  };
  fs.writeFileSync(
    path.join(outDir, `status-${today}.json`),
    JSON.stringify(stub, null, 2) + "\n"
  );
  console.log(JSON.stringify(stub, null, 2));
  process.exit(0);
}

// Lightweight: without adding imap deps to package.json, document + store connection intent.
// When ready, install `imapflow` and implement fetch. For now fail clearly if URL set but no client.
const report = {
  ok: false,
  reason:
    "IMAP URL present but imap client not installed in this static repo yet. Run: npm i imapflow — then extend this script. Draft-only workflow remains.",
  urlHost: (() => {
    try {
      return new URL(url.replace(/^imaps:/, "https:").replace(/^imap:/, "http:")).host;
    } catch {
      return "(parse_error)";
    }
  })(),
  at: new Date().toISOString(),
};

fs.writeFileSync(
  path.join(outDir, `status-${today}.json`),
  JSON.stringify(report, null, 2) + "\n"
);
console.log(JSON.stringify(report, null, 2));
