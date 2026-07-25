/**
 * AuthorityForge affiliate link resolver
 * Links use data-aff="partnerKey" — filled from AF_CONFIG.AFFILIATES.
 * When a partner has no id yet, falls back to official site (still disclosed).
 */
(function () {
  var cfg = window.AF_CONFIG || {};
  var partners = cfg.AFFILIATES || {};

  function resolve(key) {
    var p = partners[key];
    if (!p) return null;
    if (p.enabled && p.url) return p;
    if (p.fallback) return { url: p.fallback, name: p.name, enabled: false };
    return p;
  }

  function enhance(a) {
    var key = a.getAttribute("data-aff");
    if (!key) return;
    var p = resolve(key);
    if (!p || !p.url) return;
    a.setAttribute("href", p.url);
    a.setAttribute("rel", "sponsored noopener noreferrer");
    a.setAttribute("target", "_blank");
    if (!a.getAttribute("data-aff-label") && p.name) {
      // keep existing text; optional title
      a.setAttribute("title", (p.enabled ? "Affiliate: " : "Partner: ") + p.name);
    }
    a.setAttribute("data-aff-ready", p.enabled ? "1" : "0");
  }

  function init() {
    document.querySelectorAll("a[data-aff]").forEach(enhance);
    document.documentElement.setAttribute(
      "data-aff-count",
      String(document.querySelectorAll("a[data-aff-ready]").length)
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
