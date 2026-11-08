---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-11-08"
slug: "weekly-cluster-audit-20261105"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures your content hubs and spokes remain focused, indexed, and aligned with monetization goals by systematically reviewing their performance, relevance, and structure. This repeatable process helps maintain content quality, improves organic visibility, and prevents content decay, directly impacting your site's authority and revenue potential.

## Export index coverage

Start by identifying any cluster pages experiencing indexing issues. Pages that Google isn't indexing cannot generate traffic or contribute to your topical authority. This initial step flags potential technical problems or content quality issues requiring immediate attention.

Use Google Search Console (GSC) for this. Navigate to `Indexing > Pages`.
Filter by:
*   **"Excluded by 'noindex' tag":** These pages are intentionally blocked. Verify if the `noindex` tag is appropriate for these URLs within your cluster.
*   **"Blocked by robots.txt":** Similar to `noindex`, but via `robots.txt`. Confirm if these blocks are intentional for your cluster pages.
*   **"Crawled - currently not indexed":** Google found these pages but chose not to index them, often indicating low quality or duplication. These are prime candidates for the "Kill or merge" step.

Export the full list of excluded URLs. Review each URL against your cluster plan. For example, if your `/systems/topical-clusters/` hub contains a page like `/systems/topical-clusters/old-ai-tool-list/` that is "Crawled - currently not indexed," it's a candidate for removal
