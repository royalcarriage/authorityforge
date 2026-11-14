---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-11-14"
slug: "weekly-cluster-audit-20261111"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit for content sites systematically checks index coverage, verifies content-to-hub mapping, identifies and resolves thin URLs, strategizes the addition of new commercial spokes, and monitors cluster impressions. This process ensures content remains intentional, supports its parent hub, and continues to drive monetizable traffic.

---

## Export index coverage

Start your weekly audit by pulling current index data directly from Google Search Console (GSC). This provides a baseline for understanding what Google is acknowledging from your site within the target cluster. Focus on the "Pages" report under "Indexing."

Filter the report to "All submitted pages" or "Indexed pages" and set a custom date range for the last 7 days. Export this data. Cross-reference this list against your known cluster URLs. Pay particular attention to:

*   **Recently published pages:** Confirm they are indexed. If not, inspect "Why pages aren't indexed" for specific reasons like "Crawled – currently not indexed" or "Discovered – currently not indexed."
*   **Older, important pages:** Check if any core hub or spoke pages have dropped from the index unexpectedly. This is often an indicator of a technical issue.

## Map hub ownership

Once you have your indexed URLs, verify each page's intended place within your topical clusters. This step confirms that every piece of content serves a purpose and reinforces its designated hub.

Maintain a simple spreadsheet or database with the following columns for each URL:

*   `URL`
*   `Primary Target Keyword`
*   `Assigned Hub URL` (the main hub page it supports)
*   `Content Type` (e.g., informational spoke, commercial spoke, hub page)
*   `Status` (e.g., Live, Redirected, 404)

Review your exported indexed URLs against this map. Identify any pages that:

*   **Lack an assigned hub:** These are orphaned pages. Decide if they should be assigned to an existing hub, form the basis of a new hub, or be killed.
*   **Are assigned to the wrong hub:** Redirect or update internal linking to point them to the correct hub.
*   **Are indexed but not on your map:** These might be old pages, test pages, or accidental publications. Investigate their origin and decide their fate.

## Kill or merge thin URLs

Thin content dilutes site authority and wastes crawl budget. This step focuses on identifying and addressing pages that offer minimal value to users or search engines within your cluster.

Criteria for identifying thin URLs:

*   **Low organic impressions:** Pages with fewer than 10 organic impressions in the last 90 days (from GSC).
*   **Low word count:** Pages under 300 words that aren't intentionally brief (e.g., specific definitions).
*   **No clear user intent:** Pages that don't answer a specific question or solve a problem.
*   **Duplicate content:** Pages that largely repeat information found elsewhere on your site or externally.

Once identified, decide whether to kill the page (404/410 status) or merge its valuable content into a stronger, more relevant page within the same cluster.

| Action   | Criteria                                                              | Outcome                                                                 |
| :------- | :-------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| **Kill** | No organic traffic, no unique value, low word count, redundant.        | 404 (Not Found) or 410 (Gone) status. Removes page from index.          |
| **Merge**| Some unique value, low traffic, content overlaps with a stronger page. | Consolidate content. 301 redirect old URL to the target page. Preserves link equity. |

For pages to kill, implement a 404 or 410 status code. For pages to merge, copy any unique, useful content to the target page, then set up a 301 redirect from the old URL to the new, consolidated URL. Update any internal links pointing to the old URL.

## Add one commercial spoke

To maintain and grow monetization, intentionally add one new commercial spoke page to a relevant cluster each week. This keeps your content strategy aligned with revenue goals.

Begin by reviewing your existing hubs and their supporting spokes. Look for gaps where a commercial intent keyword could fit naturally.

**Process for identifying a commercial spoke:**

1.  **Review competitor SERPs:** For your main hub keywords, observe what types of commercial pages rank well for competitors (e.g., "best X for Y," "X vs. Y," "X alternatives," "X pricing").
2.  **Keyword research tools:** Use Ahrefs, Semrush, or similar tools. Enter your hub keyword and look for related keywords with buyer intent modifiers. Filter for keywords containing "buy," "review," "price," "vs," "best," "discount."
3.  **Customer questions:** Analyze customer support tickets or sales inquiries for common commercial questions your content could answer.

Once you identify a target commercial keyword (e.g., "best project management software for small teams"), outline a spoke page that directly addresses this intent. Ensure it links back to its parent hub and offers clear calls to action relevant to your monetization strategy (e.g., affiliate links, product pages, lead forms).

## Measure impressions

Finally, assess the impact of your cluster work by tracking impressions. Impressions indicate how often your content appears in search results, providing insight into visibility and potential ranking shifts.

Go back to Google Search Console and select the "Performance" report.

1.  **Filter by Page:** Use a custom regex filter (`/systems/topical-clusters/.*`) to isolate all pages within your target hub path. This provides a holistic view of the cluster's performance.
2.  **Compare date ranges:** Set a custom date range for the last 7 days and compare it to the previous 7 days (or previous 28 days for a broader trend).

Look for:

*   **Overall cluster impression
