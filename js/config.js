/**
 * AuthorityForge site config
 * Set ADSENSE_CLIENT after Google AdSense approval (format: ca-pub-xxxxxxxxxxxxxxxx)
 * Keep ADS_ENABLED false until approved and policy pages are live.
 */
window.AF_CONFIG = {
  siteUrl: "https://authorityforge-tau.vercel.app",
  githubPagesUrl: "https://royalcarriage.github.io/authorityforge",
  githubRepo: "https://github.com/royalcarriage/authorityforge",
  /** Replace after AdSense approval */
  ADSENSE_CLIENT: "", // e.g. "ca-pub-1234567890123456"
  /** Master switch — only true after AdSense account approved */
  ADS_ENABLED: false,
  /** Slot IDs from AdSense UI (optional until created) */
  ADS_SLOTS: {
    displayTop: "",
    displayInArticle: "",
    displaySidebar: "",
  },
  monetizationPhase: 1, // 1 affiliates, 2 adsense
};
