---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-10-12"
slug: "weekly-cluster-audit-20261009"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

To maintain intentional and monetizable topical clusters, perform a weekly audit by exporting index coverage, mapping hub ownership, identifying and addressing thin URLs, adding a commercial spoke, and measuring impression performance. This systematic approach ensures every piece of content contributes to your site's authority and revenue goals, preventing content drift and optimizing resource allocation for maximum SEO impact.

---

## Export Index Coverage

Begin your weekly cluster audit by exporting current index coverage data from Google Search Console (GSC). This step provides a real-time snapshot of which pages Google has indexed from your site, helping identify indexing issues or unexpected exclusions within your target clusters.

**Specific Steps:**

1.  Log into Google Search Console.
2.  Navigate to "Index" > "Pages."
3.  Filter the report by the specific URL path of your topical cluster (e.g., `/systems/topical-clusters/`).
4.  Click the "Export" button and choose "Google Sheets" or "CSV" for further analysis.
5.  Focus on the "Not indexed" tab to identify any pages within your cluster that Google is not indexing. Common reasons include "Crawled - currently not indexed" or "Discovered - currently not indexed." These indicate potential quality or technical issues.

**Checklist for Export Review:**

*   Are all expected cluster pages present in the "Indexed" tab?
*   Are there any unexpected URLs (e.g., old drafts, test pages) showing up?
*   What are the primary "Not indexed" reasons for cluster pages? Prioritize fixing "Server error (5xx)" or "Redirect error" immediately.

## Map Hub Ownership

Clearly define the central hub page for each topical cluster and document its associated spoke content. This mapping ensures every piece of content has a strategic home and purpose, preventing orphaned pages and reinforcing topical authority. Maintaining this map simplifies internal linking and content planning.

**Procedure:**

1.  **Create a Master Spreadsheet:** Set up a Google Sheet or Excel workbook with columns for:
    *   `Cluster Name`
    *   `Hub URL`
    *   `Spoke URL`
    *   `Spoke Title`
    *   `Primary Keyword`
    *   `Target Buyer Stage` (Awareness, Consideration, Decision)
    *   `Status` (Live, Draft, Kill/Merge Candidate)
    *   `Last Audit Date`
2.  **Identify Hubs:** For each cluster, explicitly name one URL as the definitive hub page. This page should be the broadest overview of the topic.
    *   *Example:* For a "Content Marketing Strategy" cluster, `/blog/content-marketing-strategy/` might be the hub.
3.  **List Spokes:** Populate the spreadsheet with all URLs intended to be spokes for that hub.
    *   *Example Spokes:* `/blog/content-audit-checklist/`, `/blog/keyword-research-tools/`, `/blog/ai-content-generation-guide/`.
4.  **Verify Internal Links:** Spot-check that the hub links to all its spokes, and spokes link back to the hub. Aim for a minimum of 2-3 internal links from each spoke back to the hub.

**Tools for Mapping:**

*   **Screaming Frog SEO Spider:** Crawl your site and export internal links. Filter by URL path to see which pages link to and from your hub.
*   **Google Sheets:** Essential for organizing and maintaining the cluster map.
*   **Ahrefs Site Explorer / Semrush Site Audit:** Use their "Internal Link" reports to visualize connections and identify weak points.

## Kill or Merge Thin URLs

Identify and address underperforming or "thin" URLs within your clusters to consolidate authority and improve content quality. Thin content often has low word count, minimal traffic, or serves no clear user intent, diluting your cluster's overall power.

**Definition of "Thin":**

*   Less than 300 words of unique content.
*   Receives fewer than 5 organic clicks per month (from GSC, last 90 days).
*   Targets a keyword with no search volume or irrelevant intent.
*   Duplicates content already covered better elsewhere on your site.

**Actionable Steps:**

1.  **Filter by Performance:** In GSC, go to "Performance" > "Search results." Filter by your cluster's URL path. Sort by "Clicks" (lowest first) or "Impressions" (lowest first) over the last 90 days. Export this data.
2.  **Cross-reference with Content Audit:** Compare low-performing URLs with your cluster map and content details (word count, primary keyword).
3.  **Decide Action:** For each thin URL, choose one of the following strategies:

| Strategy            | When to Use                                                                 | Implementation                                                          |
| :------------------ | :-------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| **301 Redirect**    | Content is outdated but *some* value exists; a better, related page exists. | Redirect the old URL to the most relevant, higher-quality page.         |
| **Content Merge**   | Two or more thin pages cover similar ground; can create one stronger page.  | Consolidate content, update the best URL, 301 redirect others to it.    |
| **410 Content Gone**| Content is completely irrelevant, low quality, and has no redirect target.  | Return a 410 (Gone) status code. Use sparingly; confirms content removal.|
| **Noindex (Meta Tag)**| Page provides internal utility but should not rank (e.g., archive pages). | Add `<meta name="robots" content="noindex">` to the page's HTML.      |

**Example:**
You have `/blog/what-is-ai-content/` (200 words, 2 clicks/month) and `/blog/ai-content-generation-guide/` (1500 words, 150 clicks/month) in the same cluster. Merge the thin content from "what is AI content" into the "AI content generation guide" and set up a 301 redirect from the old URL to the guide. Update internal links pointing to the old page.

## Add One Commercial Spoke

To drive direct revenue, identify and add at least one new commercial spoke to an existing cluster each week. Commercial spokes target transactional or high-intent keywords, linking user needs directly to your products, services, or affiliate offers.

**Process for Identifying a Commercial Spoke:**

1.  **Review Cluster Keywords:** Access your cluster's keyword list (from your mapping spreadsheet or a keyword tool). Look for terms indicating purchase intent.
    *   *Keywords to target:* "best [product category]," "[product] alternatives," "[service] pricing," "buy [product]," "[product] review."
2.  **Keyword Research (Ahrefs/Semrush):**
    *   Enter your hub URL into Ahrefs Site Explorer or Semrush Organic Research.
    *   Filter keywords by "Commercial" or "Transactional" intent (if the tool allows).
    *   Look for keywords with moderate search volume (e.g., 100-500 searches/month) and high commercial intent that your current content doesn't fully address.
    *   *Example:* If your "AI Writing Tools" cluster lacks content for "best AI writing software for agencies," this is a strong candidate.
