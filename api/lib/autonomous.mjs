/**
 * Autonomous improvement loop for Vercel sandbox.
 * Plan (Gemini free) → tools (GitHub) → optional PR/commit → report.
 */
import { freeGemini, healthCheck, readJson, runCeoCycle } from "./runtime.mjs";
import * as gh from "./github.mjs";
import * as vercel from "./vercel-api.mjs";

const ALLOWED_WRITE_PREFIXES = [
  "content/",
  "agents/",
  "docs/",
  "blog/",
  "company/",
  "systems/",
  "resources/",
  "guide/",
  "tools/",
  "api/",
  "css/",
  "js/",
  "llms.txt",
  "robots.txt",
  "sitemap.xml",
  "ads.txt",
  "index.html",
  "vercel.json",
  "package.json",
  "README.md",
];

function pathAllowed(p) {
  const norm = p.replace(/^\/+/, "");
  if (norm.includes("..")) return false;
  if (norm.startsWith(".env") || norm.includes("secret")) return false;
  return ALLOWED_WRITE_PREFIXES.some(
    (pre) => norm === pre.replace(/\/$/, "") || norm.startsWith(pre)
  );
}

export async function runAutonomousCycle(opts = {}) {
  const maxSteps = Math.min(Number(opts.maxSteps || process.env.AF_AGENT_MAX_STEPS || 4), 8);
  const autonomy = process.env.AF_AGENT_AUTONOMY || "pr"; // pr | full | plan_only
  const now = new Date().toISOString();
  const today = now.slice(0, 10);
  const stamp = now.replace(/[:.]/g, "-").slice(0, 19);

  const report = {
    agent: "af-autonomous-v1",
    platform: "vercel",
    startedAt: now,
    autonomy,
    zeroCost: process.env.AF_ZERO_COST !== "0",
    github: gh.githubConfigured(),
    vercelApi: vercel.vercelConfigured(),
    steps: [],
    writes: [],
    errors: [],
    pr: null,
    branch: null,
  };

  // 1) Sense
  let health;
  try {
    health = await healthCheck();
    report.steps.push({ tool: "health_probe", ok: true, health });
  } catch (e) {
    report.errors.push("health: " + e.message);
    health = { primary: "https://authorityforge-tau.vercel.app", health: {} };
  }

  const constitution = await safeRead("agents/control-plane/constitution.md");
  const projects = await safeReadJson("agents/control-plane/projects.json");
  const queue = await safeReadJson("content/queue.json");
  const company = await safeReadJson("agents/company-state.json");

  // 2) Plan with free Gemini
  const planPrompt = `You are the AuthorityForge autonomous company agent on Vercel.
CONSTITUTION (follow strictly):
${(constitution || "").slice(0, 2500)}

STATE:
- health: ${JSON.stringify(health.health)}
- cycleCount: ${company?.cycleCount ?? "?"}
- queued posts: ${(queue?.posts || []).filter((p) => p.status === "queued").length}
- github_ready: ${gh.githubConfigured()}
- vercel_api_ready: ${vercel.vercelConfigured()}
- projects: ${JSON.stringify(projects?.primary)}

Return ONLY valid JSON (no markdown fences):
{
  "goal": "one sentence",
  "actions": [
    {
      "type": "write_file" | "append_research" | "queue_topic" | "noop",
      "path": "relative/path optional",
      "title": "for queue_topic",
      "rationale": "why",
      "content": "full file content for write_file (markdown/html/json/js as needed)"
    }
  ]
}
Rules:
- Prefer improving content queue, agents docs, company pages, or API docs.
- Keep free-only LLM policy.
- Max 3 actions.
- write_file content must be complete file body.
- Do not touch secrets or Royal Carriage limo systems.`;

  let plan = { goal: "maintain systems", actions: [] };
  try {
    const llm = await freeGemini(planPrompt, { maxTokens: 2000 });
    report.steps.push({
      tool: "plan_with_gemini",
      ok: Boolean(llm.text),
      provider: llm.provider,
      error: llm.error || null,
    });
    if (llm.text) {
      const jsonText = extractJson(llm.text);
      plan = JSON.parse(jsonText);
    }
  } catch (e) {
    report.errors.push("plan: " + e.message);
    // fallback deterministic action
    plan = {
      goal: "Log autonomous heartbeat and keep queue healthy",
      actions: [
        {
          type: "append_research",
          rationale: "Gemini unavailable or parse failed — heartbeat",
          content: `\n### Autonomous heartbeat ${now}\n- health: ${JSON.stringify(health.health)}\n- github: ${gh.githubConfigured()}\n`,
        },
      ],
    };
  }

  report.plan = plan;

  if (autonomy === "plan_only" || !gh.githubConfigured()) {
    // Still run CEO sense cycle in-memory
    try {
      const ceo = await runCeoCycle({ withLlm: false });
      report.steps.push({ tool: "ceo_cycle", ok: true, cycleCount: ceo.state?.cycleCount });
    } catch (e) {
      report.errors.push("ceo: " + e.message);
    }
    report.finishedAt = new Date().toISOString();
    report.note = !gh.githubConfigured()
      ? "Set AF_GITHUB_TOKEN on Vercel for the agent to write/upgrade the repo autonomously."
      : "plan_only mode";
    return report;
  }

  // 3) Branch for safety unless full autonomy
  let branch = BRANCH_DEFAULT();
  if (autonomy !== "full") {
    branch = `agent/auto-${stamp}`;
    try {
      await gh.createBranch(gh.BRANCH, branch);
      report.branch = branch;
      report.steps.push({ tool: "create_branch", ok: true, branch });
    } catch (e) {
      report.errors.push("branch: " + e.message);
      branch = gh.BRANCH;
      report.branch = branch;
    }
  } else {
    report.branch = branch;
  }

  // 4) Execute actions
  const actions = Array.isArray(plan.actions) ? plan.actions.slice(0, maxSteps) : [];
  for (const action of actions) {
    try {
      if (action.type === "noop") {
        report.steps.push({ tool: "noop", ok: true });
        continue;
      }
      if (action.type === "append_research") {
        const path = "agents/memory/research-log.md";
        let cur = "";
        try {
          cur = (await gh.getFile(path, branch)).content;
        } catch {
          cur = "# Research log\n";
        }
        const next = cur + (action.content || `\n### ${now}\n- ${action.rationale || ""}\n`);
        await gh.putFile({
          path,
          content: next,
          message: `agent: research log ${today}`,
          branch,
        });
        report.writes.push(path);
        report.steps.push({ tool: "append_research", ok: true, path });
        continue;
      }
      if (action.type === "queue_topic") {
        const path = "content/queue.json";
        const file = await gh.getFile(path, branch);
        const q = JSON.parse(file.content);
        const slug = slugify(action.title || `auto-topic-${stamp}`);
        q.posts = q.posts || [];
        if (!q.posts.some((p) => p.slug === slug || p.id === slug)) {
          q.posts.push({
            id: slug,
            slug,
            title: action.title || slug,
            description: action.rationale || action.title || slug,
            tags: ["agents", "autonomous", "seo"],
            hub: "/systems/agent-company/",
            status: "queued",
            outline: ["Why it matters", "How to apply", "Measure", "Next step"],
            source: "vercel-autonomous",
          });
          await gh.putFile({
            path,
            content: JSON.stringify(q, null, 2) + "\n",
            message: `agent: queue topic ${slug}`,
            branch,
            sha: file.sha,
          });
          report.writes.push(path);
        }
        report.steps.push({ tool: "queue_topic", ok: true, slug });
        continue;
      }
      if (action.type === "write_file") {
        const path = String(action.path || "").replace(/^\/+/, "");
        if (!pathAllowed(path)) {
          report.errors.push(`write blocked: ${path}`);
          continue;
        }
        if (!action.content || String(action.content).length < 10) {
          report.errors.push(`write empty: ${path}`);
          continue;
        }
        await gh.putFile({
          path,
          content: action.content,
          message: `agent: ${action.rationale || "improve"} (${path})`.slice(0, 70),
          branch,
        });
        report.writes.push(path);
        report.steps.push({ tool: "write_file", ok: true, path });
        continue;
      }
      report.errors.push(`unknown action ${action.type}`);
    } catch (e) {
      report.errors.push(`action ${action.type}: ${e.message}`);
      report.steps.push({ tool: action.type, ok: false, error: e.message });
    }
  }

  // 5) Always write cycle report file
  try {
    const logPath = `agents/logs/autonomous-${today}.json`;
    let prev = "[]";
    try {
      prev = (await gh.getFile(logPath, branch)).content;
    } catch {
      prev = "[]";
    }
    let arr = [];
    try {
      arr = JSON.parse(prev);
    } catch {
      arr = [];
    }
    if (!Array.isArray(arr)) arr = [];
    arr.push({ at: now, goal: plan.goal, writes: report.writes, errors: report.errors });
    if (arr.length > 30) arr = arr.slice(-30);
    await gh.putFile({
      path: logPath,
      content: JSON.stringify(arr, null, 2) + "\n",
      message: `agent: autonomous log ${today}`,
      branch,
    });
    report.writes.push(logPath);
  } catch (e) {
    report.errors.push("log: " + e.message);
  }

  // 6) PR if not full
  if (autonomy !== "full" && report.writes.length && branch !== gh.BRANCH) {
    try {
      const pr = await gh.openPullRequest({
        title: `agent: ${String(plan.goal || "autonomous improvements").slice(0, 60)}`,
        body: `## Autonomous Vercel agent\n\n**Goal:** ${plan.goal}\n\n**Writes:**\n${report.writes.map((w) => `- \`${w}\``).join("\n")}\n\n**Errors:** ${report.errors.length ? report.errors.join("; ") : "none"}\n\nGenerated by \`/api/agent/autonomous\` on Vercel (zero-cost Gemini).`,
        head: branch,
        base: gh.BRANCH,
      });
      report.pr = { number: pr.number, url: pr.html_url };
      report.steps.push({ tool: "open_pr", ok: true, url: pr.html_url });
    } catch (e) {
      report.errors.push("pr: " + e.message);
    }
  }

  // Optional Vercel inspect
  if (vercel.vercelConfigured()) {
    try {
      const env = await vercel.listEnv();
      report.steps.push({
        tool: "vercel_inspect",
        ok: true,
        envKeys: env.keys?.filter((k) => !/SECRET|TOKEN|KEY|PASSWORD/i.test(k)),
      });
    } catch (e) {
      report.errors.push("vercel: " + e.message);
    }
  }

  report.finishedAt = new Date().toISOString();
  return report;
}

function BRANCH_DEFAULT() {
  return gh.BRANCH || "main";
}

async function safeRead(path) {
  try {
    if (gh.githubConfigured()) return (await gh.getFile(path)).content;
  } catch {
    /* fall through to local bundle */
  }
  try {
    const { readText } = await import("./runtime.mjs");
    return readText(path, "");
  } catch {
    return "";
  }
}

async function safeReadJson(path) {
  try {
    if (gh.githubConfigured()) {
      return JSON.parse((await gh.getFile(path)).content);
    }
  } catch {
    /* */
  }
  return readJson(path, path.endsWith("queue.json") ? { posts: [] } : {});
}

function extractJson(text) {
  const t = text.trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) return fence[1].trim();
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start >= 0 && end > start) return t.slice(start, end + 1);
  return t;
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);
}
