---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-09-07"
slug: "weekly-cluster-audit-20260904"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

**Direct answer:** A weekly topical cluster audit is a repeatable operational process used to maintain site architecture, purge dead weight, and protect organic traffic. By dedicating one hour every seven days to review indexation, reassign orphan pages, prune unhelpful URLs, publish targeted commercial content, and track impression trends, you prevent keyword cannibalization and stop ranking decay.

## Export index coverage

Run this step every Monday morning using Google Search Console and Screaming Frog. 

Do not rely on guessing which URLs Google likes. Pull the exact data to find gaps between your sitemap and the live index.

1. Open Google Search Console.
2. Navigate to **Indexation > Pages**.
3. Click **Export** to download the complete table of indexed and excluded URLs as a CSV.
4. Open Screaming Frog SEO Spider.
5. Switch the mode to **List** mode via **Mode > List**.
6. Paste your entire published sitemap URLs or your GSC export into the upload window.
7. Run the crawl and export internal HTML pages with their HTTP status codes, indexability status, and canonical tags.
8. Merge the GSC export and the Screaming Frog crawl in Google Sheets using VLOOKUP or XLOOKUP matching the URL column.

Look for URLs marked as "Crawled - currently not indexed" or "Discovered - currently not indexed" in GSC that return a 200 OK status in Screaming Frog. If a page has been live for over 60 days with zero impressions and zero indexation, flag it for the pruning workflow.

## Map hub ownership

Topical authority breaks down when spokes drift away from their parent hub or when multiple pages target the exact same intent. 

Every spoke URL on your domain must point back to one primary category hub via an internal link, and that hub must link down to the spoke.

Open your internal link mapper or filter your Screaming Frog internal HTML report by directory path. Verify that every sub-folder follows this structural rule:

| Cluster Element | Target URL Structure | Minimum Inbound Links | Maximum Inbound Links |
| :--- | :--- | :--- | :--- |
| **Main Hub** | `/systems/topical-clusters/` | 10+ (from related spokes) | Unlimited |
| **Informational Spoke** | `/systems/topical-clusters/spoke-name/` | 1 (from hub) | 5 (from related spokes) |
| **Commercial Spoke** | `/systems/topical-clusters/best-tool/` | 2 (from hub + parent spoke) | 4 |

If an informational spoke has zero internal links pointing to it from its designated hub, add the link immediately. If a spoke links to three different hubs, rewrite the contextual links to establish a strict, single-parent hierarchy.

## Kill or merge thin URLs

Keeping low-quality URLs alive drains crawl budget and dilutes your domain's topical relevance. 

Audit every page that received fewer than 10 clicks over the last 90 days. Run this checklist for each underperforming URL:

- [ ] Does the page answer a unique search intent not covered elsewhere on the site?
- [ ] Has the page generated any affiliate clicks or ad revenue in the last 6 months?
- [ ] Is the word count below 500 words with no unique data, images, or expert commentary?
- [ ] Can this content be merged into a stronger, higher-ranking parent article?

If you check "No" to the first two questions and "Yes" to the last two, execute one of two actions:

1. **Merge:** Copy any unique paragraphs or formatting elements into the primary hub or a stronger spoke. Set up a permanent 301 redirect from the thin URL to the surviving URL.
2. **Delete:** If the URL has zero backlinks, zero traffic, and no consolidation value, return a 410 Gone status code and remove all internal links pointing to it.

## Add one commercial spoke

Informational hubs build topical authority, but commercial spokes capture transaction intent and generate revenue. 

Every week, publish one tightly scoped commercial page within an active cluster. Use this exact execution checklist:

- **Target Keyword:** Select a long-tail commercial term with a KD (Keyword Difficulty) under 30 based on your preferred SEO tool dataset.
- **Intent Match:** Ensure the format matches what currently ranks in the top three positions (e.g., comparison table, buyer's guide, or standalone product review).
- **First-Party Evidence:** Include at least one original screenshot, custom benchmark, or direct testing note to satisfy search engine helpfulness guidelines.
- **Monetization:** Insert a relevant affiliate link or product callout aligned with your disclosure policy.
- **Internal Linking:** Link the new commercial spoke directly from the cluster hub and from your highest-traffic informational spoke.

For example, if your hub is `/systems/topical-clusters/`, your commercial spoke for the week might target `/systems/topical-clusters/best-internal-link-checker/`.

## Measure impressions

Traffic metrics lag behind algorithmic changes. Impressions in Google Search Console are your earliest indicator that a cluster is gaining or losing momentum.

Set up a custom GSC report for each cluster folder using a regular expression filter:

1. Go to **Performance > Search Results**.
2. Click **New > Page**.
3. Select **Custom (regex)** and input your hub path, such as `^https://example\.com/systems/topical-clusters/`.
4. Set the date range to compare the last 7 days against the previous 7 days (or the previous 28 days for a macro view).
5. Sort the resulting table by **Impressions (Difference)**.

Look for two specific signals:
* **Impression Spikes:** Pages showing rising impressions mean your internal linking and content updates are working. Double down by adding a secondary supporting spoke to that sub-topic.
* **Impression Dips:** Pages showing consistent impression drops over three consecutive weekly audits require immediate action. Check for newly introduced keyword cannibalization, dropped backlinks, or fresh competitor content that outranks your current angle.

---

## Next step

To expand your editorial framework, return to the main hub at `/systems/topical-clusters/`. Review how commercial links are integrated by reading the `/legal/affiliate-disclosure/` page, and explore standard operating procedures on the `/blog/` index.
