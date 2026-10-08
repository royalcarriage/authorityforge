---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-10-08"
slug: "weekly-cluster-audit-20261005"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures your content hubs and their supporting spokes remain aligned with user intent and monetization goals. By systematically reviewing index status, content ownership, performance, and new opportunities, operators can maintain content quality and drive consistent organic growth. This repeatable process prevents content decay and keeps your topical authority intact.

## Export Index Coverage

Begin by checking your site's index coverage directly in Google Search Console (GSC). This step identifies any pages that Google has recently de-indexed or failed to index, allowing for quick troubleshooting. Focus on the "Pages" report to understand current index status.

1.  Log into Google Search Console.
2.  Navigate to the "Pages" report under "Indexing."
3.  Filter by "Not indexed" and review the reasons provided by Google (e.g., "Crawled - currently not indexed," "Discovered - currently not indexed," "Page with redirect"). Prioritize pages with errors or those marked as "Crawled - currently not indexed."
4.  Also, review "Indexed" pages, looking for unexpected drops in the graph over the last 7-30 days. This can signal broader indexing problems.
5.  Export both "Not indexed" and "Indexed" lists to CSV for your records.

This GSC export provides an immediate overview. For deeper technical crawl issues, a site crawler can complement this.

| Tool                 | Primary Use for Index Coverage | Focus                                 |
| :------------------- | :----------------------------- | :------------------------------------ |
| Google Search Console | Official index status          | What Google knows about your pages.   |
| Screaming Frog SEO Spider | Crawlability issues            | What prevents Google from *seeing* pages. |

## Map Hub Ownership

Maintain a clear understanding of who owns each content hub and its associated spokes. This ensures accountability for content performance and facilitates consistent content updates. A simple spreadsheet provides the structure needed for this mapping.

Create a shared document with the following columns:

*   **Hub URL:** The canonical URL of the hub page (e.g., `/systems/topical-clusters/`).
*   **Hub Name:** A descriptive name for the cluster (e.g., "Topical Clusters System").
*   **Spoke URLs:** A list of all URLs linking to/from this hub.
*   **Content Owner:** The individual or team responsible for the hub and its spokes.
*   **Last Audit Date:** When this hub was last reviewed.
*   **Status:** (e.g., "Active," "Needs Update," "Archive").

Example structure for a hub:

*   **Hub:** `/systems/topical-clusters/`
*   **Spokes:**
    *   `/systems/topical-clusters/keyword-research-for-clusters/`
    *   `/systems/topical-clusters/content-briefs-for-spokes/`
    *   `/systems/topical-clusters/internal-linking-strategies/`
    *   `/systems/topical-clusters/cluster-performance-tracking/`

Regularly check internal links within your clusters. Use a tool like Ahrefs Site Audit or Screaming Frog to identify orphaned pages or broken links that disrupt the cluster's authority flow.

## Kill or Merge Thin URLs

Identify and address thin, low-value content that dilutes your site's authority. This clean-up process consolidates value and improves overall site quality. Focus on content that offers little unique value or receives no organic traffic.

**Criteria for "Thin" Content:**

1.  **Word Count:** Pages with fewer than 200 words.
2.  **Organic Traffic:** Pages with zero organic clicks in Google Search Console over the last 90 days.
3.  **Duplicate Content:** Pages with a high similarity score (e.g., >80% via Copyscape or Originality.ai) to other content on your site or elsewhere.
4.  **No Clear Intent:** Pages that don't serve a specific user need or fit within a topical cluster.

Once identified, decide whether to kill (delete) or merge the content.

| Action | Description                                 | When to Use                                  |
| :----- | :------------------------------------------ | :------------------------------------------- |
| Kill   | Delete the page and implement a 301 redirect. | Content is truly obsolete, low-quality, or redundant. |
| Merge  | Combine content into a more substantial, relevant page, then 301 redirect. | Content has some value but is too short or fragmented. |

**Process:**

1.  **Identify:** Use GSC (low clicks), site audit tools (low word count), and manual review.
2.  **Decide:** Kill or Merge based on criteria.
3.  **Implement:**
    *   For "Kill": Delete the page, set up a 301 redirect from the old URL to the most relevant hub, spoke, or category page.
    *   For "Merge": Copy relevant content, expand an existing page, and then 301 redirect the old URL to the new, merged page.
4.  **Notify Google:** Use the "Removals" tool in GSC for pages you've deleted and want de-indexed quickly.

## Add One Commercial Spoke

Proactively add new commercial content to your clusters to capture users further down the sales funnel. This step focuses on creating targeted content designed to drive conversions, not just informational traffic.

1.  **Identify Gaps:** Review your existing clusters. Which commercial keywords are missing? Use keyword research tools like Ahrefs or Semrush to find low-competition commercial keywords related to your existing hubs.
    *   Look for terms with purchase intent: "best [product]", "[service] pricing", "[product] review", "alternatives to [competitor]", "how much does [service] cost".
    *   Filter for keywords with lower difficulty scores but still relevant search volume.
2.  **Select a Keyword:** Choose one commercial keyword that aligns with an existing hub and has clear business value.
    *   Example: If your hub is `/systems/topical-clusters/`, a commercial spoke might target "topical cluster software for agencies."
3.  **Draft a Content Brief:** Outline the content, target audience, key selling points, and calls to action.
