---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-09-23"
slug: "weekly-cluster-audit-20260920"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

To conduct a weekly cluster audit, export Google Search Console's index coverage report, map all content to its primary hub, identify and either merge or delete underperforming spoke pages, strategically add one new commercial spoke, and track its impression growth for performance validation. This routine maintains cluster relevance and monetization.

## Export index coverage

The first step in a weekly cluster audit is to get a current snapshot of what Google sees. You need a list of all URLs associated with your domain and their indexing status. This data comes directly from Google Search Console (GSC), which is the authoritative source for indexing information.

Log into your GSC property. Navigate to the "Pages" report under the "Indexing" section. This report provides an overview of your site's indexing status. Focus on two key categories: "Indexed" and "Not indexed." The "Not indexed" section contains pages Google knows about but chose not to index, often with explanations. The "Indexed" section shows all pages currently in Google's index.

Export both lists as CSV files. Merge these into a single master spreadsheet. Add columns for "Indexing Status" and "GSC Last Crawl Date." This combined dataset forms the foundation for your audit. It tells you which pages are visible to users via search and which are not, allowing you to identify potential issues or opportunities.

Here's a quick checklist for this step:

*   Log into Google Search Console for your property.
*   Navigate to the "Pages" report.
*   Export all URLs listed under "Indexed" status.
*   Export all URLs listed under "Not indexed" status.
*   Combine these CSVs into a single master spreadsheet.
*   Add a column for the reported "Indexing Status" (e.g., "Indexed," "Excluded by noindex tag," "Discovered – currently not indexed").

## Map hub ownership

Once you have your master list of URLs, the next task is to assign each page to its parent topical cluster. Every piece of content should serve a specific hub. This ensures intentionality and helps identify orphaned pages or content that doesn't fit into your strategic framework.

In your master spreadsheet, create two new columns: "Hub URL" and "Cluster Name." Iterate through your URLs, populating these fields. For sites with a consistent URL structure, this can be partially automated. For example, any URL starting with `/systems/topical-clusters/` likely belongs to the "Topical Clusters" hub. A spoke like `/systems/topical-clusters/keyword-research-ai/` directly maps to the `/systems/topical-clusters/` hub.

For URLs that don't follow a clear pattern, or for older content, a manual review is necessary. Read the page title and the first paragraph to determine its primary topic and assign it to the most relevant hub. If a page doesn't clearly belong to any existing hub, flag it as an "Orphaned Page" for later review. This mapping clarifies your content architecture.

Consider these approaches for mapping:

| Mapping Method      | Criteria                                     | Best Use Case                                        |
| :------------------ | :------------------------------------------- | :--------------------------------------------------- |
| **URL Path Match**  | `/hub-slug/spoke-slug/`                      | Clean, consistent site architecture.                 |
| **Manual Review**   | Content analysis, title tags, internal links | Older sites, inconsistent structures, ambiguous pages. |
| **Category Tags**   | CMS categories or taxonomies                 | Blogs with well-defined content categories.          |

By the end of this step, every URL should have an assigned hub, or be marked as orphaned.

## Kill or merge thin URLs

Thin content drags down cluster performance. This step identifies underperforming pages within your clusters and determines whether to consolidate them into stronger pages or remove them entirely. The goal is to maximize the impact of your remaining content.

Filter your GSC export to identify pages with low impressions over the past 90 days. A common threshold is fewer than 100 impressions per month. Cross-reference these low-impression pages with your analytics (e.g., Google Analytics 4) for organic traffic
