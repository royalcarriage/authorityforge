#!/usr/bin/env node
/**
 * Prepare a Vercel-root deploy from the GitHub Pages multipage tree.
 * GH Pages uses BASE /authorityforge; Vercel serves at domain root.
 *
 * Usage: node scripts/prepare-vercel.mjs
 * Output: ./dist  (static files, root-absolute paths)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "dist");
const SITE =
  process.env.SITE_URL || "https://authorityforge-tau.vercel.app";
const GH_BASE = "/authorityforge";

const SKIP = new Set([
  ".git",
  "node_modules",
  "dist",
  ".vercel",
  "docs",
  "scripts",
  "content",
  ".github",
  "api",  // serverless — must stay at project root, not inside outputDirectory
  "agents", // read via api/_bundle on server; avoid huge static copy
]);

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

function rel(fromRoot, abs) {
  return path.relative(fromRoot, abs).split(path.sep).join("/");
}

function rewriteText(s) {
  const site = SITE.replace(/\/$/, "");
  let out = s;
  // 1) Full GH Pages origin → Vercel FIRST (before stripping path base)
  out = out.replaceAll(
    "https://royalcarriage.github.io/authorityforge",
    site
  );
  // 2) Root-absolute paths that still carry the GH Pages project base
  out = out.replaceAll(`href="${GH_BASE}/`, `href="/`);
  out = out.replaceAll(`src="${GH_BASE}/`, `src="/`);
  out = out.replaceAll(`href='${GH_BASE}/`, `href='/`);
  out = out.replaceAll(`src='${GH_BASE}/`, `src='/`);
  out = out.replaceAll(`href="${GH_BASE}"`, `href="/"`);
  out = out.replaceAll(`href='${GH_BASE}'`, `href="/"`);
  // content="/authorityforge/..." rare
  out = out.replaceAll(`"${GH_BASE}/`, `"/`);
  // boot comment cleanup
  out = out.replace(
    /<script data-af-base-boot>[\s\S]*?<\/script>\s*/g,
    ""
  );
  return out;
}

// clean dist
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const files = walk(ROOT);
let n = 0;
for (const abs of files) {
  const r = rel(ROOT, abs);
  // skip package/json lock noise at root that isn't needed for static
  if (r === "package.json" || r === "package-lock.json") continue;
  if (r.startsWith(".")) continue; // .write-access-ok etc.

  const dest = path.join(OUT, r);
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  const ext = path.extname(abs).toLowerCase();
  if ([".html", ".js", ".css", ".xml", ".txt", ".json", ".md"].includes(ext)) {
    let body = fs.readFileSync(abs, "utf8");
    if (r === "robots.txt") {
      body = `User-agent: *\nAllow: /\n\nSitemap: ${SITE.replace(/\/$/, "")}/sitemap.xml\n`;
    } else {
      body = rewriteText(body);
    }
    // config overrides AFTER rewrite so githubPagesUrl is not re-mapped to Vercel
    if (r === "js/config.js") {
      body = body
        .replace(/siteUrl:\s*"[^"]*"/, `siteUrl: "${SITE.replace(/\/$/, "")}"`)
        .replace(
          /githubPagesUrl:\s*"[^"]*"/,
          `githubPagesUrl: "https://royalcarriage.github.io/authorityforge"`
        )
        .replace(/basePath:\s*"[^"]*"/, `basePath: ""`);
    }
    fs.writeFileSync(dest, body);
  } else {
    fs.copyFileSync(abs, dest);
  }
  n++;
}

// ensure ads.txt at dist root (required for AdSense on vercel.app)
const adsSrc = path.join(ROOT, "ads.txt");
if (fs.existsSync(adsSrc)) {
  fs.writeFileSync(
    path.join(OUT, "ads.txt"),
    rewriteText(fs.readFileSync(adsSrc, "utf8"))
  );
}

console.log(
  `prepare-vercel: wrote ${n} files → dist/ (SITE=${SITE}, root paths)`
);
