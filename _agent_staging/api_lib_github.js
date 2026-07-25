/**
 * GitHub control plane for the Vercel sandbox agent.
 * Requires AF_GITHUB_TOKEN (fine-grained: Contents R/W + PR write on authorityforge).
 */
const REPO = process.env.AF_GITHUB_REPO || "royalcarriage/authorityforge";
const BRANCH = process.env.AF_GITHUB_BRANCH || "main";

function token() {
  return process.env.AF_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";
}

function headers() {
  return {
    Authorization: `Bearer ${token()}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "authorityforge-control-plane",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export function githubConfigured() {
  return Boolean(token());
}

export async function gh(path, opts = {}) {
  if (!token()) throw new Error("AF_GITHUB_TOKEN not set on Vercel");
  const res = await fetch(`https://api.github.com${path}`, {
    ...opts,
    headers: { ...headers(), ...(opts.headers || {}) },
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    const msg = data?.message || res.statusText;
    const err = new Error(`GitHub ${res.status}: ${msg}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export async function getFile(path, ref = BRANCH) {
  const [owner, repo] = REPO.split("/");
  const data = await gh(
    `/repos/${owner}/${repo}/contents/${encodeURI(path)}?ref=${encodeURIComponent(ref)}`
  );
  const content = Buffer.from(data.content || "", "base64").toString("utf8");
  return { path, sha: data.sha, content, size: data.size };
}

export async function putFile({ path, content, message, branch = BRANCH, sha }) {
  const [owner, repo] = REPO.split("/");
  let fileSha = sha;
  if (!fileSha) {
    try {
      const existing = await getFile(path, branch);
      fileSha = existing.sha;
    } catch {
      fileSha = undefined;
    }
  }
  const body = {
    message,
    content: Buffer.from(content, "utf8").toString("base64"),
    branch,
  };
  if (fileSha) body.sha = fileSha;
  return gh(`/repos/${owner}/${repo}/contents/${encodeURI(path)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function listDir(path = "", ref = BRANCH) {
  const [owner, repo] = REPO.split("/");
  const p = path ? `/${encodeURI(path)}` : "";
  const data = await gh(
    `/repos/${owner}/${repo}/contents${p}?ref=${encodeURIComponent(ref)}`
  );
  if (!Array.isArray(data)) return [data];
  return data.map((x) => ({
    name: x.name,
    path: x.path,
    type: x.type,
    size: x.size,
  }));
}

export async function createBranch(from = BRANCH, name) {
  const [owner, repo] = REPO.split("/");
  const ref = await gh(`/repos/${owner}/${repo}/git/ref/heads/${from}`);
  const sha = ref.object.sha;
  try {
    await gh(`/repos/${owner}/${repo}/git/refs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ref: `refs/heads/${name}`, sha }),
    });
  } catch (e) {
    if (e.status !== 422) throw e; // already exists
  }
  return { branch: name, sha };
}

export async function openPullRequest({ title, body, head, base = BRANCH }) {
  const [owner, repo] = REPO.split("/");
  return gh(`/repos/${owner}/${repo}/pulls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, head, base }),
  });
}

export { REPO, BRANCH };
