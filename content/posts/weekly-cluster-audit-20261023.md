---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-10-26"
slug: "weekly-cluster-audit-20261023"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures your content hubs and spokes remain aligned with user intent and monetization goals by identifying underperforming URLs, consolidating thin content, and strategically adding new commercial pieces. This systematic review keeps your topical clusters intentional and drives measurable organic performance.

## Export index coverage

Begin your weekly audit by pulling an up-to-date list of all indexed pages from Google Search Console (GSC). This provides the foundational data set for analysis, ensuring you're working with Google's current understanding of your site.

**Steps:**

1.  **Access GSC:** Navigate to your property in Google Search Console.
2.  **Go to 'Pages' report:** Under the 'Indexing' section, click on 'Pages'.
3.  **Filter for 'Indexed':** Ensure the primary filter shows "Indexed" pages.
4.  **Export Data:** Click the 'Export' button, then select 'CSV'. This will download a spreadsheet containing all indexed URLs, their indexing status, and the last crawl date.

This CSV file becomes your working document. For larger sites, consider filtering the GSC report by a specific URL prefix if you only want to audit a subset of your clusters in a given week (e.g., `/systems/topical-clusters/`).

## Map hub ownership

Once you have your indexed URLs, the next step is to categorize each page by its topical cluster and identify its hub. This creates a clear picture of your site's content architecture and helps spot orphaned content or miscategorized pages.

**Steps:**

1.  **Open CSV:** Load your exported GSC data into Google Sheets or Excel.
2.  **Add Columns:** Create new columns: `Cluster Name`, `Hub URL`, `Content Type` (Hub, Spoke, Other), `Target Keyword`.
3.  **Categorize URLs:**
    *   **Manual Review:** For smaller sites or new clusters, manually assign each URL to its correct cluster.
    *   **Regex or `IF` statements:** For larger sites, use spreadsheet formulas to automate categorization based on URL patterns.
        *   Example: `IF(REGEXMATCH(A2, "/systems/topical-clusters/([a-z0-9-]+)/([a-z0-9-]+)/"), "Spoke", IF(REGEXMATCH(A2, "/systems/topical-clusters/([a-z0-9-]+)/$"), "Hub", "Other"))` (adjust for your specific URL structure).
    *   **AI Categorization:** Paste the URLs into a custom GPT or AI assistant trained on your site's URL structure and content types. Prompt it to identify the cluster name, hub URL, and content type for each.

**Checklist for Mapping:**

*   **Hub Identification:** Clearly mark the single hub page for each cluster.
*   **Spoke Assignment:** Ensure all relevant spoke pages are linked to their correct hub.
*   **Orphaned Content:** Identify any indexed pages that don't fit into an existing cluster; these may need to be merged, deleted, or assigned to a new cluster.
*   **Intent Alignment:** Confirm that each page's content type (informational, commercial) aligns with its role in the cluster.

This mapping provides the structure needed to make informed decisions about content consolidation and expansion.

## Kill or merge thin URLs

Thin or underperforming content within a cluster dilutes its authority and wastes crawl budget. This step focuses on identifying and acting on these pages to strengthen the overall cluster.

**Steps:**

1.  **Filter for Underperformance:**
    *   **Low Impressions/Clicks:** In GSC, filter your mapped URLs by impressions or clicks (e.g., fewer than 100 impressions over the last 90 days).
    *   **Low Word Count:** If you track word count, filter for pages below a minimum threshold (e.g., <300 words).
    *   **Duplicate Intent:** Manually review pages within the same cluster that target very similar keywords or user intent.
2.  **Decision-Making:** For each identified URL, decide on the best action:

| Action         | Criteria                                   | SEO Impact                                     | Use Case                                                    |
| :------------- | :----------------------------------------- | :--------------------------------------------- | :---------------------------------------------------------- |
| **Kill (410)** | No value, irrelevant, outdated, no traffic. | Removes page from index faster.                | Truly useless content that provides no user or SEO value.   |
| **Merge (301)**| Similar intent, low quality, duplicate.    | Consolidates authority, passes link equity.    | Combine weak pages into a stronger, more authoritative page.|
| **Improve**    | Relevant, but lacks depth
