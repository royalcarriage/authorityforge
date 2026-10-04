---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-10-04"
slug: "weekly-cluster-audit-20261001"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures your content hubs maintain topical authority, identify content gaps, and improve monetization opportunities. By regularly reviewing index coverage, mapping content, pruning thin pages, adding commercial spokes, and tracking impressions, operators keep their clusters intentional and performing.

## Export index coverage

Start by extracting your site's index coverage data from Google Search Console (GSC). This provides a baseline understanding of what Google sees and indexes.

1.  Navigate to GSC > Index > Pages.
2.  Filter the report to show "All indexed pages" and export this list as a CSV.
3.  Next, filter for "Crawled - currently not indexed" pages and export this list as a separate CSV.
4.  For sites with many clusters, you can refine this by filtering by sitemap if specific cluster sitemaps exist.
5.  Consolidate these lists into a single Google Sheet or Excel file for easier analysis in the next steps. Label a column "Status" (Indexed or Not Indexed).

## Map hub ownership

With your exported URLs, organize them by their respective topical clusters. This step clarifies content relationships and identifies orphaned pages.

1.  Create a new column in your spreadsheet titled "Hub URL" and "Cluster Name."
2.  For each URL, identify its parent hub. For example, a URL like `/systems/topical-clusters/content-audit-guide/` belongs to the hub `/systems/topical-clusters/`.
3.  Manually assign the Hub URL and Cluster Name for each page.
4.  Identify pages that do not clearly fit into an existing cluster. These are potential orphans or candidates for a new cluster.

| Mapping Method | Accuracy | Speed | Setup Time |
| :------------- | :------- | :---- | :--------- |
| Manual Review  | High     | Slow  | Low        |
| Scripted Regex | Medium   | Fast  | Medium     |
| AI Categorizer | Medium   | Fast  | Medium     |

Manual review ensures precise assignment, especially for nuanced content. Scripted regex can automate for clear URL structures. AI categorizers can assist but require validation.

## Kill or merge thin URLs

Thin or underperforming content drains crawl budget and dilutes topical authority. Identify these pages and decide whether to consolidate, redirect, or remove them.

1.  Filter your consolidated spreadsheet for pages marked "Crawled - currently not indexed."
2.  In GSC > Performance > Search results, filter by "Page" for each URL on your "Not Indexed" list. Check its impressions over the last 90 days.
3.  Define "thin":
    *   Pages with less than 300 words of unique content.
    *   Pages with no unique value or perspective.
    *   Pages with fewer than 10 impressions in GSC over 90 days and no internal links from other high-authority pages.
4.  For each thin URL, make a decision:

| Action             | When to Use
