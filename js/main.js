// GitHub Pages project-site path prefix support
(function () {
  if (!location.hostname.endsWith("github.io")) return;
  var m = location.pathname.match(/^\/([^/]+)\//);
  if (!m || m[1] !== "authorityforge") return;
  var base = "/authorityforge";
  document.querySelectorAll('a[href^="/"]').forEach(function (a) {
    var h = a.getAttribute("href");
    if (h && h.indexOf(base) !== 0 && h.indexOf("//") !== 0) a.setAttribute("href", base + h);
  });
  document.querySelectorAll('link[href^="/"], script[src^="/"]').forEach(function (el) {
    var attr = el.hasAttribute("href") ? "href" : "src";
    var v = el.getAttribute(attr);
    if (v && v.indexOf(base) !== 0) el.setAttribute(attr, base + v);
  });
})();

(() => {
  // Active nav already server-rendered; enhance external links + copy year safety
  document.querySelectorAll('a[href^="http"]').forEach((a) => {
    try {
      const u = new URL(a.href);
      if (u.hostname !== location.hostname) {
        a.setAttribute('rel', 'noopener noreferrer');
        a.setAttribute('target', '_blank');
      }
    } catch (_) {}
  });

  // Simple TOC highlight optional
  const headings = [...document.querySelectorAll('.prose h2[id]')];
  if (!headings.length || !('IntersectionObserver' in window)) return;
  const map = new Map(headings.map((h) => [h.id, document.querySelector(`a[href="#${h.id}"]`)]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const link = map.get(e.target.id);
      if (!link) return;
      if (e.isIntersecting) link.classList.add('is-active');
      else link.classList.remove('is-active');
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  headings.forEach((h) => io.observe(h));
})();
