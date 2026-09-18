---
title: "Weekly Cluster Audit Checklist for Content Sites"
description: "A repeatable weekly audit so hubs and spokes stay intentional and monetizable."
date: "2026-09-18"
slug: "weekly-cluster-audit-20260916"
tags: ["seo", "clusters", "ops"]
hub: "/systems/topical-clusters/"
status: published
source: content-pipeline
llm_provider: "gemini"
llm_cost_usd: 0
zero_cost_mode: true
---

A weekly cluster audit ensures your content hubs and spokes remain optimized for search engines and user intent by regularly pruning underperforming pages, reinforcing commercial intent, and tracking key performance indicators directly tied to organic traffic and conversions. This process maintains cluster integrity and monetizability.

## Export Index Coverage

Begin your weekly audit by pulling current index data directly from Google Search Console (GSC). This provides a baseline understanding of what Google has indexed from your site. Focus on pages within your topical clusters.

Navigate to GSC > Index > Pages. Filter the status to "Indexed" and also review "Discovered - currently not indexed" and "Crawled - currently not indexed." Export this data as a CSV. This export shows which cluster pages are present in Google's index and which ones are struggling to be included.

Next, run a fresh crawl of your site using a tool like Screaming Frog or Sitebulb. Configure the crawler to extract internal links and response codes. Compare this crawl data against your GSC export. Look for URLs that are in your sitemap but not indexed, or URLs indexed by Google that are not in your sitemap.

This step helps identify indexing issues specific to your cluster content. For instance, if a core spoke page isn't indexed, it cannot contribute to the hub's authority. Likewise, if old, irrelevant pages are still indexed, they can dilute your cluster's focus.

## Map Hub Ownership

Maintain a live document that clearly maps each hub to its corresponding spokes and defines its commercial intent. This document acts as your central cluster inventory. Use a spreadsheet or a dedicated content planning tool.

For each hub, list its primary URL. Underneath, enumerate all associated spoke URLs. Assign a commercial intent rating to each spoke: "High" for pages directly leading to conversions (e.g., product reviews, service pages), "Medium" for pages with clear indirect commercial value (e.g., comparison guides), and "Low" for purely informational content.

An example entry might look like this:

*   **Hub URL:** `/systems/topical-clusters/`
*   **Spoke 1 URL:** `/systems/topical-clusters/cluster-audits/` (Intent: Medium)
*   **Spoke 2 URL:** `/systems/topical-clusters/content-briefs-ai/` (Intent: High)
*   **Spoke 3 URL:** `/systems/topical-clusters/seo-content-planning/` (Intent: Medium)

This mapping ensures every piece of content within a cluster serves a purpose. It also highlights where commercial gaps or excesses might exist. Review this map weekly against your new content plan and any changes to existing pages.

When updating your cluster map, consider how you identify new spokes.

| Method           | Criteria                                                     | Best Use Case                                        |
| :--------------- | :----------------------------------------------------------- | :--------------------------------------------------- |
| **Manual Review** | In-depth understanding of user journey and content gaps.     | For strategic, high-value spokes with clear intent.  |
| **AI Suggestion** | Identifies related entities and questions from existing content. | For expanding informational coverage rapidly.        |

Manual review ensures precise alignment with your business goals, while AI tools can accelerate the discovery of related sub-topics that can become new spokes.

## Kill or Merge Thin URLs

Identify and address underperforming or thin content within your clusters. These pages consume crawl budget, dilute authority, and offer poor user experience.

Access GSC > Performance > Pages. Filter the date range to the last 90 days. Sort by "Impressions" (lowest first) and "Clicks" (lowest first). Look for cluster pages with very low or zero impressions and clicks.

Consider a page "thin" if it meets any of these criteria:
*   Less than 300 words of unique content.
*   Zero organic clicks in the last 90 days.
*   Offers no unique value compared to other pages in the cluster.
*   Has a high duplicate content score (e.g., >70% similarity with another page as measured by a tool like SurferSEO or Copyscape).

Once identified, decide whether to kill (delete with a 301 redirect) or merge the content.

| Action   | Criteria                                                     | Implementation                                       |
| :------- | :----------------------------------------------------------- | :--------------------------------------------------- |
| **Kill** | No unique value, very low quality, no internal links pointing to it. | Delete the page, implement a 301 redirect to the most relevant hub or spoke page. |
| **Merge** | Content has some value but is too short or covers a similar topic to another. | Combine content into a stronger, existing spoke or hub page. Redirect the old URL. |

Always implement a 301 redirect from the old URL to the most relevant, higher-performing page in your cluster. This preserves any existing link equity and guides users and search engines to better content. Track these changes in your cluster map.

## Add One Commercial Spoke

To ensure your clusters remain monetizable, commit to adding at least one new commercial spoke each week. This keeps your clusters aligned with business objectives and introduces fresh opportunities for conversion.

Start by reviewing your cluster map for commercial intent gaps. Are there common product-related queries or service-specific problems that your existing content doesn't address directly? Use keyword research tools (e.g., Ahrefs, Semrush) to find commercial keywords related to your hub. Look for terms like "best [product type]", "[service] pricing", "[brand] alternatives", or "how to fix [problem] with [solution]".

For example, if your hub is "AI tools for SEO," a new commercial spoke could be "Best AI Content Brief Generators" or "AI Keyword Research Software for Agencies."

Once you identify a target keyword and topic, create a content brief for the new spoke. This brief should include:
1.  **Target Keyword:** e.g., "best AI content brief generators"
2.  **Primary Persona:** e.g., "SEO content manager"
3.  **Commercial CTA:** e.g., "Try our AI Content Brief Generator"
4.  **Internal Link Opportunities:** List existing hub and spoke pages that can link to this new commercial spoke.
5.  **Competitor Analysis:** Identify 2-3 top-ranking pages for the target keyword.

This structured approach ensures the new spoke is intentional, commercially focused, and integrated into your existing cluster architecture. Publish the content and ensure it's internally linked from relevant hub and spoke pages.

## Measure Impressions

Weekly monitoring of impressions provides an early indicator of your cluster's visibility in search results. A decline in impressions for a
