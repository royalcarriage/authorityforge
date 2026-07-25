#!/usr/bin/env node
/**
 * Scaffold money OS + client-ready pages for AuthorityForge.
 * Zero paid LLM. Static HTML via pageShell.
 */
import {
  BASE,
  SITE,
  NAME,
  pageShell,
  write,
  prefixBodyLinks,
  today,
} from "./lib.mjs";

const d = today();

function page(path, title, description, body, schemaExtra) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE}${path}`,
    dateModified: d,
    isPartOf: { "@type": "WebSite", name: NAME, url: SITE },
    ...schemaExtra,
  };
  const html = pageShell({
    title: `${title} | ${NAME}`,
    description,
    path,
    schema,
    body: prefixBodyLinks(body),
  });
  write(`${path.replace(/^\//, "")}index.html`.replace("//", "/"), html);
  console.log("wrote", path);
}

// ── Money OS ──────────────────────────────────────────────────────────
page(
  "/systems/money/",
  "Money OS — Affiliates, AdSense & Treasury",
  "How AuthorityForge makes money: affiliate stack, AdSense pending review, treasury policy, and operator checklist.",
  `
  <header class="page-hero"><div class="wrap prose">
    <p class="kicker">Systems · Monetization</p>
    <h1>Money OS</h1>
    <p><strong>Direct answer:</strong> AuthorityForge earns in two live streams — <strong>disclosed tool affiliates</strong> (Phase 1) and <strong>Google AdSense</strong> (Phase 2, site review pending) — with a treasury that never auto-sends money or email.</p>
  </div></header>
  <section class="section"><div class="wrap">
    <div class="grid-3">
      <article class="card">
        <h3>1 · Affiliates</h3>
        <p>SEO + AI writing tools. Apply → paste tracking URL in <code>js/config.js</code> → CTAs auto-upgrade via <code>data-aff</code>.</p>
        <p class="meta"><a href="${BASE}/resources/affiliates/">Programs →</a></p>
      </article>
      <article class="card">
        <h3>2 · AdSense</h3>
        <p>Publisher <code>ca-pub-1959018852581373</code>. Sites in review (Getting ready). ads.txt live on GH Pages root + Vercel.</p>
        <p class="meta"><a href="${BASE}/resources/adsense-apply/">Status guide →</a></p>
      </article>
      <article class="card">
        <h3>3 · Treasury</h3>
        <p>Ledger + approval-queue only. No auto wires. Reinvest proposals when balance clears policy floors.</p>
        <p class="meta"><a href="${BASE}/company/">Company HQ →</a></p>
      </article>
      <article class="card">
        <h3>4 · Client systems</h3>
        <p>Paid work: build the same OS for client brands (clusters, measurement, monetization wiring).</p>
        <p class="meta"><a href="${BASE}/clients/">Client offer →</a></p>
      </article>
      <article class="card">
        <h3>5 · Products</h3>
        <p>Templates, checklists, and stack packs that route traffic into affiliates.</p>
        <p class="meta"><a href="${BASE}/products/">Shop / free packs →</a></p>
      </article>
      <article class="card">
        <h3>6 · Content engine</h3>
        <p>GitHub Actions + Gemini free publish commercial posts that feed ad + affiliate intent.</p>
        <p class="meta"><a href="${BASE}/blog/">Blog cluster →</a></p>
      </article>
    </div>
  </div></section>
  <section class="section"><div class="wrap prose">
    <h2>Live revenue plumbing</h2>
    <table>
      <thead><tr><th>Pipe</th><th>Status</th><th>Where configured</th></tr></thead>
      <tbody>
        <tr><td>AdSense script</td><td>Live on pages</td><td><code>ca-pub-1959018852581373</code></td></tr>
        <tr><td>ads.txt</td><td>Live</td><td>github.io root + vercel.app root</td></tr>
        <tr><td>Affiliate resolver</td><td>Live</td><td><code>js/config.js</code> + <code>js/affiliates.js</code></td></tr>
        <tr><td>Partner IDs</td><td>Operator gate</td><td>Enable after each program approves you</td></tr>
        <tr><td>Stripe (AF products)</td><td>Optional</td><td><code>AF_STRIPE_*</code> — separate from Royal Carriage limo Stripe</td></tr>
        <tr><td>Auto money move</td><td>Blocked</td><td>Hard rule · approval-queue only</td></tr>
      </tbody>
    </table>
    <h2>Weekly money loop</h2>
    <ol>
      <li>Publish 1–2 commercial posts (pipeline / CEO cycle).</li>
      <li>Enable any newly approved affiliate IDs in config.</li>
      <li>Check AdSense Sites status (Getting ready → Ready).</li>
      <li>Log payouts in treasury ledger when cash hits bank.</li>
      <li>Queue reinvestment only after policy + human OK.</li>
    </ol>
    <div class="cta-band">
      <p><strong>Operator:</strong> apply to programs → <a class="btn btn-sm" href="${BASE}/resources/affiliates/">Affiliate list</a>
      · <a class="btn btn-sm btn-outline" href="${BASE}/clients/">Offer systems to clients</a></p>
    </div>
  </div></section>
`
);

// ── Clients ───────────────────────────────────────────────────────────
page(
  "/clients/",
  "Client Systems — Authority OS for Brands",
  "Hire AuthorityForge patterns: topical clusters, measurement loops, affiliate + AdSense wiring, agent content ops for client sites.",
  `
  <header class="page-hero"><div class="wrap prose">
    <p class="kicker">Clients · Systems delivery</p>
    <h1>We build ranking &amp; revenue systems for client sites</h1>
    <p><strong>Direct answer:</strong> AuthorityForge is the living demo. Clients get the same stack — hub/spoke architecture, commercial pages, disclosure-safe monetization, and agent-assisted publishing — under their brand.</p>
  </div></header>
  <section class="section"><div class="wrap grid-3">
    <article class="card">
      <h3>Cluster build</h3>
      <p>Keyword map → hub + 12–40 spokes, internal links, schema, sitemap.</p>
      <div class="meta">Delivery 2–4 weeks</div>
    </article>
    <article class="card">
      <h3>Money wiring</h3>
      <p>Affiliate disclosures, ads.txt, AdSense readiness, commercial compare pages.</p>
      <div class="meta">Compliance-first</div>
    </article>
    <article class="card">
      <h3>Agent ops</h3>
      <p>Content queue, publish pipeline, measurement loop playbook for their team.</p>
      <div class="meta">Train + handoff</div>
    </article>
  </div></section>
  <section class="section"><div class="wrap prose">
    <h2>Who this is for</h2>
    <ul>
      <li>SaaS / AI tool brands that need topical authority without spammy pSEO.</li>
      <li>Affiliate operators who want systems, not random posts.</li>
      <li>Agencies that need a white-label authority engine.</li>
    </ul>
    <h2>What you get</h2>
    <ol>
      <li>Architecture doc (intents, hubs, monetization map).</li>
      <li>Live pages on your host (or GH Pages / Vercel like this demo).</li>
      <li>Operator runbook: queue, publish, measure, reinvest.</li>
      <li>Hard rules: disclosure on, no fake ratings, no click fraud.</li>
    </ol>
    <h2>Start a project</h2>
    <p>Email <a href="mailto:royalcarriagelimollc@gmail.com?subject=AuthorityForge%20client%20systems">royalcarriagelimollc@gmail.com</a> with:</p>
    <ul>
      <li>Site URL + niche</li>
      <li>Goal (rankings, affiliates, AdSense, or all three)</li>
      <li>Budget band and timeline</li>
    </ul>
    <p class="muted">No auto-replies from agents. A human reviews every client request.</p>
    <div class="cta-band">
      <a class="btn" href="mailto:royalcarriagelimollc@gmail.com?subject=AuthorityForge%20client%20systems">Email to start</a>
      <a class="btn btn-outline" href="${BASE}/systems/money/">See money OS</a>
      <a class="btn btn-outline" href="${BASE}/company/">Company HQ</a>
    </div>
  </div></section>
`,
  {
    "@type": "Service",
    provider: { "@type": "Organization", name: NAME, url: SITE },
    serviceType: "SEO systems and content architecture",
    areaServed: "Worldwide",
  }
);

// ── Products ──────────────────────────────────────────────────────────
page(
  "/products/",
  "Products & Packs — Templates that Feed Revenue",
  "Free and paid AuthorityForge packs: cluster templates, monetization checklists, and tool stacks with disclosed affiliate CTAs.",
  `
  <header class="page-hero"><div class="wrap prose">
    <p class="kicker">Products · Lead gen + affiliates</p>
    <h1>Products &amp; packs</h1>
    <p><strong>Direct answer:</strong> Free packs prove the system; commercial tool pages and affiliates pay. Paid Stripe products turn on when <code>AF_STRIPE_*</code> is configured — never on Royal Carriage limo Stripe.</p>
  </div></header>
  <section class="section"><div class="wrap grid-3">
    <article class="card">
      <h3>Free · Cluster starter</h3>
      <p>Hub/spoke worksheet + internal link rules. No email gate required — open on-site.</p>
      <p><a class="btn btn-sm" href="${BASE}/resources/templates/">Open templates</a></p>
    </article>
    <article class="card">
      <h3>Free · Monetization checklist</h3>
      <p>AdSense + affiliates + disclosure checklist used on this site.</p>
      <p><a class="btn btn-sm" href="${BASE}/resources/checklists/">Open checklists</a></p>
    </article>
    <article class="card">
      <h3>Free · Affiliate stack map</h3>
      <p>Programs list with apply links and config keys.</p>
      <p><a class="btn btn-sm" href="${BASE}/resources/affiliates/">Programs</a></p>
    </article>
    <article class="card">
      <h3>Stack · Indie SEO</h3>
      <p>Tool stack for solo operators — pairs with Semrush/Ahrefs/Surfer research.</p>
      <p>
        <a class="btn btn-sm" href="${BASE}/stacks/indie-seo-stack/">Read stack</a>
        <a class="btn btn-sm btn-outline" href="#" data-aff="semrush">Semrush</a>
      </p>
    </article>
    <article class="card">
      <h3>Stack · AI content ops</h3>
      <p>Draft → edit gate → publish. AI writers + brief tools.</p>
      <p>
        <a class="btn btn-sm" href="${BASE}/stacks/ai-native-content-stack/">Read stack</a>
        <a class="btn btn-sm btn-outline" href="#" data-aff="jasper">Jasper</a>
      </p>
    </article>
    <article class="card">
      <h3>Paid · Custom OS (Stripe)</h3>
      <p>Client systems build. Quote by email until Payment Links go live.</p>
      <p><a class="btn btn-sm" href="${BASE}/clients/">Client path</a></p>
    </article>
  </div></section>
  <section class="section"><div class="wrap prose">
    <h2>How products make money</h2>
    <ol>
      <li>Free packs attract operators searching for systems.</li>
      <li>Commercial tool / compare pages convert with disclosed affiliates.</li>
      <li>AdSense fills residual inventory after approval.</li>
      <li>Client builds are high-ticket offline (email → proposal → invoice).</li>
    </ol>
    <div class="cta-band partner-cta">
      <p><strong>Tool partners</strong> (affiliate when IDs live):
        <a href="#" data-aff="semrush">Semrush</a> ·
        <a href="#" data-aff="ahrefs">Ahrefs</a> ·
        <a href="#" data-aff="surfer">Surfer</a> ·
        <a href="#" data-aff="jasper">Jasper</a>
      </p>
    </div>
  </div></section>
`
);

// ── Commercial compares ───────────────────────────────────────────────
page(
  "/compare/semrush-vs-ahrefs/",
  "Semrush vs Ahrefs for Content Sites (2026)",
  "Criteria-first comparison of Semrush and Ahrefs for content and affiliate operators — when to pick each, disclosed partner links.",
  `
  <header class="page-hero"><div class="wrap prose">
    <p class="kicker">Compare · Commercial</p>
    <h1>Semrush vs Ahrefs for content sites</h1>
    <p><strong>Direct answer:</strong> Pick <strong>one primary suite</strong>. Semrush often wins multi-channel marketing stacks; Ahrefs often wins pure link + keyword research depth. Run both only if budget is soft.</p>
  </div></header>
  <section class="section"><div class="wrap prose">
    <h2>Jobs to be done</h2>
    <ul>
      <li>Keyword discovery for hubs and spokes</li>
      <li>Competitor content gap analysis</li>
      <li>Backlink prospecting</li>
      <li>Tracking positions for money pages</li>
    </ul>
    <h2>Quick criteria table</h2>
    <table>
      <thead><tr><th>Need</th><th>Lean Semrush</th><th>Lean Ahrefs</th></tr></thead>
      <tbody>
        <tr><td>Keyword + content toolkit in one UI</td><td>Strong</td><td>Good</td></tr>
        <tr><td>Backlink index exploration</td><td>Good</td><td>Strong</td></tr>
        <tr><td>Site audit for technical SEO</td><td>Strong</td><td>Good</td></tr>
        <tr><td>Affiliate / content site focus</td><td>Either</td><td>Either</td></tr>
      </tbody>
    </table>
    <h2>AuthorityForge recommendation</h2>
    <p>Start with the suite you will open weekly. Depth beats dual subscriptions. Pair either with the <a href="${BASE}/systems/measurement-loops/">measurement loop</a> and GSC (free).</p>
    <div class="cta-band partner-cta">
      <p><strong>Explore partners</strong> (disclosed):
        <a class="btn btn-sm" href="#" data-aff="semrush">Semrush</a>
        <a class="btn btn-sm" href="#" data-aff="ahrefs">Ahrefs</a>
        <a class="btn btn-sm btn-outline" href="${BASE}/blog/semrush-vs-ahrefs-for-content-sites/">Long-form post</a>
      </p>
    </div>
  </div></section>
`
);

page(
  "/compare/jasper-vs-copy-ai/",
  "Jasper vs Copy.ai for SEO Content Ops",
  "Compare Jasper and Copy.ai for SEO draft workflows — criteria, edit gates, and disclosed affiliate CTAs.",
  `
  <header class="page-hero"><div class="wrap prose">
    <p class="kicker">Compare · AI writing</p>
    <h1>Jasper vs Copy.ai for SEO ops</h1>
    <p><strong>Direct answer:</strong> Both can accelerate outlines and first drafts. Neither should publish unreviewed SEO pages. Choose by workflow fit (brand voice library vs agent workflows), then enforce an edit gate.</p>
  </div></header>
  <section class="section"><div class="wrap prose">
    <h2>Evaluation criteria</h2>
    <ol>
      <li>Can it follow a cluster brief with H2 ownership?</li>
      <li>Does it invent citations?</li>
      <li>Can you template disclosures and CTAs?</li>
      <li>Export quality for static HTML / CMS?</li>
    </ol>
    <h2>How we use AI writers here</h2>
    <p>AuthorityForge pipeline uses free LLMs for drafts, then structure checks. Product links stay disclosed. See <a href="${BASE}/tools/ai-writing-assistants/">AI writing assistants</a>.</p>
    <div class="cta-band partner-cta">
      <a class="btn btn-sm" href="#" data-aff="jasper">Jasper</a>
      <a class="btn btn-sm" href="#" data-aff="copyai">Copy.ai</a>
      <a class="btn btn-sm" href="#" data-aff="frase">Frase</a>
      <a class="btn btn-sm btn-outline" href="${BASE}/resources/affiliates/">All programs</a>
    </div>
  </div></section>
`
);

// ── Operator money dashboard (static status board) ────────────────────
page(
  "/resources/money-dashboard/",
  "Operator Money Dashboard",
  "Status board for AuthorityForge monetization: affiliates to enable, AdSense review, treasury rules, next actions.",
  `
  <header class="page-hero"><div class="wrap prose">
    <p class="kicker">Operator only · Public status</p>
    <h1>Money dashboard</h1>
    <p>Single page for what is live vs what only the owner can unlock (KYC, affiliate approvals, bank).</p>
  </div></header>
  <section class="section"><div class="wrap prose">
    <h2>Stream status</h2>
    <table>
      <thead><tr><th>Stream</th><th>State</th><th>Next action</th></tr></thead>
      <tbody>
        <tr><td>AdSense ca-pub-1959018852581373</td><td>Getting ready / review</td><td>Wait · do not click own ads</td></tr>
        <tr><td>Affiliates (config)</td><td>Resolver live · IDs off</td><td>Apply + enable 3+ programs</td></tr>
        <tr><td>Content commercial cluster</td><td>Live</td><td>Publish queue weekly</td></tr>
        <tr><td>Client systems</td><td>Offer live</td><td>Reply to inbound email</td></tr>
        <tr><td>AF Stripe products</td><td>Optional</td><td>Add AF_STRIPE_* when ready</td></tr>
        <tr><td>Treasury auto-spend</td><td>Level 1 propose only</td><td>Keep maxAutoSpend = 0</td></tr>
      </tbody>
    </table>
    <h2>Enable an affiliate in 4 steps</h2>
    <ol>
      <li>Apply at <a href="${BASE}/resources/affiliates/">/resources/affiliates/</a>.</li>
      <li>Copy tracking URL when approved.</li>
      <li>Set in <code>js/config.js</code>: <code>enabled: true</code>, <code>url: "…"</code>.</li>
      <li>Push <code>main</code> — all <code>data-aff</code> CTAs update.</li>
    </ol>
    <div class="cta-band">
      <a class="btn" href="${BASE}/systems/money/">Money OS</a>
      <a class="btn btn-outline" href="${BASE}/resources/affiliates/">Programs</a>
      <a class="btn btn-outline" href="${BASE}/company/">HQ</a>
    </div>
  </div></section>
`
);

console.log("scaffold complete", d);
