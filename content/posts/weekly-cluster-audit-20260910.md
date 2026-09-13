---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-09-13"
slug: "weekly-cluster-audit-20260910"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit maintains topical authority by identifying content gaps, merging thin pages, and adding commercial spokes, ensuring content remains aligned with current search intent and maximizes monetization opportunities. This systematic review keeps your content ecosystem healthy and focused on organic growth.

## Export index coverage

Begin your weekly audit by pulling fresh index coverage data from Google Search Console (GSC). This step provides a current snapshot of what Google knows about your site's pages, highlighting potential issues or opportunities within your content clusters.

1.  **Navigate to GSC:** Open your Google Search Console property.
2.  **Access "Pages":** Go to "Indexing" > "Pages" in the left-hand menu.
3.  **Filter and Export:**
    *   **Filter 1:** Click "View data about indexed pages." Export this list of URLs.
    *   **Filter 2:** Return to the "Pages" report. Click "View data about not indexed pages." Export this list as well.
    *   **Optional Filter:** For large sites, use the URL filter at the top to focus on specific subfolders related to your clusters (e.g., `https://www.yourdomain.com/systems/topical-clusters/*`).
4.  **Consolidate Data:** Combine these exported CSVs into a single spreadsheet. Add a column to denote whether each URL is indexed or not. This raw data forms the foundation for mapping and identifying thin content.

## Map hub ownership

With your index coverage data in hand, it's time to map which URLs belong to which cluster and verify their hierarchical relationship. This ensures your internal linking strategy supports your topical authority goals.

1.  **Open Your Cluster Tracker:** Refer to your existing spreadsheet that lists your main hub pages and their associated spokes. If you don't have one, create a new tab in your audit spreadsheet.
2.  **Identify Hubs:** List all your primary hub pages (e.g., `/systems/topical-clusters/`).
3.  **Associate Spokes:** For each hub, list all the individual spoke articles designed to support it. Use the exported GSC URLs to confirm these pages exist and are indexed.
4.  **Verify Internal Linking:**
    *   **Manual Spot Check:** Pick 3-5 spokes per cluster. Visit each spoke and confirm it links back to its primary hub with relevant anchor text.
    *   **Automated Check (Screaming Frog):**
        *   Crawl your website with Screaming Frog SEO Spider.
        *   Once the crawl is complete, go to the "Internal" tab.
        *   Filter by your hub URL (e.g., `https://www.yourdomain.com/systems/topical-clusters/`).
        *   Select the hub URL, then click the "Inlinks" tab at the bottom. This shows all pages linking to your hub.
        *   Review the source URLs to ensure your spokes are linking correctly.

| Method           | Speed       | Accuracy       | Detail Level                                    |
| :--------------- | :---------- | :------------- | :---------------------------------------------- |
| **Manual Spot Check** | Slow        | High (for checked pages) | Deep understanding of specific page context     |
| **Screaming Frog** | Fast (for crawl) | High (data-driven) | Comprehensive list of all inlinks, anchor text |

Ensure every spoke has a clear "owner" (a hub) and links appropriately.

## Kill or merge thin URLs

Thin content dilutes topical authority and wastes crawl budget. This step focuses on identifying and addressing underperforming pages within your clusters.

1.  **Filter for Low Performance:** In your consolidated GSC export, filter for URLs within your clusters that have low impressions (e.g., <100 per month) and low clicks (e.g., <5 per month) over the last 90 days.
2.  **Content Audit Checklist:** For each low-performing URL, ask:
    *   **Intent Match:** Does this page address a unique search intent not covered better by another page in the cluster?
    *   **Content Quality:** Is the content comprehensive, up-to-date, and genuinely helpful? Is it under 300 words?
    *   **Traffic Potential:** Does it target keywords with any meaningful search volume?
    *   **Internal Linking:** Does it receive internal links from relevant pages? Does it link out to relevant pages?
3.  **Decision & Action:**
    *   **Merge:** If the content is thin, outdated, or addresses a similar intent to a more robust spoke or the hub, merge it.
        *   Copy unique, valuable sections into the target
