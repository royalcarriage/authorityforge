---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-09-14"
slug: "weekly-cluster-audit-20260911"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures content hubs remain focused and monetizable by identifying thin content for removal or merger, adding commercial spokes to capture buyer intent, and tracking impression changes to gauge performance and inform optimization, maintaining topical authority and search visibility. This systematic review keeps your content architecture intentional.

## Export index coverage

Start by pulling data from Google Search Console (GSC) and your preferred crawling tool. This gives a baseline of what Google knows about your site and what's actually indexed.

**Steps:**

1.  **GSC "Not indexed" pages:** Navigate to Google Search Console > Index > Pages.
    *   Filter by "Not indexed."
    *   Examine "Crawled - currently not indexed" and "Discovered - currently not indexed" reports. Export these lists. These URLs are known to Google but aren't in the index.
2.  **GSC "Indexed" pages:** While in GSC > Index > Pages, review your "Indexed" pages for any unexpected URLs that do not belong to your defined clusters. Export this list.
3.  **Site crawl:** Run a full crawl of your site using a tool like Screaming Frog SEO Spider or Sitebulb. Export the list of all discoverable URLs, along with their HTTP status codes and internal link counts.

**Purpose:** The GSC data highlights potential indexing issues or content Google deems low quality. Your crawl data shows what's discoverable and provides metrics for content evaluation.

## Map hub ownership

Maintain a central record of all cluster URLs and their roles. This prevents content drift and ensures every page serves a purpose within your topical strategy.

**Procedure:**

1.  **Central Spreadsheet:** Use a Google Sheet or Excel file for your cluster map.
2.  **Required Columns:**
    *   `URL`: The exact URL of the page.
    *
