---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-08-13"
slug: "weekly-cluster-audit-20260810"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures your content hubs remain intentional and monetizable by systematically reviewing index coverage, mapping hub ownership, removing underperforming content, adding new commercial spokes, and measuring impression changes. This routine maintains topical authority and directly supports your site's SEO goals.

---

## Export Index Coverage

Begin your weekly audit by pulling current index data from Google Search Console (GSC). This step provides a baseline for tracking content performance and identifying indexing issues within your topical clusters. Exporting this data regularly allows you to spot trends and react quickly to changes.

1.  **Access GSC:** Log into Google Search Console for your property.
2.  **Navigate to Pages:** Go to the "Pages" report found under the "Indexing" menu.
3.  **Filter Report:**
    *   Select "All submitted pages" to focus on URLs you actively want indexed. This helps identify issues with sitemap submissions.
    *   Alternatively, choose "All known pages" for a broader view, including pages Google discovered but you didn't explicitly submit.
4.  **Export Data:** Click the export button and select "Google Sheets" or "Excel" for analysis.
5.  **Initial Review:** Note the total number of indexed URLs and compare it to last week's count. A significant drop might indicate a sitewide indexing problem, while a steady count suggests stability.
6.  **Filter for Clusters:** In your spreadsheet, filter the `URL` column to include only pages within your primary cluster path, for example, `/systems/topical-clusters/*`. This isolates the data relevant to your audit.

Here's a quick comparison of GSC filtering options for this task:

| Filter Option         | Use Case                                                              | Benefit                                                                    |
| :-------------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| **All submitted pages** | Prioritize pages you explicitly want indexed via sitemaps.            | Quickly identify if Google is indexing your intended content.              |
| **All known pages**     | Get a complete picture, including pages Google found on its own.      | Discover unintended indexed content or pages missed in sitemaps.           |

For this weekly audit, "All submitted pages" is often sufficient to monitor your active content strategy.

## Map Hub Ownership

With your indexed URLs exported, it's time to confirm each piece of content aligns with its designated hub and purpose. This clarity prevents content drift and ensures every spoke supports its central topic. A well-mapped cluster is easier to manage and optimize.

1.  **Prepare Spreadsheet:** Add the following columns to your exported data: `Hub Name`, `Hub Path`, `Spoke Type (Informational/Commercial)`, `Owner (Team/Person)`, `Last Audit Date`, and `Notes`.
2.  **Identify Cluster URLs:** Filter your GSC export to specifically show URLs under your target cluster path, such as `/systems/topical-clusters/`.
3.  **Assign Hubs:** For each URL within the filtered list, manually or semi-automatically assign it to its specific hub.
    *   *Example:* `/systems/topical-clusters/ai-writing-prompts/` belongs to the "AI Writing Tools" hub, located at `/systems/topical-clusters/ai-writing-tools/`.
4.  **Define Spoke Type:** Categorize each URL as either "Informational" (e.g., "What is keyword research?") or "Commercial" (e.g., "Best keyword research tools"). This distinction is key for monetization strategy.
5.  **Confirm Internal Linking:** Spot-check a few spokes to ensure they link directly back to their main hub page. Proper internal linking distributes authority and guides users.
6.  **Identify Orphans:** Look for any pages within the cluster path that don't clearly belong to an established hub. These might be old content,
