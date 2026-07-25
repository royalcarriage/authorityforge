#!/usr/bin/env node
/**
 * Probe a public URL for existing tracking (GTM / gtag / GA4 / common pixels).
 * Read-only. No credentials. Safe first step of Track Setup jobs.
 *
 * Usage: node scripts/tracking-setup/probe-site.mjs https://example.com/
 */
const url = process.argv[2];
if (!url || !/^https?:\/\//i.test(url)) {
  console.error("Usage: node scripts/tracking-setup/probe-site.mjs https://example.com/");
  process.exit(1);
}

const html = await fetch(url, {
  headers: { "user-agent": "AuthorityForge-TrackProbe/1.0" },
  redirect: "follow",
}).then((r) => {
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.text();
});

function all(re) {
  return [...html.matchAll(re)].map((m) => m[1] || m[0]);
}

const report = {
  url,
  probedAt: new Date().toISOString(),
  gtmIds: [...new Set(all(/GTM-[A-Z0-9]+/gi))],
  ga4Ids: [...new Set(all(/G-[A-Z0-9]+/g))],
  googleAdsIds: [...new Set(all(/AW-\d+/g))],
  hasGtagJs: /googletagmanager\.com\/gtag\/js/i.test(html),
  hasGtmJs: /googletagmanager\.com\/gtm\.js/i.test(html),
  hasDataLayer: /dataLayer\s*=\s*dataLayer|dataLayer\.push/i.test(html),
  metaPixel: /fbevents\.js|fbq\s*\(/i.test(html),
  clarity: /clarity\.ms\/tag/i.test(html),
  recommendation: "",
};

const nGtm = report.gtmIds.length;
const nGa = report.ga4Ids.length;
if (nGtm === 0 && !report.hasGtagJs) {
  report.recommendation =
    "Clean slate — install single GTM container (Track Lite baseline).";
} else if (nGtm > 1) {
  report.recommendation =
    "Multiple GTM IDs detected — risk of double counting. Prefer consolidate to one container.";
} else if (nGtm === 1 && report.hasGtagJs && nGa > 0) {
  report.recommendation =
    "GTM + hard-coded gtag present — audit for duplicate page_view before adding more tags.";
} else if (nGtm === 1) {
  report.recommendation =
    "Existing GTM found — import baseline into a new workspace; do not blind-overwrite Live.";
} else {
  report.recommendation = "Review findings with a human before publish.";
}

console.log(JSON.stringify(report, null, 2));
