#!/usr/bin/env node
/**
 * Money gap audit — what is missing to earn, and who can fix it.
 * Agents run this every cycle; human-only items → approval-queue.
 * Never sends email or moves money.
 *
 * Usage: node scripts/money-gap-audit.mjs
 * Output: agents/memory/money-gaps-latest.json + open-tasks merge + approval drafts
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const now = new Date().toISOString();
const today = now.slice(0, 10);

function read(rel, fb = "") {
  try {
    return fs.readFileSync(path.join(ROOT, rel), "utf8");
  } catch {
    return fb;
  }
}
function readJson(rel, fb) {
  try {
    return JSON.parse(read(rel, "null"));
  } catch {
    return fb;
  }
}
function writeJson(rel, obj) {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, JSON.stringify(obj, null, 2) + "\n");
}
function walkHtml(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith(".") || ent.name === "node_modules" || ent.name === "dist")
      continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(p, acc);
    else if (ent.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

const cfg = read("js/config.js");
const queue = readJson("content/queue.json", { posts: [] });
const posts = queue.posts || [];
const queued = posts.filter((p) => p.status === "queued");
const published = posts.filter((p) => p.status === "published");

// Affiliates from config
const affBlock = cfg.match(/AFFILIATES:\s*\{([\s\S]*?)\n  \},/);
const affNames = [];
const affEnabled = [];
const affDisabled = [];
if (affBlock) {
  const re = /(\w+):\s*\{[\s\S]*?name:\s*"([^"]+)"[\s\S]*?enabled:\s*(true|false)/g;
  let m;
  while ((m = re.exec(affBlock[1]))) {
    const key = m[1];
    const name = m[2];
    const en = m[3] === "true";
    affNames.push({ key, name, enabled: en });
    (en ? affEnabled : affDisabled).push({ key, name });
  }
}

const adsenseStatus =
  (cfg.match(/adsense:\s*\{[\s\S]*?status:\s*"([^"]+)"/) || [])[1] || "unknown";
const adsEnabled = /ADS_ENABLED:\s*true/.test(cfg);
const adsenseClient = (cfg.match(/ADSENSE_CLIENT:\s*"([^"]*)"/) || [])[1] || "";
const adsTxt = read("ads.txt");
const adsTxtOk = /google\.com,\s*pub-\d+,\s*DIRECT/i.test(adsTxt);

// Stripe / paid products (AF only)
const hasStripeEnvDoc = /AF_STRIPE_SECRET_KEY/.test(cfg) || fs.existsSync(path.join(ROOT, "agents/treasury/policy.json"));
const stripeWiredInApi = walkHtml(path.join(ROOT, "api")).some((f) =>
  /stripe|checkout|subscription/i.test(fs.readFileSync(f, "utf8"))
);
// better scan api files
let stripeCode = false;
function walkJs(dir) {
  if (!fs.existsSync(dir)) return;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkJs(p);
    else if (/\.(js|mjs)$/.test(ent.name)) {
      const t = fs.readFileSync(p, "utf8");
      if (/stripe|STRIPE/i.test(t) && /checkout|subscription|payment/i.test(t))
        stripeCode = true;
    }
  }
}
walkJs(path.join(ROOT, "api"));

// Commercial surface counts
const htmlFiles = walkHtml(ROOT);
let dataAffCount = 0;
let signupCtaCount = 0;
let comparePages = 0;
for (const f of htmlFiles) {
  const t = fs.readFileSync(f, "utf8");
  const rel = path.relative(ROOT, f);
  dataAffCount += (t.match(/data-aff=/g) || []).length;
  signupCtaCount += (t.match(/app\/signup/g) || []).length;
  if (rel.startsWith("compare/") && rel.endsWith("index.html")) comparePages++;
}

const commercialTags = published.filter((p) =>
  (p.tags || []).some((t) =>
    /affiliat|money|adsense|convert|compare|tool|seo/i.test(String(t))
  )
);

// Product conversion surfaces
const hasDemo = fs.existsSync(path.join(ROOT, "demo/index.html"));
const hasPricing = fs.existsSync(path.join(ROOT, "pricing/index.html"));
const hasMoneyOs = fs.existsSync(path.join(ROOT, "systems/money/index.html"));

const gaps = [];
function gap(id, severity, stream, owner, title, detail, agentAction) {
  gaps.push({
    id,
    severity, // P0 block cash | P1 near-cash | P2 growth
    stream, // affiliates | adsense | subscriptions | content | conversion
    owner, // agent | human
    title,
    detail,
    agentAction: agentAction || null,
  });
}

// --- Detect gaps ---
if (affEnabled.length === 0) {
  gap(
    "aff-zero-enabled",
    "P0",
    "affiliates",
    "human",
    "0 affiliate programs enabled — no commission URLs",
    `${affDisabled.length} partners defined (Semrush, Ahrefs, …) but enabled:false and empty url. Cash path blocked until IDs pasted.`,
    "Keep commercial compare/stack pages shipping; approval-queue lists apply URLs."
  );
} else if (affEnabled.length < 3) {
  gap(
    "aff-below-target",
    "P1",
    "affiliates",
    "human",
    `Only ${affEnabled.length}/3 target affiliates enabled`,
    `Enabled: ${affEnabled.map((a) => a.name).join(", ") || "none"}. Disabled: ${affDisabled.map((a) => a.name).join(", ")}.`,
    "Prioritize content for remaining partners; do not invent tracking IDs."
  );
}

if (!adsTxtOk) {
  gap(
    "ads-txt-missing",
    "P0",
    "adsense",
    "agent",
    "ads.txt missing or invalid",
    "Fix ads.txt for AdSense crawl.",
    "Write correct google.com, pub-…, DIRECT line to ads.txt"
  );
}
if (adsenseStatus !== "ready") {
  gap(
    "adsense-not-ready",
    "P1",
    "adsense",
    "human",
    `AdSense status is "${adsenseStatus}" not ready`,
    `Client ${adsenseClient || "(empty)"}; ADS_ENABLED=${adsEnabled}. Google review / CMP may still be needed.`,
    "Keep commercial pages live; ads.txt + privacy/disclosure already required."
  );
}
if (!adsEnabled) {
  gap(
    "ads-disabled-flag",
    "P1",
    "adsense",
    "agent",
    "ADS_ENABLED is false",
    "Loader may not request inventory.",
    "Set ADS_ENABLED true only when publisher ID is real (already true if approved path)."
  );
}

if (!stripeCode) {
  gap(
    "stripe-not-wired",
    "P1",
    "subscriptions",
    "agent",
    "No AF Stripe checkout/subscription API yet",
    "Pro $49 / Agency $199 cannot collect payment. Separate from RC limo Stripe.",
    "Scaffold /api checkout against AF_STRIPE_* env when human creates AF Stripe account; until then price pages stay info-only."
  );
}

if (dataAffCount < 15) {
  gap(
    "few-aff-ctas",
    "P1",
    "affiliates",
    "agent",
    `Only ~${dataAffCount} data-aff CTAs sitewide`,
    "Need more commercial CTAs on tools/compare/blog for when IDs go live.",
    "Add data-aff links on commercial pages + blog CTAs pointing to tools/compare hubs."
  );
}

if (comparePages < 4) {
  gap(
    "thin-compare-cluster",
    "P1",
    "content",
    "agent",
    `Only ${comparePages} compare pages`,
    "Affiliate intent lives on vs/best-of pages.",
    "Queue + publish more criteria-first compares (tools operators buy)."
  );
}

if (queued.length < 5) {
  gap(
    "queue-thin",
    "P1",
    "content",
    "agent",
    `Content queue depth ${queued.length} < 5`,
    "Autonomous publish needs backlog of monetizable topics.",
    "Seed queue with commercial SEO/affiliate topics."
  );
}

if (commercialTags.length < Math.max(3, Math.floor(published.length * 0.3))) {
  gap(
    "blog-low-commercial",
    "P2",
    "content",
    "agent",
    "Published posts under-indexed for commercial/affiliate tags",
    `${commercialTags.length}/${published.length} posts tagged commercial-ish.`,
    "Review blogs; add CTAs to /demo, /app/signup, /resources/affiliates, compares."
  );
}

if (signupCtaCount < 10) {
  gap(
    "few-signup-ctas",
    "P1",
    "conversion",
    "agent",
    `Signup CTAs sparse (~${signupCtaCount} refs)`,
    "More paths to free dashboard from content.",
    "Add Start free CTAs on blog footers and commercial pages."
  );
}

if (!hasDemo) {
  gap("no-demo", "P0", "conversion", "agent", "Missing /demo/ product tour", "Add tour page.", "Ship demo page.");
}

// Always-on agent money development (even when cash is human-blocked)
const alwaysAgent = [
  {
    id: "money-publish-commercial",
    role: "content-chief",
    goal: "Publish next queued commercial/affiliate post; keep queue ≥5 money topics",
    severity: "P1",
    priority: 1,
  },
  {
    id: "money-aff-ctas",
    role: "monetization-chief",
    goal: `Grow data-aff CTAs (now ~${dataAffCount}) on compare/tools/blog so IDs earn the day they're pasted`,
    severity: "P1",
    priority: 1,
  },
  {
    id: "money-signup-paths",
    role: "content-chief",
    goal: "Add Start free + /demo CTAs from blog and commercial pages (self-serve conversion)",
    severity: "P1",
    priority: 1,
  },
  {
    id: "money-blog-review",
    role: "content-chief",
    goal: "Review latest 3 published posts for affiliate CTA + money path links; rewrite thin ones",
    severity: "P2",
    priority: 2,
  },
  {
    id: "money-compare-cluster",
    role: "seo-chief",
    goal: `Expand compare cluster (now ${comparePages} pages) for high-intent tool buyers`,
    severity: "P1",
    priority: 1,
  },
];

// Ranking for agent next actions
const agentGaps = gaps.filter((g) => g.owner === "agent");
const humanGaps = gaps.filter((g) => g.owner === "human");

const fromGaps = agentGaps
  .sort((a, b) => a.severity.localeCompare(b.severity))
  .map((g) => ({
    id: `money-${g.id}`,
    role:
      g.stream === "content" || g.stream === "conversion"
        ? "content-chief"
        : g.stream === "affiliates" ||
            g.stream === "adsense" ||
            g.stream === "subscriptions"
          ? "monetization-chief"
          : "research-chief",
    goal: g.agentAction || g.title,
    gapId: g.id,
    severity: g.severity,
    status: "open",
    priority: g.severity === "P0" ? 0 : g.severity === "P1" ? 1 : 2,
    source: "money-gap-audit",
    updatedAt: now,
  }));

const nextAgentWork = [
  ...fromGaps,
  ...alwaysAgent.map((t) => ({
    ...t,
    status: "open",
    source: "money-gap-audit",
    updatedAt: now,
  })),
].slice(0, 12);

// Merge into open-tasks (replace previous money-* auto tasks)
const tasksPath = "agents/memory/open-tasks.json";
const tasksDoc = readJson(tasksPath, { version: 1, tasks: [] });
const kept = (tasksDoc.tasks || []).filter(
  (t) => !String(t.id || "").startsWith("money-") && t.source !== "money-gap-audit"
);
tasksDoc.tasks = [...kept, ...nextAgentWork];
tasksDoc.updatedAt = now;
tasksDoc.moneyGapRunAt = now;
writeJson(tasksPath, tasksDoc);

// Approval queue for human money gates
const aqDir = path.join(ROOT, "agents/approval-queue");
fs.mkdirSync(aqDir, { recursive: true });
if (humanGaps.length) {
  const lines = [
    `# Money gates (human only) — ${today}`,
    ``,
    `Agents cannot invent affiliate IDs or finish AdSense review.`,
    `Owner does not sell/onboard — only paste IDs / click Google UI.`,
    ``,
    ...humanGaps.map(
      (g) =>
        `## ${g.severity} · ${g.title}\n- Stream: ${g.stream}\n- ${g.detail}\n`
    ),
    `## Apply links (from config)`,
    ...affDisabled.slice(0, 8).map((a) => {
      const block = cfg.match(new RegExp(`${a.key}:\\s*\\{[\\s\\S]*?apply:\\s*"([^"]+)"`));
      return `- **${a.name}**: ${block ? block[1] : "(see js/config.js)"}`;
    }),
    ``,
    `When approved: set AFFILIATES.<key>.enabled=true and url=tracking link in js/config.js.`,
  ];
  fs.writeFileSync(
    path.join(aqDir, `${today}-money-gates-human.md`),
    lines.join("\n") + "\n"
  );
}

const report = {
  at: now,
  summary: {
    gapCount: gaps.length,
    p0: gaps.filter((g) => g.severity === "P0").length,
    p1: gaps.filter((g) => g.severity === "P1").length,
    p2: gaps.filter((g) => g.severity === "P2").length,
    agentOwned: agentGaps.length,
    humanOwned: humanGaps.length,
    cashBlocked: gaps.some((g) => g.severity === "P0"),
  },
  metrics: {
    affiliatesEnabled: affEnabled.length,
    affiliatesDisabled: affDisabled.length,
    affiliatesEnabledNames: affEnabled.map((a) => a.name),
    adsenseStatus,
    adsEnabled,
    adsenseClient,
    adsTxtOk,
    stripeCheckoutWired: stripeCode,
    dataAffCtas: dataAffCount,
    signupCtaRefs: signupCtaCount,
    comparePages,
    contentQueued: queued.length,
    contentPublished: published.length,
    commercialTaggedPosts: commercialTags.length,
    hasDemo,
    hasPricing,
    hasMoneyOs,
  },
  gaps,
  nextAgentWork,
  humanGates: humanGaps.map((g) => g.id),
  streams: {
    affiliates: affEnabled.length > 0 ? "partial" : "blocked",
    adsense: adsenseStatus === "ready" && adsEnabled ? "ready" : "waiting",
    subscriptions: stripeCode ? "partial" : "missing",
    contentFlywheel: queued.length >= 5 ? "ok" : "thin",
  },
};

writeJson("agents/memory/money-gaps-latest.json", report);

// Human-readable brief for HQ
const md = [
  `# Money gaps — ${today}`,
  ``,
  `**Streams:** affiliates \`${report.streams.affiliates}\` · AdSense \`${report.streams.adsense}\` · subscriptions \`${report.streams.subscriptions}\` · content \`${report.streams.contentFlywheel}\``,
  ``,
  `## What's missing (priority)`,
  ...gaps
    .sort((a, b) => a.severity.localeCompare(b.severity))
    .map(
      (g) =>
        `- **${g.severity}** [${g.owner}] **${g.title}** — ${g.detail}${g.agentAction ? ` → _Agent:_ ${g.agentAction}` : ""}`
    ),
  ``,
  `## Next agent work`,
  ...nextAgentWork.map((t) => `- (${t.severity}) ${t.role}: ${t.goal}`),
  ``,
  `## Metrics snapshot`,
  "```json",
  JSON.stringify(report.metrics, null, 2),
  "```",
  ``,
];
fs.writeFileSync(
  path.join(ROOT, "agents/memory", `money-gaps-${today}.md`),
  md.join("\n")
);

console.log(
  JSON.stringify(
    {
      ok: true,
      summary: report.summary,
      streams: report.streams,
      topGaps: gaps.slice(0, 6).map((g) => `${g.severity}:${g.id}`),
      nextAgentWork: nextAgentWork.length,
    },
    null,
    2
  )
);
