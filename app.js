// Flow: lock screen → "still love me?" → the birthday site.
const WRONG_RESET_MS = 550;
const UNLOCK_DELAY_MS = 1100;
const YES_DELAY_MS = 1900;
const NO_LINES = [
  'Wrong button, silly.',
  'Nice try, princess.',
  'The NO button is broken. Try the other one.',
  'Imagine the YES button is Leon S. Kennedy.',
  'Okay, the YES button is right there.',
];

function initLock() {
  const code = String(CONFIG.passcode);
  const dotsEl = $('#dots');
  dotsEl.innerHTML = '<span></span>'.repeat(code.length);
  const dots = [...dotsEl.children];
  const hint = $('#lockHint');
  hint.textContent = CONFIG.passcodeHint;
  let entry = '';
  let misses = 0;

  const paint = () => dots.forEach((d, i) => d.classList.toggle('on', i < entry.length));

  const wrong = () => {
    misses += 1;
    $('#lockCard').classList.add('shake');
    hint.textContent = misses >= 3 ? `Psst… think angel numbers ✨ (${code.split('').join(' ')})` : 'Hmm, not quite ♡ Try again.';
    setTimeout(() => {
      entry = '';
      paint();
      $('#lockCard').classList.remove('shake');
    }, WRONG_RESET_MS);
  };

  const unlock = () => {
    $('#padlock').classList.add('open');
    hint.textContent = 'Unlocked ✨ The universe agrees.';
    const r = $('#padlock').getBoundingClientRect();
    burst({ count: 30, emojis: ['✨', '7️⃣', '💛', '🐞'], x: r.left + r.width / 2, y: r.top + r.height / 2 });
    setTimeout(() => {
      $('#lock').hidden = true;
      $('#ask').hidden = false;
    }, UNLOCK_DELAY_MS);
  };

  $('#keypad').addEventListener('click', (e) => {
    const key = e.target.closest('button')?.dataset.key;
    if (!key || entry.length >= code.length) return;
    entry = key === 'del' ? entry.slice(0, -1) : entry + key;
    paint();
    if (entry.length === code.length) {
      if (entry === code) unlock();
      else wrong();
    }
  });
}

function initAsk() {
  const body = $('#askBody');
  const no = $('#noBtn');
  const yes = $('#yesBtn');
  let dodges = 0;

  const dodge = (e) => {
    e.preventDefault();
    const area = body.getBoundingClientRect();
    const btn = no.getBoundingClientRect();
    no.classList.add('flee');
    no.style.left = `${rand(0, area.width - btn.width)}px`;
    no.style.top = `${rand(0, area.height - btn.height)}px`;
    $('#askText').textContent = NO_LINES[dodges % NO_LINES.length];
    dodges += 1;
    showReaction(CONFIG.reactions.no);
    yes.style.transform = `scale(${Math.min(1 + dodges * 0.12, 1.8)})`;
  };
  ['pointerdown', 'mouseenter', 'click'].forEach((evt) => no.addEventListener(evt, dodge));

  yes.addEventListener('click', () => {
    $('#askText').textContent = 'Yayyy!! I love you ♡';
    no.hidden = true;
    yes.disabled = true;
    showReaction(CONFIG.reactions.yes);
    burst({ count: 50 });
    setTimeout(showMain, YES_DELAY_MS);
  }, { once: true });
}

// Swap the pixel ladybug for a reaction pic (puppy eyes on NO, Flug on YES).
function showReaction(src) {
  if (!src) return;
  const img = $('#askReact');
  img.src = src;
  img.hidden = false;
  $('#pxBug').hidden = true;
}

function initReveal() {
  const sections = document.querySelectorAll('.reveal');
  const onSeen = (el) => {
    if (el.classList.contains('in')) return;
    el.classList.add('in');
    const counter = el.querySelector('#daysTogether');
    if (counter) countUp(counter, Number(counter.dataset.target));
  };
  if (!('IntersectionObserver' in window)) {
    sections.forEach(onSeen);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.filter((en) => en.isIntersecting).forEach((en) => {
      onSeen(en.target);
      io.unobserve(en.target);
    });
  }, { threshold: 0.18 });
  sections.forEach((s) => io.observe(s));

  // Backup in case the observer never fires: reveal anything scrolled into view
  const sweep = () => sections.forEach((s) => {
    if (!s.classList.contains('in') && s.getBoundingClientRect().top < innerHeight * 0.9) onSeen(s);
  });
  window.addEventListener('scroll', sweep, { passive: true });
}

function showMain() {
  $('#ask').hidden = true;
  $('#main').hidden = false;
  window.scrollTo(0, 0);
  initReveal();
  startFloaters();
  rain({ count: 36 });
}

function initGifts() {
  $('#gifts').addEventListener('click', (e) => {
    const gift = e.target.closest('.gift');
    if (gift) openGift(gift.dataset.gift);
  });
  $('#modalClose').addEventListener('click', closeModal);
  $('#modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
  });
  $('#celebrateBtn').addEventListener('click', () => rain({ count: 60 }));
}

renderAll();
initLock();
initAsk();
initGifts();
