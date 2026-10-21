---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-10-21"
slug: "weekly-cluster-audit-20261018"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures your topical hubs and spokes remain focused, drive traffic, and support monetization goals by regularly assessing their performance and relevance. This process involves exporting data, mapping content, pruning underperforming URLs, adding new commercial spokes, and tracking key metrics.

## Export index coverage

Start by exporting your topical cluster's index coverage data from Google Search Console (GSC). This provides a baseline understanding of how Google perceives your content within the cluster.

**Steps:**

1.  Navigate to the "Pages" report under the "Indexing" section in GSC.
2.  Apply a URL filter using "URL starts with" and enter your cluster's base path, for example: `/systems/topical-clusters/`.
3.  Click "Export data" and choose "Google Sheets" or "CSV."
4.  Focus on the "Why pages aren't indexed" section. Identify any URLs within your cluster path that are not indexed due to common issues like "Crawled - currently not indexed" or "Discovered - currently not indexed." These pages require immediate attention.

Review the exported spreadsheet. Look for URLs that are indexed but receive minimal impressions or clicks. These might be candidates for merging or removal in later steps.

## Map hub ownership

After gathering index data, map out your cluster's content to ensure each spoke aligns with the hub's intent and has a clear purpose. This step clarifies content gaps and potential keyword cannibalization.

**Procedure:**

1.  Create a spreadsheet with the following columns for each URL in your cluster:
    *   `URL`
    *   `Primary Keyword`
    *   `Spoke Type (Informational/Commercial)`
    *   `Hub Link Status (Yes/No)`
    *   `Internal Link Count (from Screaming Frog or similar tool)`
    *   `Content Owner (Team/Individual)`
    *   `GSC Impressions (Last 90 days)`
    *   `GSC Clicks (Last 90 days)`
    *   `Average Position (Last 90 days)`
2.  Review each spoke. Does it genuinely support the hub? Is its primary keyword distinct enough from other spokes?
3.  Verify internal linking. Each spoke should link back to the hub. The hub should link to its core spokes. Aim for 3-5 relevant internal links from other spokes to any new content.

**Content Type Assessment:**

| Spoke Type    | Primary Goal                      | Example URL                                                |
| :------------ | :-------------------------------- | :--------------------------------------------------------- |
| Informational | Educate, answer questions         | `/systems/topical-clusters/what-is-topical-authority/`     |
| Commercial    | Drive conversions, product sales  | `/systems/topical-clusters/best-topical-cluster-software/` |

Identify any informational spokes attempting to rank for commercial terms, or vice-versa. This often indicates poor intent alignment.

## Kill or merge thin URLs

Thin or underperforming content within a cluster dilutes its authority and can hinder overall performance. Identify these pages and take action to consolidate or remove them.

**Criteria for "Thin":**

*   **Low Impressions:** Consistently fewer than 10 impressions per month over a 90-day period in GSC.
*   **Low Clicks:** Minimal to no clicks despite being indexed.
*   **High Bounce Rate/Low Time on Page:** (If you have analytics data) Indicates users aren't finding value.
*   **Duplicate Content:** Significant overlap with other pages in your cluster or on your site.
*   **Outdated Information:** Content that is no longer accurate or relevant to your audience.

**Action Options:**

| Action     | When to Apply                                          | How to Execute                                         |
| :--------- | :----------------------------------------------------- | :----------------------------------------------------- |
| **Merge**  | Content has some value but is too thin on its own.     | Combine content into a stronger, more relevant spoke.  |
|            | Overlaps with another spoke (keyword cannibalization). | 301 redirect the old URL to the new, consolidated page. |
| **Kill**   | Content is entirely irrelevant, outdated, or low-value. | 301 redirect to the most relevant hub or a stronger spoke. |
|            | No logical merge candidate exists.                     | For truly orphaned, low-value content, a 410 (Gone) status may be used, but 301 is safer. |

**Execution Steps:**

1.  Prioritize URLs identified in the "Export index coverage" step as having low impressions or indexing issues.
2.  For each identified URL, determine if it can be merged into an existing, stronger spoke or if it should be redirected to the hub.
3.  Implement 301 redirects from the old, thin URL to its new, consolidated target. Update any internal links pointing to the old URL.
4.  Remove internal links to any URLs being completely killed.

## Add one commercial spoke

To ensure your topical clusters actively contribute to your business objectives, regularly introduce new commercial spokes. These pages target high-intent keywords directly related to your products or services.

**Process for Adding a Commercial Spoke:**

1.  **Identify Commercial Intent Keywords:**
    *   Review GSC queries for your existing informational spokes. Look for queries with commercial modifiers like "best," "review," "pricing," "vs," "tool," "software," "consultant."
    *   Use a keyword research tool (e.g., Ahrefs, Semrush) to find keywords with transactional intent related to your cluster's topic. For a `/systems/topical-clusters/` hub, examples might be "topical cluster audit service," "topical mapping software," or "hire SEO content strategist."
    *   Evaluate search results for these keywords. Do competitors show product pages, service pages, or comparison articles? This confirms commercial intent.
2.  **Outline the Spoke:**
    *   **Goal:** Drive a specific conversion (e.g
