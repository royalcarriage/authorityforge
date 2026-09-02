---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-09-02"
slug: "weekly-cluster-audit-20260830"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures your content hubs and spokes remain aligned with user intent and monetization goals, preventing content decay and missed opportunities. By regularly reviewing index coverage, mapping ownership, culling thin content, adding commercial spokes, and tracking impressions, you maintain a lean, high-performing topical authority structure.

## Export Index Coverage

Begin by extracting your site's index coverage data from Google Search Console (GSC). This step confirms what Google has indexed and what it hasn't, providing the raw material for your audit. Focus on the URLs within your target cluster.

1.  **Navigate to GSC:** Open Google Search Console for your property.
2.  **Go to "Pages":** Under the "Indexing" menu, select "Pages."
3.  **Filter and Export:**
    *   Filter by "Indexed pages" and export the full list.
    *   Filter by "Not indexed" (specifically issues like "Crawled – currently not indexed," "Discovered – currently not indexed") and export that list as well.
    *   For large sites, use the "URL contains" filter to narrow down to your specific cluster path, e.g., `/systems/topical-clusters/`.
4.  **Consolidate Data:** Combine these exports into a single Google Sheet or CSV file. Add a column for "GSC Status" (Indexed, Not Indexed - Crawled, Not Indexed - Discovered, etc.) for each URL. This gives you a baseline view of your cluster's visibility to Google.

## Map Hub Ownership

With your indexed URLs in hand, assign each one to its correct topical cluster and identify its role. This mapping process clarifies the structure and helps identify orphans or miscategorized content.

1.  **Create a Master Spreadsheet:** Start a new sheet or tab in your spreadsheet.
2.  **Add Key Columns:** Include at least these headers:
    *   `URL`
    *   `Cluster Name` (e.g., "Topical Clusters System")
    *   `Hub URL` (the main pillar page, e.g., `/systems/topical-clusters/`)
    *   `Spoke Type` (Informational, Commercial, Navigational)
    *   `Target Keyword` (primary keyword for the spoke)
    *   `GSC Status` (pull from your export)
    *   `Internal Links In` (number of internal links pointing to this URL)
    *   `Internal Links Out` (number of internal links from this URL)
3.  **Assign Ownership:** Go through each URL from your GSC export.
    *   **Path-based:** For `/systems/topical-clusters/weekly-audit-guide/`, the hub is clearly `/systems/topical-clusters/`.
    *   **Internal Link Check:** For URLs that don't fit a clear path, use a site crawler (like Screaming Frog) to identify parent pages or manually check internal links.
4.  **Identify Spoke Type:**
    *   **Informational:** Answers questions, provides guides (e.g., "how to build a cluster").
    *   **Commercial:** Compares products, reviews services, or has explicit buyer intent (e.g., "best cluster audit tools").
    *   **Navigational:** Pages primarily for site structure (e.g., category pages, if part of the cluster).
5.  **Review for Orphans:** Look for URLs that don't clearly belong to a hub or have no internal links. These are candidates for merging or removal.

| Mapping Method | Speed | Accuracy | Best For |
| :------------- | :---- | :------- | :------- |
| **URL Path**   | Fast  | High (if consistent) | Initial pass, well-structured sites. |
| **Internal Link Analysis** | Slower (requires crawl
