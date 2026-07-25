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
  "/resources/grok-browser/",
  "/contact/",
  "/tools/",
  "/tools/ai-writing-assistants/",
  "/tools/keyword-research-tools/",
  "/tools/rank-trackers/",
  "/tools/seo-crawlers/",
  "/tools/content-briefing-software/",
  "/tools/agent-orchestration-platforms/",
  "/tools/analytics-for-content-sites/",
  "/tools/technical-seo-monitors/",
  "/compare/",
  "/compare/ai-writer-vs-human-editor/",
  "/compare/local-llm-vs-cloud-for-seo/",
  "/compare/hub-page-vs-blog-post/",
  "/compare/affiliates-vs-adsense/",
  "/stacks/",
  "/stacks/indie-seo-stack/",
  "/stacks/agency-content-ops-stack/",
  "/stacks/ai-native-content-stack/",
  "/solutions/",
  "/solutions/fix-content-cannibalization/",
  "/solutions/improve-organic-ctr/",
  "/solutions/bootstrap-organic-for-saas/",
  "/solutions/build-topical-authority-fast/",
  "/use-cases/",
  "/use-cases/solo-founder-seo/",
  "/use-cases/ai-startup-content-engine/",
  "/use-cases/affiliate-site-operators/",

  "/legal/",
  "/legal/affiliate-disclosure/",
  "/legal/monetization/",
  "/legal/privacy/",
  "/resources/adsense-apply/",
  "/resources/grok-browser/",
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
