---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-07-31"
slug: "weekly-cluster-audit-20260729"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures topical clusters remain focused, relevant, and drive commercial value by identifying underperforming content, optimizing existing assets, and strategically adding new monetizable spokes. This repeatable process maintains content intentionality and maximizes search visibility.

## Export index coverage

Begin your weekly cluster audit by exporting current index coverage data from Google Search Console (GSC). Navigate to "Index" > "Pages" and select "All known pages." Filter by "Indexed" and "Not indexed" status, then export both reports. For larger sites, use a tool like Screaming Frog SEO Spider configured to crawl your GSC sitemaps, which provides a more granular view of index status alongside other SEO metrics.

Look for pages within your defined cluster paths that are unexpectedly "Not indexed." Common reasons include "Excluded by ‘noindex’ tag," "Crawled - currently not indexed," or "Discovered - currently not indexed." Cross-reference these findings with your internal linking structure; a page with no internal links is less likely to be crawled and indexed quickly. Identify any pages that were previously indexed but have dropped out. This initial export gives you a baseline for identifying content that isn't performing as intended or isn't even visible to search engines.

## Map hub ownership

After gathering index data, map each URL to its intended topical cluster and identify its role (hub or spoke). Create a simple spreadsheet with columns for `URL`, `Primary Keyword`, `Target Cluster`, `Content Type (Hub/Spoke)`, `Last Updated`, and `GSC Status (Indexed/Not Indexed)`. Use your site's URL structure to help automate this. For example, all URLs under `/systems/topical-clusters/` belong to the "Topical Clusters" hub.

This mapping clarifies which pages contribute to specific topical authority. It helps identify orphaned pages that don't belong to any cluster, or pages that are part of a cluster but are not linking back to the hub.

Consider these classifications:

*   **Hub Page:** The central, broad authority page (e.g., `/systems/topical-clusters/`).
*   **Spoke Page:** A specific, detailed page supporting the hub (e.g., `/systems/topical-clusters/audit-checklist/`).
*   **Orphan Page:** A page not clearly linked to any hub or spoke, often lacking context.

Visually mapping complex clusters with tools like Lucidchart or Miro can reveal relationships and gaps. The goal is to ensure every piece of content has a home and a purpose within your site's structure.

## Kill or merge thin URLs

Identify and address thin or underperforming URLs within your clusters. A "thin" URL typically has less than 300 words of unique content, low impressions (e.g., fewer than 10 in the last 90 days from GSC), and minimal internal or external links. These pages dilute cluster authority and waste crawl budget.

Use GSC's Performance report to filter pages by low impressions and clicks. For pages identified as thin, decide on the best course of action using the following criteria:

| Action                 | Criteria
