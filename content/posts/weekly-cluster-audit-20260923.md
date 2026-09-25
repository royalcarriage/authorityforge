---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-09-25"
slug: "weekly-cluster-audit-20260923"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures your content hubs stay focused and monetizable by systematically identifying underperforming spokes, refining topical authority, and optimizing for search intent alignment. This repeatable process directly impacts organic traffic and conversions, keeping your content strategy sharp and productive.

## Export Index Coverage

Begin your weekly audit by pulling fresh index data from Google Search Console (GSC). This step identifies any new indexing issues or changes in coverage for your topical cluster. Focus on the "Pages" report under the "Indexing" section.

Apply a URL prefix filter to narrow the data to your specific hub. For example, if your hub lives at `/systems/topical-clusters/`, use this path in the filter. Export the data for both "Indexed" and "Not indexed" pages within this cluster.

Review the "Not indexed" pages for common issues:

*   **Discovered - currently not indexed:** Google knows about the page but hasn't crawled it yet, or chose not to. Check for internal linking issues or low-quality content.
*   **Crawled - currently not indexed:** Google crawled the page but decided not to index it. This often points to content quality problems, duplication, or lack of unique value.

Pay attention to URLs that suddenly drop from the "Indexed" report. This can indicate a technical problem, a change in Google's perception of the content, or an accidental `noindex` tag.

## Map Hub Ownership

Intentional content clusters require clear organization. Use a simple spreadsheet to map every URL within your cluster, ensuring each spoke has a defined purpose and parent hub. This mapping process clarifies content relationships and identifies orphaned pages.

Set up columns in your spreadsheet for the following data points:

*   **URL:** The full URL of the content piece.
*   **Primary Keyword:** The main keyword the page targets.
*   **Target Intent:** Informational, Navigational, Commercial, Transactional.
*   **Parent Hub URL:** The URL of the main hub page it supports.
*   **Current Status:** Live, Draft, Redirected (with target).
*   **Owner/Last Editor:** Who is responsible for this content?
*   **Last Audit Date:** When was this page last reviewed?

Go through each URL in your exported GSC data. For every indexed page within your cluster, verify its assigned hub and primary keyword. Identify any spokes that lack a clear parent hub or appear to be targeting the same keyword as another spoke, suggesting potential cannibalization.

Here's a comparison of mapping methods:

| Method                  | Pros                                   | Cons                                       |
| :---------------------- |
