---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-10-15"
slug: "weekly-cluster-audit-20261012"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures your content hubs remain organized and profitable by systematically identifying underperforming pages, mapping content gaps, and optimizing for search intent. This repeatable process helps maintain topical authority and drives targeted organic traffic to commercial assets.

## Export index coverage

Start by understanding your site's indexed status in Google Search Console (GSC). This reveals pages Google knows about and those it doesn't, which is critical for cluster health. Focus on issues that prevent content from ranking.

1.  **Access GSC:** Navigate to Google Search Console for your property.
2.  **Go to Pages report:** In the left-hand menu, select "Index" then "Pages."
3.  **Filter for "Not indexed" pages:** Review the specific reasons Google lists. Common issues include:
    *   **Crawl anomaly:** Indicates a server or DNS problem preventing Google from accessing the page.
    *   **Discovered – currently not indexed:** Google knows about the URL but hasn't crawled or indexed it yet. This can point to internal linking issues or low perceived quality.
    *   **Crawled – currently not indexed:** Google has crawled the page but chose not to index it. Often a sign of thin content, duplicate content, or low quality.
4.  **Export the list:** Download the full list of "Not indexed" URLs. Prioritize pages within your target cluster for immediate action.

Also, examine "Submitted and indexed" pages to confirm your primary cluster assets are performing as expected. A page submitted via sitemap but not indexed warrants investigation.

## Map hub ownership

Maintain a clear inventory of all pages within your topical clusters. This mapping helps visualize the structure and identify orphaned content or content gaps. Use a simple spreadsheet for this task.

Create a `cluster_map.csv` with the following columns:

*   **Cluster Name:** The overarching topic (e.g., "AI Content Generation").
*   **Hub URL:** The primary pillar page for the cluster (e.g., `/systems/topical-clusters/ai-content-generation/`).
*   **Spoke URL:** The specific article URL (e.g., `/blog/ai-writing-tools-review/`).
*   **Primary Keyword:** The main keyword targeted by the spoke page.
*   **Content Type:** (e.g., Informational, Commercial, Navigational).
*   **Word Count:** Current word count of the page.
*   **Organic Traffic (Last 90 days):** From Google Analytics or GSC.
*   **Status:** (e.g., Live, Draft, Merged, Redirected, Needs Update, Kill).
*   **Notes:** Any specific observations or action items.

Review this map weekly. Look for spokes that don't clearly link back to a hub, or hubs that lack sufficient supporting spokes. Ensure each spoke has a defined purpose and keyword target within its cluster.

## Kill or merge thin URLs

Identify and address underperforming or thin content within your clusters. Pages with low organic traffic, minimal word count, or poor engagement dilute your site's authority.

1.  **Identify candidates:**
    *   Filter your `cluster_map.csv` for pages with <300 words and <10 organic sessions in the last 90 days.
    *   Use a site search operator (`site:yourdomain.com intext:"[specific topic]"`) to find potential duplicate or very similar content.
2.  **Evaluate page purpose:** For each candidate, determine if it serves a unique purpose or if its content is covered elsewhere.
3.  **Decide on action:**

| Action     | Criteria                                                                    | Implementation                                                          |
| :--------- | :-------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| **Merge**  | Content is thin but has value; related to another page.                     | Consolidate content onto a stronger, existing page. 301 redirect old URL. |
| **Redirect** | Page has some backlinks or historical traffic but no current value.         | 301 redirect to the most relevant, high-quality page.                   |
| **Delete** | No traffic, no backlinks, no unique value, not part of any cluster.         | Remove page; allow it to 404. Consider a 410 if content is truly gone.   |
| **Update** | Content is thin but targets a valuable keyword; needs expansion.            | Expand content, add new sections, update data.                          |

For merging, ensure the target page is semantically relevant and can absorb the content without becoming unfocused. After merging or redirecting, update your `cluster_map.csv` accordingly.

## Add one commercial spoke

To maintain a monetization focus, aim to add at least one new commercial spoke to an existing cluster each week. This keeps your content strategy aligned with revenue goals.

1.  **Review existing clusters:** Identify clusters that have strong informational content but fewer commercial-intent spokes.
2.  **Keyword research:** Use a tool like Ahrefs Keywords Explorer or Semrush Keyword Magic Tool.
    *   Enter your hub's primary keyword (e.g., "project management software").
    *   Filter keywords by "Commercial" or "Transactional" intent.
    *   Look for keywords with moderate search volume (e.g., 100-500 searches/month) and acceptable Keyword Difficulty (KD) (e.g., <40).
    *   **Examples:** "best [software category] for small business," "[software name] vs [competitor]," "[software category] pricing," "buy [product type] online."
3.  **Outline the content:** Plan a content piece that directly addresses this commercial intent. This could be a review, comparison, buyer's guide, or a "best of" list.
4.  **Internal linking:** Ensure the new spoke links back to its hub and to other relevant spokes. Also, link from the hub to this new commercial spoke once published. This reinforces the cluster structure and passes authority.

This focused effort ensures your informational content eventually funnels users towards monetizable actions.

## Measure impressions

Regularly measure the impact of your cluster work by tracking organic impressions in Google Search Console. Impressions indicate how often your pages appear in search results, offering a leading indicator of visibility.

1.  **Access GSC Performance report:** Go to Google Search Console > Performance > Search results.
2.  **Filter by Page:** Click on the "Pages" tab.
3.  **Apply cluster filter:** Use a custom regex filter to include all URLs within a specific cluster (e.g., `^/systems/topical-clusters/ai-content-generation/.*|/blog/ai-writing-tools-review/|/blog/best-ai-content-generators/`).
4
