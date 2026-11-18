const toggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('#nav');
toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  toggle.textContent = isOpen ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
  toggle.textContent = '☰';
}));
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
