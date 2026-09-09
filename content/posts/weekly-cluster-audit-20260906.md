---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-09-09"
slug: "weekly-cluster-audit-20260906"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures your content hubs remain focused and profitable by identifying underperforming pages, optimizing existing assets, and strategically adding new commercial content. This repeatable process maintains content quality and improves search engine visibility for your core topics.

## Export index coverage

Begin your weekly audit by pulling all relevant URLs from Google Search Console (GSC). This step identifies every page associated with your topical cluster, whether indexed or not. Focus on the subdirectory `/systems/topical-clusters/` to isolate your specific hub and spokes.

**Actionable Steps:**

1.  **Open Google Search Console:** Navigate to the "Pages" report under the "Index" section.
2.  **Filter by Cluster Path:** Use the URL filter option. Select "URL contains" and enter `/systems/topical-clusters/`. This narrows the data to your target cluster.
3.  **Export Indexed Pages:** Click the "Export" button (top right) and choose your preferred format (e.g., Google Sheets, CSV). This gives you a list of all pages Google *knows about* within your cluster.
4.  **Export "Not Indexed" Pages:** Change the filter in the "Pages" report to show "Not indexed" pages. Export this list as well. Pay close attention to the "Reason" column for these URLs. Common reasons include "Discovered – currently not indexed" or "Crawl anomaly."
5.  **Crawl with Screaming Frog (Optional but Recommended):** For a more granular view of internal linking and potential crawl issues, perform a site crawl limited to your cluster's subdirectory. In Screaming Frog SEO Spider, set the "Mode" to "List" and paste your GSC-exported URLs, or set the "Start URL" to `/systems/topical-clusters/` and configure crawl limits. Export the "Internal" tab data.

This initial data pull provides the raw material for your audit, highlighting both healthy and problematic pages within your targeted content system.

## Map hub ownership

After exporting your cluster's URLs, organize them to understand their relationship within the hub-and-spoke structure. This mapping clarifies which pages serve as spokes for your primary hub, identifies orphans, and prepares you for strategic action. Use a spreadsheet for this process.

**Spreadsheet Columns:**

*   **URL:** The full URL of the page.
*   **Primary Keyword:** The main keyword the page targets.
*   **Target Cluster:** The name of the topical cluster (e.g., "Topical Clusters").
*   **Hub URL:** The canonical URL of the main hub page (e.g., `/systems/topical-clusters/`).
*   **Content Type:** (e.g., "Hub," "Informational Spoke," "Commercial Spoke").
*   **GSC Status:** Indexed, Not Indexed (with reason if available).
*   **Internal Links In:** Number of internal links pointing to this page (from Screaming Frog).
*   **Internal Links Out:** Number of internal links from this page (from Screaming Frog).
*   **Action Needed:** (e.g., Kill, Merge, Update, Add CTA, Check Indexing).

**Mapping Steps:**

1.  **Consolidate Data:** Combine your GSC exports into a single spreadsheet. Add columns for "Internal Links In" and "Internal Links Out" if you used Screaming Frog.
2.  **Assign Hub URL:** For every URL in your cluster, confirm its associated hub. If a page exists within `/systems/topical-clusters/` but doesn't clearly link to the main hub or other spokes, mark it as a potential "Orphan."
3.  **Verify Content Type:** Quickly review each URL's content to categorize it. This helps later when deciding on commercial additions or content improvements.
4.  **Identify Discrepancies:** Cross-reference GSC's "Not Indexed" reasons with your internal linking data. A page Google isn't indexing might be an orphan with no internal links, or it might be blocked by `noindex`.

This structured mapping provides a clear overview of your cluster's health and pinpoints specific pages requiring attention.

## Kill or merge thin URLs

A crucial part of maintaining a high-performing content cluster is removing or consolidating low-value pages. Thin, outdated, or duplicate content can dilute your cluster's authority and waste crawl budget. This step focuses on improving overall quality by culling underperformers.

**Defining "Thin" Content:**

*   **Low Word Count:** Typically under 300 words, offering minimal depth.
*   **No Organic Traffic:** Pages consistently receiving zero organic clicks over 90 days (check GSC Performance report).
*   **Low Internal Links:** Few or no internal links pointing to the page, indicating it's not well-integrated.
*   **Duplicate or Near-Duplicate:** Content that largely repeats information found on other, stronger pages within your cluster or site.

**Decision Criteria and Implementation:**

| Action     | Criteria                                                              | Implementation Steps
