---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-10-25"
slug: "weekly-cluster-audit-20261022"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A repeatable weekly audit ensures your content clusters remain intentional and monetizable. To perform this, export index coverage from Google Search Console, map content to specific hubs, identify and prune thin URLs, add new commercial spokes, and measure the impact on impressions and clicks. This systematic process maintains cluster integrity and search performance.

## Export index coverage

Start by understanding your site's indexed status directly from Google. Access Google Search Console (GSC) for your property. Navigate to the `Index > Pages` report. This report shows which pages Google has indexed and which it hasn't, along with reasons.

Filter the report to focus on pages that are "Not indexed." Pay close attention to reasons like "Discovered - currently not indexed" or "Crawled - currently not indexed." These pages represent potential content that Google knows about but hasn't deemed worthy of indexing, or hasn't processed yet.

Export this data. The export button is typically at the top of the GSC report interface. Choose "Export data" and select "Google Sheets" or "CSV." A Google Sheet export is often more convenient for immediate analysis, allowing you to add columns and apply filters quickly. This weekly export provides a fresh baseline of your site's indexability.

## Map hub ownership

Once you have your list of indexed and non-indexed URLs, you need to map them back to their respective topical clusters. This step clarifies content ownership and identifies orphaned pages.

Create a master spreadsheet for your topical clusters. Include columns such as:
*   `URL` (from your GSC export)
*   `Hub URL` (the main hub page this URL belongs to, e.g., `/systems/topical-clusters/`)
*   `Spoke Type` (e.g., "Informational," "Commercial," "Review")
*   `Primary Keyword` (the main term the page targets)
*   `Owner` (the person/team responsible for the content)
*   `Last Audit Date` (when this specific page was last reviewed)

Use spreadsheet functions like `VLOOKUP` or `XLOOKUP` to automatically assign `Hub URL` values if your URLs follow a clear path structure (e.g., all spokes for `/systems/topical-clusters/` live under that path). For example, `/systems/topical-clusters/keyword-research-tools/` would map to the `/systems/topical-clusters/` hub. Manually review any URLs that don't fit a pattern, or which appear to be outside of any defined cluster. This ensures every piece of content has a home and a purpose within your site's architecture.

## Kill or merge thin URLs

Thin content dilutes your site's authority and wastes crawl budget. Identify pages with low value, low impressions, or significant keyword overlap. Use your mapped spreadsheet, adding columns for `Word Count`, `GSC Impressions`, `GSC Clicks`, and `Conversion Rate` (if tracked).

Filter your data to find pages with:
*   Under 300 words of unique content.
*   Fewer than 10 impressions in GSC over the last 90 days.
*   No conversions or lead forms filled (for commercial pages).
*   High keyword overlap with a stronger, performing page in the same cluster.

Once identified, you have two primary actions: kill or merge.

| Action   | Criteria                                                              | Outcome                                                                                                  |
| :------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| **Kill** | Extremely low quality, no traffic, no internal links, no future value. | Remove content, implement a 410 (Gone) or 404 (Not Found) status. Update internal links pointing to it.   |
| **Merge**| Some value/traffic, overlaps significantly with a superior page.      | Consolidate content onto the superior page, implement a 301 redirect from the old URL to the new one. Update internal links pointing to the old URL. |

For example, if you have two blog posts, "Best SEO Tools 2022" and "Top SEO Software," and "Best SEO Tools 2023" exists as a strong, updated page, you might merge the 2022 and Software pages into the 2023 one using 301 redirects. If a page like "What is an SEO" has 150 words and zero impressions, and you have a 2000-word guide on "SEO Fundamentals" covering the same topic, consider a 410 for the thin page and ensure the guide is robust. After any kill or merge, update all internal links pointing to the old URL to either the new merged URL or a relevant hub page.

## Add one commercial spoke

To maintain monetization potential, intentionally add new commercial content. Each week, identify one specific commercial keyword opportunity within an existing cluster. Use a keyword research tool like Ahrefs or Semrush to find keywords with clear buyer intent that are not yet covered, or are covered poorly, by your existing content.

For instance, if your cluster is about "project management software," and you notice high search volume for "best project management software for startups" or "monday.com vs asana," but no dedicated page, that's your target. Focus on long-tail, comparative, or "best of"
