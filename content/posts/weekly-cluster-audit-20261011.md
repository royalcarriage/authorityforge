---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-10-14"
slug: "weekly-cluster-audit-20261011"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit involves exporting Google Search Console (GSC) index coverage, mapping hub ownership in a spreadsheet, identifying and merging thin URLs, adding a new commercial spoke, and tracking impression changes to maintain cluster relevance and monetization. This process ensures content aligns with user intent and search engine visibility.

## Export index coverage

The first step in your weekly cluster audit is to gather performance data directly from Google Search Console. This provides a baseline of how your cluster content is performing in search. Focus on the specific cluster you are auditing.

**Exact Steps:**
1.  Navigate to Google Search Console for your property.
2.  Select "Performance" from the left-hand menu, then "Search results."
3.  Set the date range to "Last 7 days" and compare it to "Previous period" to observe week-over-week changes. For a broader view, you can also check "Last 28 days."
4.  Apply a "Page" filter. Use a URL prefix or regex to target your cluster. For example, if your hub path is `/systems/topical-clusters/`, filter by `URL contains: /systems/topical-clusters/`.
5.  Ensure the "Pages" tab is selected.
6.  Export the data. Choose "Google Sheets" for easier manipulation or "CSV" for local processing.

**Checklist:**
- [x] Go to GSC Performance report.
- [x] Set date range to "Last 7 days" (compare to previous period).
- [x] Filter pages by your cluster path (e.g., `/systems/topical-clusters/`).
- [x] Export data to Google Sheets.
- [x] Sort by Impressions (descending) and Clicks (descending) in your spreadsheet.

Once exported, examine pages with very low impressions (e.g., fewer than 5 per week) as potential candidates for review. Also, identify pages with high impressions but low click-through rates (CTR) for optimization opportunities.

## Map hub ownership

With your GSC data in hand, create or update a master spreadsheet
