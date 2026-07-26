#!/usr/bin/env node
/**
 * AuthorityForge CEO Agent — one operating cycle.
 *
 * Safe-by-default:
 *  - Never sends email/SMS
 *  - Never moves money
 *  - External actions → agents/approval-queue/
 *  - Optional: publish content, rebuild site, health-check
 *
 * Usage:
 *   node scripts/ceo-run.mjs
 *   AF_CEO_PUBLISH=1 node scripts/ceo-run.mjs   # also publish next queue item
 *   AF_CEO_PUSH=1 node scripts/ceo-run.mjs       # (not implemented auto-push; reports only)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const AGENTS = path.join(ROOT, "agents");
const today = new Date().toISOString().slice(0, 10);
const now = new Date().toISOString();

const statePath = path.join(AGENTS, "company-state.json");
const tasksPath = path.join(AGENTS, "memory", "open-tasks.json");
const queuePath = path.join(ROOT, "content", "queue.json");
const configPath = path.join(ROOT, "js", "config.js");
const logDir = path.join(AGENTS, "logs");
const approvalDir = path.join(AGENTS, "approval-queue");

fs.mkdirSync(logDir, { recursive: true });
fs.mkdirSync(approvalDir, { recursive: true });

const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
const tasks = JSON.parse(fs.readFileSync(tasksPath, "utf8"));
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const configRaw = fs.readFileSync(configPath, "utf8");

const report = {
  agent: "af-ceo-v1",
  startedAt: now,
  date: today,
  sense: {},
  plan: [],
  actions: [],
  approvals: [],
  hires: [],
  blocked: [],
  errors: [],
};

function logAction(role, action, detail = {}) {
  report.actions.push({ role, action, ...detail, at: new Date().toISOString() });
}

function writeApproval(title, body, kind = "general") {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  const file = path.join(approvalDir, `${today}-${slug || "item"}.md`);
  const md = `# APPROVAL REQUIRED — ${title}

**Kind:** ${kind}  
**Created:** ${now}  
**Agent:** af-ceo-v1  

## Hard rules
- Do **not** auto-send email/SMS
- Do **not** move money without owner OK

## Request
${body}

## Owner action
- [ ] Approve and execute manually
- [ ] Reject / revise
`;
  fs.writeFileSync(file, md);
  report.approvals.push({ title, file: path.relative(ROOT, file), kind });
  return file;
}

// ─── SENSE ───────────────────────────────────────────────
const posts = queue.posts || [];
const queued = posts.filter((p) => p.status === "queued");
const published = posts.filter((p) => p.status === "published");
const enabledAff =
  (configRaw.match(/enabled:\s*true/g) || []).length -
  (configRaw.match(/ADS_ENABLED:\s*true/g) || []).length;

const primary = state.company.primaryUrl.replace(/\/$/, "");
const health = {};
for (const pathUrl of ["/", "/ads.txt", "/legal/privacy/", "/css/styles.css", "/sitemap.xml"]) {
  try {
    const code = execSync(`curl -sS -o /dev/null -w "%{http_code}" -L --max-time 12 "${primary}${pathUrl}"`, {
      encoding: "utf8",
    }).trim();
    health[pathUrl] = code;
  } catch {
    health[pathUrl] = "ERR";
  }
}

// Money gaps — what's missing to earn (updates open-tasks + approval-queue)
let moneyGaps = null;
try {
  execSync("node scripts/money-gap-audit.mjs", { cwd: ROOT, encoding: "utf8" });
  moneyGaps = JSON.parse(
    fs.readFileSync(path.join(AGENTS, "memory", "money-gaps-latest.json"), "utf8")
  );
  logAction("monetization-chief", "money_gap_audit", {
    summary: moneyGaps.summary,
    streams: moneyGaps.streams,
  });
} catch (e) {
  report.errors.push(`money_gap_audit: ${String(e.message || e).slice(0, 200)}`);
}

report.sense = {
  primaryUrl: primary,
  queuedPosts: queued.length,
  publishedPosts: published.length,
  totalQueueItems: posts.length,
  affiliateEnabledApprox: Math.max(0, enabledAff),
  openTasks: (tasks.tasks || []).filter((t) => t.status === "open").length,
  health,
  hardRules: state.hardRules,
  moneyStreams: moneyGaps?.streams || null,
  moneySummary: moneyGaps?.summary || null,
  cashBlocked: moneyGaps?.summary?.cashBlocked ?? null,
};

// ─── PLAN ────────────────────────────────────────────────
const plan = [];
if (queued.length < (state.kpis.queuedPostsMin || 5)) {
  plan.push({
    id: "refill-queue",
    role: "content-chief",
    why: `Queue depth ${queued.length} < min ${state.kpis.queuedPostsMin}`,
    priority: 1,
  });
}
if (process.env.AF_CEO_PUBLISH === "1" && queued.length > 0) {
  plan.push({
    id: "publish-next",
    role: "content-chief",
    why: "AF_CEO_PUBLISH=1 and queue has items",
    priority: 1,
  });
}
const badHealth = Object.entries(health).filter(([, c]) => c !== "200");
if (badHealth.length) {
  plan.push({
    id: "fix-health",
    role: "devops-chief",
    why: `Unhealthy: ${badHealth.map(([p, c]) => `${p}=${c}`).join(", ")}`,
    priority: 0,
  });
}
if (enabledAff < (state.kpis.affiliateProgramsEnabledMin || 3)) {
  plan.push({
    id: "affiliates",
    role: "monetization-chief",
    why: `Enabled affiliates ~${enabledAff} < target`,
    priority: 1,
  });
}
plan.push({
  id: "money-research",
  role: "research-chief",
  why: "Always explore new revenue experiments",
  priority: 2,
});
plan.push({
  id: "legal-scan",
  role: "legal-gate",
  why: "Confirm no blocked actions attempted",
  priority: 0,
});

report.plan = plan.sort((a, b) => a.priority - b.priority);

// ─── EXECUTE ─────────────────────────────────────────────

// Content: refill queue if thin
if (plan.some((p) => p.id === "refill-queue")) {
  const ideas = [
    {
      id: `auto-${today}-cluster-audit`,
      slug: `weekly-cluster-audit-${today.replace(/-/g, "")}`,
      title: "Weekly Cluster Audit Checklist for Content Sites",
      description:
        "A repeatable weekly audit so hubs and spokes stay intentional and monetizable.",
      tags: ["seo", "clusters", "ops"],
      hub: "/systems/topical-clusters/",
      status: "queued",
      outline: [
        "Export index coverage",
        "Map hub ownership",
        "Kill or merge thin URLs",
        "Add one commercial spoke",
        "Measure impressions",
      ],
      source: "af-ceo",
    },
    {
      id: `auto-${today}-affiliate-stack`,
      slug: `affiliate-stack-for-seo-operators-${today.replace(/-/g, "")}`,
      title: "Affiliate Stack for SEO Operators (Disclosed)",
      description:
        "How to pick tool affiliates that match real workflows without wrecking trust.",
      tags: ["affiliates", "seo", "monetization"],
      hub: "/guide/affiliate-monetization/",
      status: "queued",
      outline: [
        "Criteria before links",
        "Disclosure placement",
        "Tool categories that convert",
        "What not to promote",
        "Weekly revenue review",
      ],
      source: "af-ceo",
    },
    {
      id: `auto-${today}-agent-ops`,
      slug: `run-a-content-company-with-agents-${today.replace(/-/g, "")}`,
      title: "Run a Content Company with Agents (Human-Gated)",
      description:
        "CEO agent loop: sense → plan → hire roles → execute allowlisted work → approval queue.",
      tags: ["agents", "ai-productivity", "ops"],
      hub: "/systems/agent-company/",
      status: "queued",
      outline: [
        "Org chart of agents",
        "What can auto-run",
        "What needs approval",
        "KPI dashboard",
        "Failure modes",
      ],
      source: "af-ceo",
    },
  ];
  const ids = new Set(posts.map((p) => p.id));
  let added = 0;
  for (const idea of ideas) {
    if (ids.has(idea.id)) continue;
    if (queued.length + added >= (state.kpis.queuedPostsMin || 5)) break;
    posts.push(idea);
    added++;
    logAction("content-chief", "queue_topic", { id: idea.id });
  }
  queue.posts = posts;
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + "\n");
  logAction("content-chief", "queue_refilled", { added });
}

// Content: publish next
if (plan.some((p) => p.id === "publish-next")) {
  try {
    const out = execSync("node scripts/publish-next.mjs", {
      cwd: ROOT,
      encoding: "utf8",
      env: { ...process.env, SITE_URL: primary, BASE_PATH: "" },
    });
    logAction("content-chief", "publish_next", { out: out.trim().slice(0, 500) });
    execSync("node scripts/build-blog.mjs && node scripts/build-sitemap.mjs", {
      cwd: ROOT,
      encoding: "utf8",
      env: {
        ...process.env,
        SITE_URL: primary,
        BASE_PATH: "",
      },
    });
    // Note: GH Pages still uses /authorityforge base in source HTML for static pages;
    // blog builder uses BASE from env — for AF primary Vercel, prepare-vercel rewrites on deploy.
    logAction("content-chief", "rebuild_site");
  } catch (e) {
    report.errors.push(String(e.message || e));
  }
}

// Monetization: draft affiliate push
if (plan.some((p) => p.id === "affiliates")) {
  writeApproval(
    "Apply or enable affiliate programs",
    `Enabled affiliate flags in config appear below target (${state.kpis.affiliateProgramsEnabledMin}).

### Owner steps
1. Open https://authorityforge-tau.vercel.app/resources/affiliates/
2. Apply (or finish) Semrush, Ahrefs, Surfer under ${state.company.ownerEmail}
3. Paste tracking URLs into \`js/config.js\` → set \`enabled: true\`
4. Push main (or ask CEO agent session to patch after you paste IDs)

### Do not
- Click own links for testing conversions in a way that violates program rules
`,
    "affiliates"
  );
  logAction("monetization-chief", "approval_affiliates");
}

// DevOps: health failures → approval
if (plan.some((p) => p.id === "fix-health")) {
  writeApproval(
    "Fix production health checks",
    `Primary URL health map:\n\n\`\`\`json\n${JSON.stringify(health, null, 2)}\n\`\`\`\n\nInvestigate Vercel deploy / path / ads.txt.`,
    "devops"
  );
  logAction("devops-chief", "health_alert", { health });
}

// Research: append money ideas if cycle multiple of 1 always light touch
const researchPath = path.join(AGENTS, "memory", "research-log.md");
const experiment = `
### Cycle ${state.cycleCount + 1} — ${today}
- KPI: queued=${queued.length}, affiliates~${enabledAff}, health_ok=${badHealth.length === 0}
- Experiment idea: ship one high-intent comparison page targeting a paid tool query; disclose affiliates; measure GSC 28d.
- Agent hire: keep research-chief scanning competitor monetization pages weekly.
`;
fs.appendFileSync(researchPath, experiment);
logAction("research-chief", "research_log_append");

// Hire: ensure core tasks exist
const open = tasks.tasks || [];
const needRoles = ["content-chief", "monetization-chief", "seo-chief", "research-chief"];
for (const role of needRoles) {
  const has = open.some((t) => t.role === role && t.status === "open");
  if (!has) {
    const id = `hire-${role}-${today}`;
    open.push({
      id,
      role,
      goal: `Standing duty for ${role}`,
      status: "open",
      priority: 2,
      hiredAt: now,
    });
    report.hires.push({ role, id });
    logAction("af-ceo", "hire_agent", { role, id });
  }
}
tasks.tasks = open;
fs.writeFileSync(tasksPath, JSON.stringify(tasks, null, 2) + "\n");

// Legal gate note
logAction("legal-gate", "scan_ok", {
  note: "No email/SMS/money actions executed this cycle",
});
report.blocked.push(
  "email_send",
  "sms_send",
  "money_move",
  "auto_adsense_click"
);

// Blocked capability report for owner
if (!fs.existsSync(path.join(approvalDir, `${today}-capabilities.md`))) {
  writeApproval(
    "CEO capabilities & what only you can do",
    `## Autonomous now
- Content queue refill + optional publish (\`AF_CEO_PUBLISH=1\`)
- Site rebuild scripts
- Health checks
- Research log + open tasks
- Approval-queue drafts

## Requires you (or a logged-in browser session)
- Google AdSense / CMP publish
- Affiliate program applications
- GSC property verification
- Vercel account settings / tokens
- Reading Gmail (no mailbox access installed — draft only)
- Legal entity formation, banking, taxes

## Hire more agents
Edit \`agents/memory/open-tasks.json\` or re-run CEO; roles live in \`agents/roles/\`.
`,
    "ops"
  );
}

// ─── STATE ───────────────────────────────────────────────
state.cycleCount = (state.cycleCount || 0) + 1;
state.lastCycle = {
  at: now,
  queuedPosts: queued.length,
  health,
  actions: report.actions.length,
  approvals: report.approvals.length,
};
fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n");

report.finishedAt = new Date().toISOString();
const logFile = path.join(logDir, `cycle-${today}.json`);
fs.writeFileSync(logFile, JSON.stringify(report, null, 2) + "\n");

// Human-readable summary
const summary = `# CEO cycle ${today}

- Actions: ${report.actions.length}
- Approvals written: ${report.approvals.length}
- Hires: ${report.hires.length}
- Queue depth: ${queued.length}
- Health: ${JSON.stringify(health)}

See \`${path.relative(ROOT, logFile)}\` and \`agents/approval-queue/\`.
`;
fs.writeFileSync(path.join(logDir, `cycle-${today}.md`), summary);

console.log(JSON.stringify({ ok: true, log: path.relative(ROOT, logFile), approvals: report.approvals.length, actions: report.actions.length }, null, 2));
