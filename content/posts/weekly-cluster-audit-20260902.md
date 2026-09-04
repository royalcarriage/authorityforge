---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-09-04"
slug: "weekly-cluster-audit-20260902"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures your content hubs and spokes remain aligned with user intent, maintain search engine visibility, and actively drive monetization. This repeatable process helps identify indexing issues, eliminate thin content, strategically add commercial value, and monitor performance, preventing content decay and maximizing your topical authority over time.

## Export index coverage

Start by exporting your site's index coverage data from Google Search Console (GSC). Navigate to `Index > Pages` and select the "All known pages" view. Filter by `pages containing /systems/topical-clusters/` to focus solely on your target cluster. Export both "Indexed" and "Excluded" pages as a CSV. Repeat this for "Crawled - currently not indexed" and "Discovered - currently not indexed" statuses, especially if you're auditing a new or recently updated cluster. This step provides a raw list of URLs Google is aware of, highlighting any pages within your cluster that aren't indexed as expected or have recently dropped out of the index.

**Checklist:**

*   **Google Search Console:** `Index > Pages`
*   **Filter:** `pages containing /systems/topical-clusters/`
*   **Export:** CSV for "Indexed," "Excluded," "Crawled - currently not indexed," and "Discovered - currently not indexed" statuses.
*   **Date Range:** Select "Last 28 days" to spot recent changes, or "Last 3 months" for a broader historical view.

## Map hub ownership

Maintain a master spreadsheet or database for each topical cluster. This map should clearly define the hub URL and all associated spoke URLs. For each URL, record its primary keyword target, content type (e.g., informational, commercial), last updated date, and internal linking status (e.g., links to hub, links from hub, links to other spokes). This mapping helps visualize the cluster's structure and identifies orphaned pages or spokes that have drifted from their intended hub.

For larger sites, manual mapping can be time-consuming. Tools can automate parts of this process, but a human review is still necessary to confirm intent and accuracy.

| Feature         | Manual Spreadsheet (e.g., Google Sheets)                                     | Dedicated SEO Tool (e.g., Ahrefs Site Audit, Screaming Frog)                                  |
| :-------------- | :---------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| **Cost**        | Free                                                                          | Paid subscription (varies)                                                                    |
| **Control**     | Full control over custom fields and categorization                            | Predefined fields, some customization possible                                                |
| **Automation**  | Requires manual data entry, but can use formulas for basic checks             | Automates crawling, internal link analysis, identifies orphans, visualizes structure          |
| **Setup Time**  | High initial setup for large clusters                                         | Moderate, requires tool configuration                                                         |
| **Best For**    | Small to medium clusters, detailed intent tracking, custom ownership fields   | Large clusters, automated technical checks, identifying scale issues                          |

**Concrete Action:** For each spoke URL in your spreadsheet, verify:
1.  It contains at least one direct internal link to its designated hub.
2.  The hub page links to this spoke.
3.  It links to at least two other relevant spokes within the same cluster.
4.  No broken internal links exist on the page.

## Kill or merge thin URLs

Thin content pages within a cluster dilute topical authority and waste crawl budget. Identify pages with low organic traffic, minimal word count, or redundant information. Use GSC and Google Analytics (GA4) data to inform your decisions. Pages with consistently low impressions (e.g., <50/month over 90 days) and no clicks, or pages with very low average engagement metrics (e.g., time on page, scroll depth) are candidates for review.

**Decision Criteria:**

*   **Kill (410 Gone or 404 Not Found):** Use for pages that provide no unique value, have no inbound links (internal or external), and are unlikely to ever rank or generate traffic. A 410 signals intentional removal more clearly than a 404.
    *   *Example:* An outdated "news" article that is no longer relevant to the cluster and has no historical value.
*   **Merge (301 Redirect):** Combine two or more pages that cover highly similar topics, have overlapping keywords, or individually lack depth. Consolidate the content onto the strongest performing or most comprehensive URL, then 301 redirect the weaker URLs to the consolidated page. This passes link equity and consolidates topical signals.
    *   *Example:* You have "Best CRM for Small Business" and "Top CRM Solutions for Startups." If the content is 80% similar, merge them into one authoritative guide and redirect the weaker URL.
*   **Improve/Update:** If a page has potential but is underperforming due to outdated information, thin content, or poor optimization, prioritize a content refresh.

**Concrete Steps:**

1.  **GSC Review:** Filter GSC Performance reports for your cluster. Sort by "Impressions" (ascending). Review pages with consistently low impressions.
2.  **GA4 Review:** Check `Reports > Engagement > Pages and screens`. Filter for your cluster path. Identify pages with low
