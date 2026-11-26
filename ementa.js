const filters = document.querySelector('.filters');
const cards = Array.from(document.querySelectorAll('.dish'));
const status = document.querySelector('#filter-status');
const dialog = document.querySelector('#lightbox');
const photo = dialog.querySelector('#lightbox-photo');
const title = dialog.querySelector('#lightbox-title');
const count = dialog.querySelector('#lightbox-count');
const steps = dialog.querySelectorAll('[data-step]');
let visibleCards = cards;
let current = 0;
let opener;

filters.hidden = false;
filters.addEventListener('click', event => {
  const filter = event.target.closest('[data-filter]');
  if (!filter) return;
  for (const button of filters.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', button === filter);
  }
  for (const card of cards) {
    card.hidden = filter.dataset.filter !== 'tudo' && card.dataset.category !== filter.dataset.filter;
  }
  visibleCards = cards.filter(card => !card.hidden);
  status.textContent = visibleCards.length === 1 ? '1 prato' : `${visibleCards.length} pratos`;
});

function showPhoto(index) {
  current = (index + visibleCards.length) % visibleCards.length;
  const card = visibleCards[current];
  const thumbnail = card.querySelector('img');
  photo.alt = thumbnail.alt;
  photo.src = thumbnail.src;
  title.textContent = card.querySelector('h3').textContent;
  count.textContent = `${current + 1} / ${visibleCards.length}`;
  for (const button of steps) button.disabled = visibleCards.length === 1;
}

document.querySelector('.dishes').addEventListener('click', event => {
  const card = event.target.closest('.dish');
  if (!card) return;
  opener = card.querySelector('.photo-trigger');
  showPhoto(visibleCards.indexOf(card));
  dialog.showModal();
});

dialog.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (event.target === dialog || button?.hasAttribute('data-close')) dialog.close();
  if (button?.hasAttribute('data-step')) showPhoto(current + Number(button.dataset.step));
});
dialog.addEventListener('keydown', event => {
  const step = {ArrowLeft: -1, ArrowRight: 1}[event.key];
  if (!step) return;
  event.preventDefault();
  showPhoto(current + step);
});
dialog.addEventListener('close', () => opener?.focus({preventScroll:true}));

const tickerControl = document.querySelector('.ticker-control');
tickerControl.hidden = false;
tickerControl.parentElement.classList.add('animated');
tickerControl.addEventListener('click', () => {
  const paused = tickerControl.parentElement.classList.toggle('paused');
  tickerControl.textContent = paused ? '▶' : 'Ⅱ';
  tickerControl.setAttribute('aria-label', paused ? 'Retomar faixa em movimento' : 'Pausar faixa em movimento');
});

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const arrivals = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('arriving');
      arrivals.unobserve(entry.target);
    }
  }, {threshold:0.12});
  document.querySelectorAll('.section h2,.feature h2,.last-call h2').forEach(title => arrivals.observe(title));
}
