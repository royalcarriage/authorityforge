#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { ROOT, SITE, listPostFiles, parsePost, write } from "./lib.mjs";

const staticUrls = [
  "/",
  "/about/",
  "/systems/",
  "/systems/topical-clusters/",
  "/systems/eeat/",
  "/systems/technical-excellence/",
  "/systems/measurement-loops/",
  "/guide/",
  "/guide/search-authority-playbook/",
  "/guide/content-cluster-architecture/",
  "/guide/affiliate-monetization/",
  "/blog/",
  "/resources/",
  "/resources/checklists/",
  "/resources/templates/",
  "/contact/",
];

const posts = listPostFiles()
  .map(parsePost)
  .filter((p) => (p.meta.status || "published") !== "draft");

const urls = [
  ...staticUrls,
  ...posts.map((p) => `/blog/${p.meta.slug}/`),
];

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => {
    const depth = u.split("/").filter(Boolean).length;
    const priority = u === "/" ? "1.0" : depth <= 1 ? "0.8" : "0.6";
    return `  <url>
    <loc>${SITE}${u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

write("sitemap.xml", xml);

// refresh llms.txt blog list
const llms = `# AuthorityForge
> Self-optimizing systems for search authority and rankings.
> Market: AI productivity tools + practical SEO systems.

## Primary
- ${SITE}/
- ${SITE}/guide/search-authority-playbook/
- ${SITE}/systems/
- ${SITE}/blog/

## Blog posts
${posts.map((p) => `- ${SITE}/blog/${p.meta.slug}/`).join("\n")}
`;
write("llms.txt", llms);
console.log(`sitemap: ${urls.length} URLs`);
