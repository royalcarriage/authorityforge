/**
 * AuthorityForge site config
 * Dual host:
 *   - Vercel (authorityforge-tau.vercel.app) = PRIMARY app + APIs + demos
 *   - GitHub Pages (.../authorityforge/) = static mirror (basePath /authorityforge)
 * prepare-vercel rewrites siteUrl/basePath for the Vercel build.
 * AdSense client: ca-pub-1959018852581373
 */
window.AF_CONFIG = {
  siteUrl: "https://royalcarriage.github.io/authorityforge",
  githubPagesUrl: "https://royalcarriage.github.io/authorityforge",
  githubRepo: "https://github.com/royalcarriage/authorityforge",
  basePath: "/authorityforge",
  /** App API host — auth/dashboard always hit Vercel (GH Pages has no serverless). */
  apiBase: "https://authorityforge-tau.vercel.app",

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
   * Public money status (operator truth — update when streams change).
   * Agent pages and /systems/money/ mirror this.
   */
  MONEY: {
    adsense: {
      client: "ca-pub-1959018852581373",
      status: "getting_ready", // getting_ready | ready | rejected
      sites: [
        "royalcarriage.github.io",
        "authorityforge-tau.vercel.app",
      ],
      adsTxt: [
        "https://royalcarriage.github.io/ads.txt",
        "https://authorityforge-tau.vercel.app/ads.txt",
      ],
    },
    affiliates: {
      enabledCount: 0,
      targetMin: 3,
      applyHub: "/resources/affiliates/",
    },
    clients: {
      offerUrl: "/clients/",
      contactEmail: "royalcarriagelimollc@gmail.com",
    },
    products: {
      hub: "/products/",
      stripeEnv: "AF_STRIPE_SECRET_KEY",
      note: "Separate from Royal Carriage limo Stripe acct_1OV50…",
    },
    treasury: {
      autonomyLevel: 1,
      autoSpendCents: 0,
      policy: "agents/treasury/policy.json",
    },
  },

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
      apply: "",
      category: "seo",
      notes: "NO public affiliate program (closed 2019; invite-only). Keep fallback link for reader value — never expect commissions.",
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
      apply: "",
      category: "tech-seo",
      notes: "NO affiliate program exists (flat pricing, no reseller). Editorial link only.",
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
      apply: "",
      category: "ops",
      notes: "Program CLOSED to new applicants since ~Apr 2026 — do not waste an application; revisit if it reopens.",
    },
    amazon: {
      name: "Amazon Associates",
      enabled: false,
      url: "",
      fallback: "https://affiliate-program.amazon.com/",
      apply: "https://affiliate-program.amazon.com/",
      category: "general",
      notes: "Instant entry but auto-dropped without 3 sales in 180d; SaaS tools not sold there — books/gear only, secondary at best.",
    },
    /* Instant / near-instant approval additions (2026-07-26 research):
       these accept brand-new low-authority sites, all recurring SaaS. */
    systemeio: {
      name: "systeme.io",
      enabled: false,
      url: "",
      fallback: "https://systeme.io/",
      apply: "https://systeme.io/affiliate-program",
      category: "ops",
      notes: "NO approval gate — anyone joins free. 60% LIFETIME recurring, lifetime cookie, $30 payout. Highest approval×earnings.",
    },
    neuronwriter: {
      name: "NeuronWriter",
      enabled: false,
      url: "",
      fallback: "https://neuronwriter.com/",
      apply: "https://neuronwriter.com/contact/affiliates/",
      category: "seo",
      notes: "Self-activate in dashboard (effectively instant). 30% lifetime recurring, 60d cookie.",
    },
    rytr: {
      name: "Rytr",
      enabled: false,
      url: "",
      fallback: "https://rytr.me/",
      apply: "https://rytr.me/affiliates",
      category: "ai-writing",
      notes: "Fast low-bar approval. 30% recurring 12mo + $15 bonus, 60d cookie, $50 payout.",
    },
    getgenie: {
      name: "GetGenie AI",
      enabled: false,
      url: "",
      fallback: "https://getgenie.ai/",
      apply: "https://getgenie.ai/affiliate/",
      category: "seo",
      notes: "Self-serve, low friction; WP AI+SEO — in-niche. 30% recurring.",
    },
    koala: {
      name: "Koala AI",
      enabled: false,
      url: "",
      fallback: "https://koala.sh/",
      apply: "https://koala.sh/",
      category: "ai-writing",
      notes: "Few-day review, low bar. 30% recurring, PayPal.",
    },
  },
};
