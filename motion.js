const hero = document.querySelector('.hero');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const films = new Map([
  film('#grelhador', '#motion-control'),
  film('#wrap-video', '#wrap-motion-control')
]);
let frame = 0;

function film(videoSelector, buttonSelector) {
  const video = document.querySelector(videoSelector);
  const button = document.querySelector(buttonSelector);
  const section = video.closest('section');
  const state = {video, button, visible: false, paused: false, ready: false};
  video.addEventListener('playing', () => {
    if (reduced.matches) return;
    video.classList.add('playing');
    button.hidden = false;
  });
  video.addEventListener('error', () => {
    video.classList.remove('playing');
    button.hidden = true;
  });
  button.addEventListener('click', () => {
    state.paused = !state.paused;
    button.textContent = state.paused ? 'Reproduzir vídeo' : 'Pausar vídeo';
    playback(state);
  });
  return [section, state];
}

function playback(state) {
  const {video, button, visible, paused, ready} = state;
  if (reduced.matches) {
    video.classList.remove('playing');
    button.hidden = true;
  } else {
    button.hidden = !video.classList.contains('playing');
  }
  if (!ready || !visible || paused || reduced.matches || document.hidden) {
    video.pause();
    return;
  }
  if (!video.hasAttribute('src')) video.src = video.dataset.src;
  video.play().catch(() => {});
}

function updateDepth() {
  frame = 0;
  const scroll = Math.max(0, -hero.getBoundingClientRect().top);
  hero.style.setProperty('--media-offset', `${scroll * 0.19}px`);
  hero.style.setProperty('--copy-offset', `${scroll * 0.055}px`);
}

function scheduleDepth() {
  if (!frame && films.get(hero).visible && !reduced.matches) frame = requestAnimationFrame(updateDepth);
}

const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    const state = films.get(entry.target);
    state.visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
    playback(state);
  }
  scheduleDepth();
}, {threshold: [0, 0.15]});

for (const [section, state] of films) {
  observer.observe(section);
  const poster = state.video.parentElement.querySelector('img');
  poster.decode().catch(() => {}).then(() => requestAnimationFrame(() => {
    state.ready = true;
    playback(state);
  }));
}

reduced.addEventListener('change', () => {
  for (const state of films.values()) {
    if (!reduced.matches && state.paused && state.video.readyState >= 2) state.video.classList.add('playing');
    playback(state);
  }
  scheduleDepth();
});
document.addEventListener('visibilitychange', () => films.forEach(playback));
addEventListener('scroll', scheduleDepth, {passive: true});
addEventListener('resize', scheduleDepth);
