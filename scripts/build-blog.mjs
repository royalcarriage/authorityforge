#!/usr/bin/env node
/**
 * Build blog index + post HTML from content/posts/*.md
 */
import fs from "node:fs";
import path from "node:path";
import {
  ROOT,
  SITE,
  NAME,
  listPostFiles,
  parsePost,
  mdToHtml,
  pageShell,
  write,
} from "./lib.mjs";

const posts = listPostFiles()
  .map(parsePost)
  .filter((p) => (p.meta.status || "published") !== "draft")
  .sort((a, b) => String(b.meta.date).localeCompare(String(a.meta.date)));

if (!posts.length) {
  console.error("No published posts in content/posts/");
  process.exit(1);
}

// Individual posts
for (const p of posts) {
  const slug = p.meta.slug;
  const title = p.meta.title;
  const description = p.meta.description || title;
  const date = p.meta.date;
  const hub = p.meta.hub || "/blog/";
  const bodyHtml = mdToHtml(p.body);

  const html = pageShell({
    title: `${title} | ${NAME}`,
    description,
    path: `/blog/${slug}/`,
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description,
      datePublished: date,
      dateModified: date,
      author: { "@type": "Organization", name: NAME },
      publisher: { "@type": "Organization", name: NAME, url: SITE },
      mainEntityOfPage: `${SITE}/blog/${slug}/`,
    },
    body: `
  <header class="page-hero"><div class="wrap prose">
    <p class="kicker">Blog · ${date}</p>
    <h1>${esc(title)}</h1>
    <p>${esc(description)}</p>
  </div></header>
  <section class="section"><div class="wrap prose">
    ${bodyHtml}
    <p><a href="${hub}">Related hub</a> · <a href="/blog/">← All posts</a> · <a href="/guide/search-authority-playbook/">Playbook</a></p>
  </div></section>
`,
  });
  write(`blog/${slug}/index.html`, html);
  console.log("built post", slug);
}

// Index
const indexHtml = pageShell({
  title: `Blog | ${NAME} Content Cluster`,
  description:
    "AuthorityForge blog cluster: search authority, AI productivity SEO stacks, topical maps, and ranking feedback loops.",
  path: "/blog/",
  schema: {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${NAME} Blog`,
    url: `${SITE}/blog/`,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.meta.title,
      url: `${SITE}/blog/${p.meta.slug}/`,
      datePublished: p.meta.date,
    })),
  },
  body: `
  <header class="page-hero"><div class="wrap">
    <p class="kicker">Blog cluster</p>
    <h1 class="section-title">Ideas that feed the systems</h1>
    <p class="section-sub">Posts are generated from <code>content/posts/*.md</code>. Queue new topics in <code>content/queue.json</code> — GitHub Actions publishes automatically.</p>
  </div></header>
  <section class="section"><div class="wrap grid-3">
    ${posts
      .map(
        (p) => `
    <a class="card" href="/blog/${p.meta.slug}/">
      <h3>${esc(p.meta.title)}</h3>
      <p>${esc(p.meta.description || "")}</p>
      <div class="meta">${p.meta.date} →</div>
    </a>`
      )
      .join("")}
  </div></section>
`,
});
write("blog/index.html", indexHtml);
console.log(`built blog index (${posts.length} posts)`);

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
