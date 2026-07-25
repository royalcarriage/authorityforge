(() => {
  document.querySelectorAll('a[href^="http"]').forEach((a) => {
    try {
      const u = new URL(a.href);
      if (u.hostname !== location.hostname) {
        a.setAttribute('rel', 'noopener noreferrer');
        a.setAttribute('target', '_blank');
      }
    } catch (_) {}
  });
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
