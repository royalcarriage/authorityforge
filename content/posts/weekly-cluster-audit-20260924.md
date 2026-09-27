---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-09-27"
slug: "weekly-cluster-audit-20260924"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures your topical hubs remain intentional, monetized, and authoritative by systematically reviewing indexed content, mapping hub-spoke connections, pruning underperforming URLs, strategically adding commercial spokes, and measuring overall cluster performance. This repeatable process helps maintain content quality and search visibility.

## Export Index Coverage

Begin by extracting current index data from Google Search Console (GSC) to understand what Google sees and how it performs. This initial step provides a raw dataset for identifying issues and opportunities within your content clusters. You need both indexed and unindexed pages to get a complete picture.

**Exact Steps:**

1.  **GSC Indexed Pages:** Navigate to GSC > Indexing > Pages. Filter by "All submitted pages" and download the "Indexed pages" report. This shows pages Google considers part of its index.
2.  **GSC Not Indexed Pages:** From the same GSC > Indexing > Pages section, download the "Not indexed" report. Pay close attention to reasons like "Discovered - currently not indexed" or "Crawled - currently not indexed." These pages represent potential issues or overlooked content.
3.  **Crawl Data:** Use a tool like Screaming Frog SEO Spider (free for up to 500 URLs) or your preferred site crawler (e.g., Site Audit in Ahrefs/Semrush). Run a crawl of your entire site to capture status codes (200, 301, 404, 410), internal link counts, and approximate word counts for each URL.

**Consolidate Data:**
Combine these datasets into a single spreadsheet. Use VLOOKUP or similar functions to merge GSC data (impressions, clicks, average position) with your crawl data (status codes, word count, internal links) based on the URL. This combined view is your working document for the audit.

**Checklist:**

*   GSC "Indexed pages" report downloaded.
*   GSC "Not indexed pages" report downloaded.
*   Full site crawl completed.
*   Data merged into a single spreadsheet for analysis.

## Map Hub Ownership

Clearly define the relationships between your hub pages and their supporting spokes. This step ensures logical content grouping and prevents orphaned pages or conflicting topical signals. A visual representation or a structured spreadsheet helps maintain a clear hierarchy.

**Exact Steps:**

1.  **Identify Core Hubs:** List all your primary hub pages. These are typically broad, foundational articles located at a consistent path, such as `/systems/topical-clusters/ai-writing-tools/`.
2.  **Assign Spokes:** For each hub, identify all directly related spoke pages. These are usually more specific articles that link back to the hub and to each other where relevant. For example, a hub on `/systems/topical-clusters/ai-writing-tools/` might have spokes like `/ai-writing-tools-for-bloggers/` or `/best-ai-content-generators-review/`.
3.  **Review Internal Linking:** In your combined spreadsheet, filter for pages that link to your hubs. Ensure spokes link *to* their designated hub and that the hub links *out* to its spokes. Look for:
    *   **Orphan pages:** Pages with few or no internal links.
    *   **Conflicting links:** Pages linking to multiple unrelated hubs, which dilutes topical authority.
    *   **Missing links:** Spokes that do not link back to their parent hub.

**Example Spreadsheet Mapping:**

| URL                                             | Content Type | Parent Hub URL                                  |
| :---------------------------------------------- | :----------- | :---------------------------------------------- |
| `/systems/topical-clusters/ai
