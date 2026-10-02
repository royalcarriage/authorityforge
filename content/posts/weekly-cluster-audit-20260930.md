---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-10-02"
slug: "weekly-cluster-audit-20260930"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures your content hubs remain intentional, monetizable, and authoritative by systematically identifying content gaps, consolidating thin pages, and adding commercial value. This repeatable process helps maintain strong topical signals to search engines and optimizes user pathways to conversions.

## Export index coverage

Start by understanding what Google sees and what your site actually has. This step provides the raw data for identifying indexing issues and content that might be underperforming or misclassified within your clusters.

1.  **Google Search Console (GSC):**
    *   Navigate to **Indexing > Pages**.
    *   Filter by **"Indexed"** and export the full list.
    *   Change the filter to **"Excluded"** and export this list as well. Pay close attention to exclusion reasons like "Duplicate, submitted URL not selected as canonical" or "Crawled - currently not indexed."
2.  **Screaming Frog SEO Spider:**
    *   Configure the crawl to **"Crawl configuration > Scope > Enable Scope"** and add your cluster's base URL (e.g., `https://authorityforge.com/systems/topical-clusters/`) to ensure you only crawl within that specific cluster.
    *   Run a full crawl.
    *   Export all internal HTML pages. This gives you a complete list of URLs, status codes, word counts, and internal links for your cluster.

Compare the GSC indexed pages with your Screaming Frog crawl. Look for discrepancies: pages you expect to be indexed but aren't, or pages indexed that shouldn't be part of the cluster.

## Map hub ownership

Intentional content clusters require clear ownership and purpose. This mapping step ensures every URL within your cluster serves a strategic goal and has a responsible party. It prevents content drift and ensures accountability for performance.

Create a simple spreadsheet or update an existing one for your content inventory. Include these columns:

| Column Header | Description | Example Entry |
|---|---|---|
| **URL** | The full URL of the content piece. | `/systems/topical-clusters/audit-guide/` |
| **Hub Name** | The name of the primary cluster this content belongs to. | `Topical Clusters` |
| **Primary Keyword** | The main target keyword for the content. | `weekly cluster audit` |
| **Owner** | The individual or team responsible for the content's performance. | `SEO Team A` |
| **Last Audit Date** | The last date this specific piece of content was reviewed. | `2023-10-26` |
| **Notes** | Any relevant observations or next steps for this URL. | `Update internal links from hub.` |

Populate this map with all URLs identified in your index coverage export that belong to the cluster. For each URL, confirm its hub, primary keyword, and assign an owner. If a URL doesn't clearly fit a cluster or lacks an owner, flag it for review in the next step.

## Kill or merge thin URLs

Thin or underperforming content within a cluster can dilute topical authority and waste crawl budget. This step focuses on identifying these pages and taking decisive action to consolidate value.

1.  **Identify Candidates:**
    *   **Low Traffic/Engagement:** Use Google Analytics (GA4) or your preferred analytics platform. Filter by your cluster's path (e.g., `/systems/topical-clusters/*`). Look for pages with consistently low traffic (e.g., <50 organic sessions/month) and high bounce rates (e.g., >80%) over the last 90 days.
    *   **Low Word Count:** Use your Screaming Frog export. Sort by word count. Pages under 300 words for informational content or under 100 words for product/service pages are often candidates for consolidation.
    *   **Duplicate Content:** Refer back to your GSC "Excluded" report for "Duplicate, submitted URL not selected as canonical" or "Duplicate, Google chose different canonical than user." These are prime candidates for merging or 301 redirects.

2.  **Decision Making:** For each identified URL, decide on the best action:

| Condition | Action | Rationale
