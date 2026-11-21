const toggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('#nav');
function setMenuOpen(isOpen) {
  nav.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  toggle.textContent = isOpen ? '✕' : '☰';
}

toggle.addEventListener('click', () => setMenuOpen(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !nav.classList.contains('open')) return;
  setMenuOpen(false);
  toggle.focus();
});
const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

// Show each event player after its video metadata has loaded.
document.querySelectorAll('.event-video-shell').forEach(shell => {
  const video = shell.querySelector('video');
  if (!video) return;
  video.addEventListener('loadedmetadata', () => shell.classList.add('has-video'));
  video.addEventListener('error', () => shell.classList.remove('has-video'));
  video.load();
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && typeof Element.prototype.animate === 'function') {
  const entrances = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entrances.unobserve(entry.target);
      if (reducedMotion.matches) continue;
      entry.target.animate(
        [{ transform: 'translateY(12px)' }, { transform: 'translateY(0)' }],
        { duration: 380, easing: 'ease-out' }
      );
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('.project-card, .timeline-row, .case-gallery figure').forEach(item => entrances.observe(item));
}
