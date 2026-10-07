---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-10-07"
slug: "weekly-cluster-audit-20261004"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

To maintain intentional and monetizable topical clusters, perform a weekly audit by exporting index coverage from Google Search Console, mapping hub ownership, and identifying thin URLs for consolidation. Strategically add one commercial spoke to each cluster, then measure overall cluster impressions to track performance and guide your content strategy. This routine ensures your content assets work together effectively.

## Export Index Coverage

Begin your weekly audit by pulling fresh data from Google Search Console (GSC). This provides a ground-level view of how Google is indexing and perceiving your content. Focus on the "Pages" report under the "Indexing" section.

**Exact Steps:**

1.  Navigate to Google Search Console for your property.
2.  In the left sidebar, click "Pages" under "Indexing."
3.  Filter the report:
    *   Click "Compare" next to the date range and select "Last 28 days" vs. "Previous period" to spot recent changes.
    *   For specific clusters, use the "Filter" dropdown at the top. Select "URL prefix" and enter your cluster's base path (e.g., `/systems/topical-clusters/ai-content-creation/`). If your clusters reside in various paths, you may need to export the full site data and filter externally.
4.  Export both "Indexed" and "Not indexed" pages as CSV files.

**What to look for in the export:**

*   **Indexed Pages:** These are your active content assets. Pay attention to pages with very low impressions or zero clicks, even if indexed.
*   **Not Indexed Pages:** Identify common reasons like "Crawled – currently not indexed" or "Discovered – currently not indexed." These indicate pages Google knows about but hasn't deemed valuable enough to rank.
*   **URL Patterns:** Spot any unexpected URLs or old content that shouldn't be indexed.

This GSC export is your baseline. It tells you what Google *thinks* is part of your site, which may differ from your internal content plan.

## Map Hub Ownership

With your GSC data in hand, create or update a centralized spreadsheet that maps every URL within your topical clusters. This step ensures every piece of content has a clear home and purpose, preventing orphaned pages or content drift.

**Spreadsheet Structure:**

| Column             | Description                                                                  | Example Value                                        |
| :----------------- | :--------------------------------------------------------------------------- | :--------------------------------------------------- |
| **URL**            | The full URL of the content piece.                                           | `/systems/topical-clusters/ai-content-creation/`     |
| **Target Keyword** | Primary keyword the page aims to rank for.                                   | "AI content creation tools"                          |
| **Parent Hub URL** | The URL of the main hub page this content belongs to.                        | `/systems/topical-clusters/`                         |
| **Owner**          | Editor or writer responsible for this content.                               | Jane Doe                                             |
| **Last Reviewed**  | Date the content was last updated or audited.                                | 2023-10-26                                           |
| **Status**         | Live, Draft, Redirected, Merged, Kill Candidate                              | Live                                                 |
| **GSC Impressions**| Impressions from your GSC export for the last 28 days.                       | 1,500                                                |
| **Notes**          | Any specific actions needed (e.g., "Add
