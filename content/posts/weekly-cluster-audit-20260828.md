---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-08-31"
slug: "weekly-cluster-audit-20260828"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

# Weekly Cluster Audit Checklist for Content Sites

A weekly cluster audit ensures content hubs remain intentional and monetizable by systematically reviewing index coverage, mapping hub ownership, removing thin content, adding commercial spokes, and measuring performance. This repeatable process maintains topical authority and drives targeted traffic, preventing content decay and missed revenue opportunities.

## Export Index Coverage

Begin by pulling fresh index data from Google Search Console (GSC). This step identifies any indexing issues that might prevent your content from ranking or appearing in search results. Regular checks help catch problems early.

Here's the process:

1.  Navigate to GSC > Index > Pages.
2.  Filter the results to show "Indexed" pages and export this list.
3.  Change the filter to "Not indexed" and export this second list.
4.  Combine both exports into a single spreadsheet.
5.  Focus on the "Not indexed" reasons, specifically "Discovered - currently not indexed" and "Crawled - currently not indexed." These often point to new or updated content Google hasn't fully processed yet.
6.  Look for any sudden, unexplained drops in "Indexed" pages compared to previous weeks. A drop exceeding 5% could signal a site-wide issue.

## Map Hub Ownership

Every piece of content on your site should belong to a specific topical cluster and have a clear purpose. This ensures internal linking power flows correctly and users can navigate related topics easily.

Create or update a master content spreadsheet with these columns:

*   **URL:** The full URL of the content piece.
*   **Hub Name:** The overarching topic of the cluster.
*   **Hub URL:** The primary hub page for the cluster (e.g., `/systems/topical-clusters/`).
*   **Spoke Type:** Informational (guides, how-tos) or Commercial (reviews, comparisons, product pages).
*   **Last Audit Date:** When this URL was last reviewed.
*   **Status:** Live, Merge, Kill, Redirected.

For each URL:

1.  Assign it to its appropriate hub. If a URL doesn't fit a hub, it's an "orphaned spoke" and needs a home or a plan for removal.
2.  Verify internal linking. Use a tool like Screaming Frog or Sitebulb to crawl your site and check that spokes link up to their hub and related spokes within the cluster. Aim for at least three internal links from spokes to the hub and vice-versa.
3.  Example: For a hub `/systems/topical-clusters/ai-writing-tools/`, a spoke might be `/blog/best-ai-content-detector-review/`. Ensure the spoke links to the hub, and the hub links to the spoke.

## Kill or Merge Thin URLs

Thin content dilutes your site's authority and can hinder overall ranking performance. Identify and address pages that offer little value, have low traffic, or duplicate existing content.

Define "thin" content using these criteria:

*   **Word Count:** Below 300 words (unless it's a specific, highly targeted short-form answer).
*   **Traffic:** Zero organic traffic in the last 90 days (GSC > Performance > Pages).
*   **Keyword Cannibalization:** Directly competing with another page for the same primary keyword (use tools like Ahrefs Site Explorer > Organic Keywords > filter by keyword).
*   **Low Engagement:** High bounce rate (>80%) and low average time on page (<30 seconds) in Google Analytics.

Once identified, decide whether to kill (delete and redirect) or merge (consolidate content) the URL:

| Action | Criteria                                                                                | Implementation
