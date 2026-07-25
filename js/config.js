/**
 * AuthorityForge site config
 * Canonical host: GitHub Pages (Vercel stub not used until full redeploy)
 * AdSense client: ca-pub-1959018852581373
 */
window.AF_CONFIG = {
  siteUrl: "https://royalcarriage.github.io/authorityforge",
  githubPagesUrl: "https://royalcarriage.github.io/authorityforge",
  githubRepo: "https://github.com/royalcarriage/authorityforge",
  basePath: "/authorityforge",

  /** Google AdSense */
  ADSENSE_CLIENT: "ca-pub-1959018852581373",
  ADS_ENABLED: true,
  ADS_SLOTS: {
    displayTop: "",
    displayInArticle: "",
    displaySidebar: "",
  },

  /** 1 = affiliates only · 2 = affiliates + AdSense */
  monetizationPhase: 2,

  /**
   * Affiliate partners — set enabled:true + url with YOUR tracking ID after signup.
   * Apply links live on /resources/affiliates/
   * Never invent commission claims; disclose on every page.
   */
  AFFILIATES: {
    semrush: {
      name: "Semrush",
      enabled: false,
      url: "",
      fallback: "https://www.semrush.com/",
      apply: "https://www.semrush.com/affiliate-program/",
      category: "seo",
      notes: "Impact / first-party affiliate — strong fit for keyword + competitive pages",
    },
    ahrefs: {
      name: "Ahrefs",
      enabled: false,
      url: "",
      fallback: "https://ahrefs.com/",
      apply: "https://ahrefs.com/affiliate-program",
      category: "seo",
      notes: "Backlinks + keywords; high intent commercial cluster",
    },
    surfer: {
      name: "Surfer SEO",
      enabled: false,
      url: "",
      fallback: "https://surferseo.com/",
      apply: "https://surferseo.com/affiliates/",
      category: "seo",
      notes: "Content briefs + on-page scoring",
    },
    jasper: {
      name: "Jasper",
      enabled: false,
      url: "",
      fallback: "https://www.jasper.ai/",
      apply: "https://www.jasper.ai/partners",
      category: "ai-writing",
      notes: "AI writing assistant — pair with edit-gate messaging",
    },
    copyai: {
      name: "Copy.ai",
      enabled: false,
      url: "",
      fallback: "https://www.copy.ai/",
      apply: "https://www.copy.ai/partners",
      category: "ai-writing",
      notes: "Workflow-oriented AI writing",
    },
    frase: {
      name: "Frase",
      enabled: false,
      url: "",
      fallback: "https://www.frase.io/",
      apply: "https://www.frase.io/affiliates/",
      category: "ai-writing",
      notes: "Research + brief tooling for clusters",
    },
    writesonic: {
      name: "Writesonic",
      enabled: false,
      url: "",
      fallback: "https://writesonic.com/",
      apply: "https://writesonic.com/affiliates",
      category: "ai-writing",
      notes: "AI drafts + SEO modes",
    },
    screamingfrog: {
      name: "Screaming Frog",
      enabled: false,
      url: "",
      fallback: "https://www.screamingfrog.co.uk/seo-spider/",
      apply: "https://www.screamingfrog.co.uk/affiliate/",
      category: "tech-seo",
      notes: "Crawler — technical excellence system pages",
    },
    cloudways: {
      name: "Cloudways",
      enabled: false,
      url: "",
      fallback: "https://www.cloudways.com/",
      apply: "https://www.cloudways.com/en/affiliate",
      category: "hosting",
      notes: "Hosting for indie SEO stacks",
    },
    notion: {
      name: "Notion",
      enabled: false,
      url: "",
      fallback: "https://www.notion.so/",
      apply: "https://www.notion.so/affiliates",
      category: "ops",
      notes: "Content ops / agent runbooks",
    },
    amazon: {
      name: "Amazon Associates",
      enabled: false,
      url: "",
      fallback: "https://affiliate-program.amazon.com/",
      apply: "https://affiliate-program.amazon.com/",
      category: "general",
      notes: "Books / gear only when relevant; tag required",
    },
  },
};
