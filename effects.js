// Visual effects: confetti bursts, falling rain, and floating background bits.
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const PARTY_EMOJIS = ['🐞', '💗', '💛', '💙', '✨', '🎀', '🌸'];
const FLOATER_INTERVAL_MS = 2400;
const MAX_FLOATERS = 9;

const rand = (min, max) => min + Math.random() * (max - min);
const pick = (list) => list[Math.floor(Math.random() * list.length)];

function bugSvg(size) {
  return `<svg class="bug-svg" width="${size}" height="${size}" aria-hidden="true"><use href="#ladybug"/></svg>`;
}

function spawnFx(html, x, y) {
  const el = document.createElement('span');
  el.className = 'fx';
  el.innerHTML = html;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);
  return el;
}

// Pieces explode outward from a point, then fall.
function burst({ count = 36, emojis = PARTY_EMOJIS, x = innerWidth / 2, y = innerHeight / 2 } = {}) {
  const total = REDUCED_MOTION ? Math.ceil(count / 4) : count;
  for (let i = 0; i < total; i += 1) {
    const el = spawnFx(pick(emojis), x, y);
    const angle = rand(0, Math.PI * 2);
    const dist = rand(80, 220);
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 60;
    const rot = rand(-260, 260);
    el.animate([
      { transform: 'translate(0px, 0px) scale(.4)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(1) rotate(${rot}deg)`, opacity: 1, offset: 0.55 },
      { transform: `translate(${dx * 1.2}px, ${dy + 280}px) scale(.9) rotate(${rot * 1.6}deg)`, opacity: 0 },
    ], { duration: rand(1500, 2300), easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = () => el.remove();
  }
}

// Pieces fall from the top of the screen.
function rain({ count = 40, emojis = PARTY_EMOJIS } = {}) {
  const total = REDUCED_MOTION ? Math.ceil(count / 4) : count;
  for (let i = 0; i < total; i += 1) {
    const el = spawnFx(pick(emojis), rand(0, innerWidth), -40);
    const sway = rand(-80, 80);
    el.animate([
      { transform: 'translateY(0) rotate(0)' },
      { transform: `translate(${sway}px, ${innerHeight + 80}px) rotate(${rand(-360, 360)}deg)` },
    ], { duration: rand(2600, 4200), delay: rand(0, 1200), easing: 'linear', fill: 'backwards' }).onfinish = () => el.remove();
  }
}

// Ladybugs, hearts and sparkles drift up the background.
function startFloaters() {
  if (REDUCED_MOTION) return;
  const items = [() => bugSvg(26), () => '♡', () => '✦', () => bugSvg(20), () => '♥'];
  const colors = ['var(--pink)', 'var(--yellow)', 'var(--blue)', 'var(--pink-deep)'];

  const spawn = () => {
    if (document.hidden || document.querySelectorAll('.floater').length >= MAX_FLOATERS) return;
    const el = document.createElement('span');
    el.className = 'floater';
    el.innerHTML = pick(items)();
    el.style.color = pick(colors);
    el.style.fontSize = `${rand(14, 26)}px`;
    el.style.opacity = rand(0.45, 0.8).toFixed(2);
    document.body.appendChild(el);

    const x = rand(0, innerWidth - 30);
    const sway = rand(-60, 60);
    el.animate([
      { transform: `translate(${x}px, ${innerHeight + 30}px) rotate(0deg)` },
      { transform: `translate(${x + sway}px, ${innerHeight / 2}px) rotate(${rand(-30, 30)}deg)` },
      { transform: `translate(${x - sway}px, -60px) rotate(${rand(-40, 40)}deg)` },
    ], { duration: rand(11000, 17000), easing: 'linear' }).onfinish = () => el.remove();
  };

  spawn();
  setInterval(spawn, FLOATER_INTERVAL_MS);
}
