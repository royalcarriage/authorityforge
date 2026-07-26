/**
 * Pricing checkout enhancer.
 * Buttons carry data-plan="forge|agency". While Stripe env is absent the
 * server reports ready:false and buttons keep their href fallback (signup).
 * The moment AF_STRIPE_* env vars exist on Vercel, the same buttons start
 * real Stripe Checkout — no code change needed.
 */
(function () {
  var cfg = window.AF_CONFIG || {};
  var api = (cfg.apiBase || "") + "/api/checkout";
  var buttons = document.querySelectorAll("[data-plan]");
  if (!buttons.length) return;

  fetch(api)
    .then(function (r) { return r.json(); })
    .then(function (state) {
      if (!state || !state.ready) {
        document.documentElement.setAttribute("data-checkout", "pending");
        return;
      }
      document.documentElement.setAttribute("data-checkout", "ready");
      buttons.forEach(function (btn) {
        var plan = btn.getAttribute("data-plan");
        if (!state.plans || !state.plans[plan] || !state.plans[plan].priceConfigured) return;
        btn.addEventListener("click", function (ev) {
          ev.preventDefault();
          btn.setAttribute("aria-busy", "true");
          fetch(api, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ plan: plan }),
          })
            .then(function (r) { return r.json(); })
            .then(function (out) {
              if (out && out.ok && out.url) window.location.href = out.url;
              else btn.removeAttribute("aria-busy");
            })
            .catch(function () { btn.removeAttribute("aria-busy"); });
        });
      });
    })
    .catch(function () {
      document.documentElement.setAttribute("data-checkout", "error");
    });
})();
