---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-10-28"
slug: "weekly-cluster-audit-20261025"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures your topical hubs remain effective and monetizable by systematically identifying and addressing underperforming content. Begin by exporting index coverage data from Google Search Console, then map content to its primary hub. Decide to kill, merge, or improve thin URLs. Intentionally add one new commercial spoke, and finally, measure overall cluster impressions to track growth and refine your strategy.

## Export index coverage

Start your weekly audit by pulling fresh data on how your content performs in search. This helps you spot pages that aren't pulling their weight or opportunities you're missing.

Use Google Search Console (GSC) for this:

1.  Navigate to "Performance > Search results."
2.  Set the date range to "Last 28 days."
3.  Click the "Pages" tab.
4.  Export this data to Google Sheets.

Once you have the GSC export, filter it. Look for pages with:

*   **Impressions < 100:** These pages are barely being seen.
*   **Clicks < 5:** Even if impressions are okay, low clicks indicate a relevance or title/description issue.

Next, identify internal linking issues. Open Screaming Frog SEO Spider:

1.  Go to "Configuration > Spider > Crawl Mode: List."
2.  Upload your filtered GSC export.
3.  Run the crawl.
4.  Review the "Inlinks" column for each URL. Pages with zero or very few inlinks are often orphaned.

## Map hub ownership

Before making changes, you need a clear understanding of which content belongs to which hub. This ensures your efforts contribute to a larger, intentional content structure.

Create a simple mapping document, like a Google Sheet or an Airtable base, with these columns:

*   `URL`
*   `Primary Hub URL` (e.g., `/systems/topical-clusters/`)
*   `Target Keyword`
*   `Last Updated Date`
*   `Content Owner` (if applicable)

**Example Entry:**

| URL                                      | Primary Hub URL               | Target Keyword              | Last Updated | Content Owner |
| :--------------------------------------- | :---------------------------- | :-------------------------- | :----------- | :------------ |
| `/blog/ai-for-seo-audits/`               | `/systems/topical-clusters/`  | AI SEO audit tools          | 2023-11-15   | Jane Doe      |
| `/blog/content-gap-analysis-guide/`      | `/systems/topical-clusters/`  | content gap analysis        | 2024-01-20   | John Smith    |
| `/blog/best-ai-writing-assistants/`      | `/systems/ai-tools/`          | AI writing tools            | 2024-02-10   | Jane Doe      |

This mapping helps you identify orphaned pages – those without a clear `Primary Hub URL`. Orphaned pages often lack internal linking support and dilute topical authority. Assign each orphaned page to an existing hub or mark it for consolidation if it doesn't fit.

## Kill or merge thin URLs

After mapping, you'll find pages that are not performing and don't contribute meaningfully to any hub. These "thin" URLs drain crawl budget and dilute your site's authority. A thin URL typically has:

*   Fewer than 300 words.
*   No internal links pointing to it.
*   Low or zero GSC impressions and clicks.
*   No external backlinks.

Decide on an action for each thin page:

| Action         | Criteria                                                                    | Impact                                                                                                 | How to Implement                                                                        |
| :------------- | :-------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| **Kill (410)** | No value, no traffic, no relevant internal or external links. Irrelevant topic. | Removes dead weight, signals to search engines the page is intentionally gone.                          | Ensure the page returns a 410 HTTP status code. Remove internal links to it.            |
| **Merge (301)** | Similar topic to another page, but individually weak. Low value.            | Consolidates authority and content into a stronger, more comprehensive resource.                        | Redirect the thin URL to the stronger, merged page using a 301 redirect. Update internal links. |
|
