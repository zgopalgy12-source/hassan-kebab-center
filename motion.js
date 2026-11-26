const hero = document.querySelector('.hero');
const video = document.querySelector('#grelhador');
const button = document.querySelector('#motion-control');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let visible = true;
let paused = false;
let frame = 0;

function updateDepth() {
  frame = 0;
  const scroll = Math.max(0, -hero.getBoundingClientRect().top);
  hero.style.setProperty('--media-offset', `${scroll * 0.19}px`);
  hero.style.setProperty('--copy-offset', `${scroll * 0.055}px`);
}

function scheduleDepth() {
  if (!frame && visible && !reduced.matches) frame = requestAnimationFrame(updateDepth);
}

function playback() {
  if (reduced.matches || paused || !visible) {
    video.pause();
    return;
  }
  if (!video.hasAttribute('src')) video.src = video.dataset.src;
  video.play().catch(() => {});
}

video.addEventListener('playing', () => {
  video.classList.add('playing');
  button.hidden = reduced.matches;
  button.textContent = 'Pausar vídeo';
});
video.addEventListener('error', () => {
  video.classList.remove('playing');
  button.hidden = true;
});
button.addEventListener('click', () => {
  paused = !paused;
  button.textContent = paused ? 'Reproduzir vídeo' : 'Pausar vídeo';
  playback();
});
reduced.addEventListener('change', () => {
  if (reduced.matches) video.classList.remove('playing');
  button.hidden = reduced.matches || !video.classList.contains('playing');
  playback();
  scheduleDepth();
});
new IntersectionObserver(([entry]) => {
  visible = entry.isIntersecting;
  playback();
  scheduleDepth();
}).observe(hero);
addEventListener('scroll', scheduleDepth, {passive: true});
addEventListener('resize', scheduleDepth);
