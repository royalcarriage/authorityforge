/**
 * Vercel project control (optional).
 * Set AF_VERCEL_TOKEN (full access) + AF_VERCEL_PROJECT_ID or project name.
 */
const API = "https://api.vercel.com";

function token() {
  return process.env.AF_VERCEL_TOKEN || process.env.VERCEL_TOKEN || "";
}

export function vercelConfigured() {
  return Boolean(token());
}

async function vfetch(path, opts = {}) {
  if (!token()) throw new Error("AF_VERCEL_TOKEN not set");
  const team = process.env.AF_VERCEL_TEAM_ID || process.env.VERCEL_TEAM_ID;
  const url = new URL(API + path);
  if (team) url.searchParams.set("teamId", team);
  const res = await fetch(url, {
    ...opts,
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error?.message || `Vercel ${res.status}`);
  }
  return data;
}

export async function getProject() {
  const id =
    process.env.AF_VERCEL_PROJECT_ID ||
    process.env.VERCEL_PROJECT_ID ||
    "authorityforge";
  return vfetch(`/v9/projects/${id}`);
}

export async function listDeployments(limit = 5) {
  const id =
    process.env.AF_VERCEL_PROJECT_ID ||
    process.env.VERCEL_PROJECT_ID ||
    "authorityforge";
  return vfetch(`/v6/deployments?projectId=${encodeURIComponent(id)}&limit=${limit}`);
}

export async function listEnv() {
  const id =
    process.env.AF_VERCEL_PROJECT_ID ||
    process.env.VERCEL_PROJECT_ID ||
    "authorityforge";
  // names only for safety in responses
  const data = await vfetch(`/v9/projects/${id}/env`);
  const envs = (data.envs || data || []).map((e) => ({
    key: e.key,
    target: e.target,
    type: e.type,
  }));
  return { keys: envs.map((e) => e.key), envs };
}

export async function triggerRedeploy() {
  // Hook: GitHub push already redeploys. Optional deploy hook URL.
  const hook = process.env.AF_VERCEL_DEPLOY_HOOK_URL;
  if (!hook) {
    return {
      ok: false,
      reason: "Set AF_VERCEL_DEPLOY_HOOK_URL or push to main for redeploy",
    };
  }
  const res = await fetch(hook, { method: "POST" });
  return { ok: res.ok, status: res.status };
}
