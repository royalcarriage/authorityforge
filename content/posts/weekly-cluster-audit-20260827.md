---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-08-30"
slug: "weekly-cluster-audit-20260827"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

# Weekly Cluster Audit Checklist for Content Sites

A weekly cluster audit ensures your topical hubs remain intentional and monetizable by systematically reviewing index coverage, mapping content ownership, pruning thin URLs, adding commercial spokes, and measuring performance. This repeatable process helps maintain authority and drive conversions within your content systems.

## Export index coverage

Start by exporting key index coverage data from Google Search Console (GSC). This identifies pages Google knows about, pages you want indexed, and any indexing issues.

1.  **Access GSC:** Log into Google Search Console for your property.
2.  **Navigate to Pages Report:** Go to `Index > Pages`.
3.  **Filter and Export:**
    *   Filter by `Not indexed` status.
    *   Export `Discovered - currently not indexed` and `Crawled - currently not indexed` lists as CSV files. These represent pages Google found but didn't index.
    *   Export `Indexed` pages to get a full list of what's live.
4.  **Sitemap Check:** Go to `Index > Sitemaps`. Click on your main sitemap and export `All submitted pages`. Compare this list against your indexed pages to spot discrepancies.

This initial export provides a raw list of URLs to cross-reference with your cluster mapping.

## Map hub ownership

Create a detailed map of your topical cluster to understand its structure, identify content gaps, and ensure every piece serves a clear purpose. Use a spreadsheet (Google Sheets or Excel) for this.

1.  **Identify Primary Hub:** Start with the main hub URL for the cluster you're auditing (e.g., `/systems/topical-clusters/`).
2.  **List All Associated URLs:** Populate your spreadsheet with every URL that logically belongs to this cluster, including all spokes.
3.  **Define Columns:** For each URL, populate the following columns:

    | Column Name      | Description                                                               | Example Entry                                  |
    | :--------------- | :------------------------------------------------------------------------ | :--------------------------------------------- |
    | **URL**          | Full URL of the content piece.                                            | `/systems/topical-clusters/keyword-research/`  |
    | **Content Type** | Is it a Hub (main pillar) or a Spoke (supporting article)?                | Spoke                                          |
    | **Intent**       | What is the primary user intent (Informational, Commercial, Navigational)? | Informational                                  |
    | **Target Keyword** | The main keyword the page is optimized for.                               | "topical cluster keyword research"             |
    | **Primary Hub URL** | The canonical hub this spoke belongs to.                                  | `/systems/topical-clusters/`                   |
    | **Status**       | Current state (Live, Redirected, Deleted).                                | Live                                           |
    | **Last Audit Date** | When this specific URL was last reviewed.                                 | 2023-10-26                                     |
    | **Notes**        | Any specific observations or actions needed.                              | Low traffic, consider merging with X.          |

4.  **Review for Orphans:** Look for spokes that don't clearly link back to the main hub or other relevant spokes. These are often underperforming.
5.  **Identify Overlaps:** Spot URLs targeting very similar keywords or covering identical sub-topics. These are candidates for merging.

This mapping provides a single source of truth for your content cluster, highlighting areas for optimization.

## Kill or merge thin URLs

Thin or underperforming content dilutes your cluster's authority and wastes crawl budget. Systematically identify and address these pages. A "thin" URL typically has low word count (e.g., <300 words), no clear intent, zero or very low organic traffic/impressions over 6+ months, or duplicates content found elsewhere in your cluster.

1.  **Identify Candidates:** Use your mapped URLs. Cross-reference with GSC (Performance report for impressions/clicks) and Google Analytics 4 (GA4) (Pages and screens report for traffic). Filter for pages within your cluster path that show minimal performance.
2.  **Decision Matrix:** Apply a clear strategy for each candidate.

    | Action                | Criteria for Selection                                                                                                                                                                                                                                                                | Recommended Implementation                                                                                                                                                                                                                                                                                                                                                                                                                                 |
    | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | **Kill (410 Gone)**   | No organic impressions or clicks in GSC for 6+ months. No internal links pointing to it. No external backlinks. No future strategic value. Content is truly obsolete or irrelevant.                                                                                                    | Set a 410 (Gone) HTTP status code. Remove all internal links pointing to it. Remove it from your sitemap. This explicitly tells Google the page is permanently gone and should be removed from the index.                                                                                                                                                                                                                                                   |
    | **Redirect (301)**    | Low organic impressions/clicks but some relevant content. Has
