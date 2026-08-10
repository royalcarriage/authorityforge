---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-08-10"
slug: "weekly-cluster-audit-20260807"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures your content hubs and spokes remain intentional, aligned with user intent, and directly monetizable. This repeatable process involves exporting index coverage, mapping content ownership, pruning thin URLs, strategically adding commercial spokes, and consistently measuring impression growth to maintain cluster health and performance.

## Export index coverage

Start by gathering all indexed URLs associated with your content site. This step identifies what Google sees and helps pinpoint any indexing issues or orphaned pages within your clusters.

**Procedure:**

1.  **Google Search Console (GSC):**
    *   Navigate to "Index" -> "Pages."
    *   Filter by your cluster's directory path (e.g., `https://www.yourdomain.com/systems/topical-clusters/`). This gives you a list of indexed pages within that specific cluster.
    *   Check the "Not indexed" section as well, specifically looking for URLs that *should* be part of your cluster but are excluded (e.g., "Crawled - currently not indexed," "Discovered - currently not indexed"). These often indicate quality or crawlability issues.
2.  **Screaming Frog SEO Spider (or similar crawler):**
    *   Run a full crawl of your site.
    *   Export all internal HTML URLs.
    *   Filter this list by your cluster's subdirectory (e.g., `/systems/topical-clusters/`) to get a complete list of pages you *intend* to be in the cluster, regardless of GSC status.
    *   Check the HTTP Status Code column for 4xx or 5xx errors that need immediate attention.
3.  **Data Compilation:** Create a spreadsheet with columns for: `URL`, `GSC Index Status`, `HTTP Status Code`, `Last Updated Date`, and `Analytics Traffic (last 6 months)`. This combined data provides a single source of truth for your audit.

| Tool              | Primary Use Case                                    | Best For                                           |
| :---------------- | :-------------------------------------------------- | :------------------------------------------------- |
| Google Search Console | Indexed status, indexing issues, crawl stats        | Understanding Google's view of your cluster pages. |
| Screaming Frog    | Full site crawl, technical issues, URL discovery    | Comprehensive list of all cluster URLs, including potential orphans. |

## Map hub ownership

Once you have your comprehensive list of URLs, the next step is to assign each piece of content to its intended topical cluster and identify its role (hub or spoke). This helps ensure every page contributes to a clear, intentional content strategy.

**Procedure:**

1.  **Enrich your spreadsheet:** Add new columns to your compiled URL list: `Cluster Name`, `Hub URL`, `Spoke Type (Informational/Commercial)`, `Primary Intent (e.g., Problem, Solution, Product Review)`.
2.  **Manual Review:** Go through each URL.
    *   **Identify the Hub:** Determine which overarching hub topic the content supports. For instance, an article on "email marketing automation" might belong to a "Digital Marketing Systems" cluster with `/systems/digital-marketing/` as its hub.
    *   **Assign Spoke Type:** Is it an informational piece (e.g., "How-to Guide") or a commercial piece (e.g., "Best Email Marketing Software")?
    *   **Define Intent:** What question does this page answer, or what problem does it solve? This helps categorize content and identify gaps.
3.  **Identify Orphans:** Look for pages that don't clearly fit into any existing cluster or lack strong internal links to a hub. These "orphan pages" often indicate content drift or missed opportunities for consolidation. Mark them for review in the next step.
4.  **AI-assisted categorization (Optional):** For large sites, consider using a custom AI model (e.g., fine-tuned GPT-3.5 or Claude) to suggest cluster assignments based on page content. Always manually verify these suggestions, as AI can misinterpret nuance.

## Kill or merge thin URLs

Thin or underperforming content within a cluster dilutes its authority, wastes crawl budget, and can confuse search engines about your site's primary topics. This step focuses on consolidating or removing these low-value pages.

**Definition of "Thin":**
*   Low word count (<300 words, often less).
*   No organic traffic in the last 6-12 months (check Google Analytics or GSC).
*   High bounce rate combined with low average time on page.
*   Content that is outdated, inaccurate, or redundant.

**Checklist for Thin URLs:**

*   Does this URL have unique value to the user?
*   Does it attract any organic search traffic?
*   Does it have quality external backlinks pointing to it?
*   Is its content substantially similar to another page on your site?

**Decision Table: Kill vs. Merge**

| Action | When to Use                                      | Implementation                                    | Outcome                                                               |
| :----- | :----------------------------------------------- | :------------------------------------------------ | :-------------------------------------------------------------------- |
| **Kill** | Content is low quality, outdated, no traffic, no backlinks, serves no unique purpose
