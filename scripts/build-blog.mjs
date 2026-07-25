#!/usr/bin/env node
/**
 * Build blog index + post HTML from content/posts/*.md
 */
import {
  SITE,
  BASE,
  NAME,
  listPostFiles,
  parsePost,
  mdToHtml,
  pageShell,
  write,
  prefixBodyLinks,
} from "./lib.mjs";

const posts = listPostFiles()
  .map(parsePost)
  .filter((p) => (p.meta.status || "published") !== "draft")
  .sort((a, b) => String(b.meta.date).localeCompare(String(a.meta.date)));

if (!posts.length) {
  console.error("No published posts in content/posts/");
  process.exit(1);
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

for (const p of posts) {
  const slug = p.meta.slug;
  const title = p.meta.title;
  const description = p.meta.description || title;
  const date = p.meta.date;
  const hub = p.meta.hub || "/blog/";
  const bodyHtml = prefixBodyLinks(mdToHtml(p.body));

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
    body: prefixBodyLinks(`
  <header class="page-hero"><div class="wrap prose">
    <p class="kicker">Blog · ${date}</p>
    <h1>${esc(title)}</h1>
    <p>${esc(description)}</p>
  </div></header>
  <section class="section"><div class="wrap prose">
    ${bodyHtml}
    <div class="cta-band partner-cta">
      <p><strong>Tools we research</strong> (affiliate when live):
        <a href="#" data-aff="semrush">Semrush</a> ·
        <a href="#" data-aff="ahrefs">Ahrefs</a> ·
        <a href="#" data-aff="surfer">Surfer</a> ·
        <a href="${BASE}/resources/affiliates/">all programs</a>
      </p>
    </div>
    <p><a href="${hub.startsWith(BASE) ? hub : BASE + hub}">Related hub</a> · <a href="${BASE}/blog/">← All posts</a> · <a href="${BASE}/guide/search-authority-playbook/">Playbook</a></p>
  </div></section>
`),
  });
  write(`blog/${slug}/index.html`, html);
  console.log("built post", slug);
}

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
    <p class="section-sub">Posts ship from <code>content/posts/*.md</code>. Queue topics in <code>content/queue.json</code> — the autonomous pipeline publishes on schedule.</p>
  </div></header>
  <section class="section"><div class="wrap grid-3">
    ${posts
      .map(
        (p) => `
    <a class="card" href="${BASE}/blog/${p.meta.slug}/">
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
