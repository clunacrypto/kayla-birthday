// Gift modals: cake, pink lily bouquet, love coupons, tarot reading.
const PETAL_PATH = 'M0 0 C13 -16 11 -42 0 -56 C-11 -42 -13 -16 0 0Z';
const NOTE_SPOTS = [
  [2, 4], [64, 2], [0, 30], [70, 26], [4, 56], [68, 52], [2, 80], [66, 78], [30, 92], [34, -2], [62, 92],
];
const LILIES = [
  { x: 92, y: 122, r: -24, s: 0.95 },
  { x: 210, y: 116, r: 22, s: 0.95 },
  { x: 152, y: 80, r: 4, s: 1.1 },
];

function lilySvg({ x, y, r, s }) {
  const petals = Array.from({ length: 6 }, (_, i) => `
    <g transform="rotate(${i * 60})">
      <path d="${PETAL_PATH}" fill="url(#petal)"/>
      <path d="M0 -6 V-46" stroke="#fff" stroke-width="1.2" opacity=".6"/>
      <circle cx="0" cy="-14" r="1.3" fill="#c0306a"/><circle cx="2.6" cy="-20" r="1.1" fill="#c0306a"/>
      <circle cx="-2.6" cy="-23" r="1.1" fill="#c0306a"/><circle cx="1" cy="-29" r="1" fill="#c0306a"/>
    </g>`).join('');
  const stamens = Array.from({ length: 6 }, (_, i) => `
    <g transform="rotate(${i * 60 + 30})">
      <path d="M0 0 V-32" stroke="#a6c76c" stroke-width="1.4"/><ellipse cx="0" cy="-33" rx="2" ry="3.4" fill="#c4692a"/>
    </g>`).join('');
  return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">${petals}${stamens}<circle r="4" fill="#d9ef9a"/></g>`;
}

function bouquetSvg() {
  const stems = LILIES.map(({ x, y }) => `<path d="M${x} ${y} Q150 210 150 300" stroke="#6fae5b" stroke-width="4" fill="none"/>`).join('');
  return `
  <svg viewBox="0 0 300 330" aria-label="a bouquet of pink lilies">
    <defs>
      <radialGradient id="petal" cx=".5" cy="1" r="1">
        <stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="#ffd3e2"/>
        <stop offset=".7" stop-color="#ff8fb8"/><stop offset="1" stop-color="#e0508a"/>
      </radialGradient>
    </defs>
    <path d="M70 150 L230 150 L166 318 L134 318Z" fill="#ffe1ec"/>
    ${stems}
    <ellipse cx="112" cy="168" rx="9" ry="30" fill="#7fbf68" transform="rotate(-38 112 168)"/>
    <ellipse cx="190" cy="166" rx="9" ry="30" fill="#7fbf68" transform="rotate(38 190 166)"/>
    <ellipse cx="62" cy="86" rx="7" ry="20" fill="#ffb3cc" transform="rotate(-30 62 86)"/>
    <ellipse cx="244" cy="76" rx="7" ry="20" fill="#ffb3cc" transform="rotate(30 244 76)"/>
    ${LILIES.map(lilySvg).join('')}
    <path d="M58 168 L150 326 L242 168 Q150 206 58 168Z" fill="#f7c4d6"/>
    <path d="M58 168 Q150 206 242 168" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/>
    <g transform="translate(150 252)" fill="#9fd3ff" stroke="#6fb6ef" stroke-width="1.5">
      <path d="M0 0 C-30 -22 -40 6 0 0Z"/><path d="M0 0 C30 -22 40 6 0 0Z"/>
      <path d="M-2 2 L-16 36 L-6 32Z"/><path d="M2 2 L16 36 L6 32Z"/><circle r="5"/>
    </g>
  </svg>`;
}

function cakeGift() {
  return `
    <h3 class="modal-title">Make a Wish</h3>
    <div class="cake">
      <p class="cake-topper">✨ 22 ✨</p>
      <div class="candles">${'<button class="candle" aria-label="blow out candle"><span class="flame"></span></button>'.repeat(3)}</div>
      <div class="tier tier-top"></div>
      <div class="tier tier-bot"></div>
      <div class="plate"></div>
    </div>
    <p class="cake-msg" id="cakeMsg">Tap the flames to blow them out 🕯️</p>`;
}

function wireCake(root) {
  const candles = [...root.querySelectorAll('.candle')];
  root.querySelector('.candles').addEventListener('click', (e) => {
    const candle = e.target.closest('.candle');
    if (!candle || candle.classList.contains('out')) return;
    candle.classList.add('out');
    if (candles.every((c) => c.classList.contains('out'))) {
      root.querySelector('#cakeMsg').textContent = 'Happy birthday, princess! Your wish is already on its way 💫';
      rain({ count: 50 });
    }
  });
}

function flowersGift() {
  const notes = CONFIG.loveNotes
    .map((n, i) => `<span class="love-note" style="left:${NOTE_SPOTS[i % NOTE_SPOTS.length][0]}%;top:${NOTE_SPOTS[i % NOTE_SPOTS.length][1]}%;animation-delay:${(i * 0.4).toFixed(1)}s">${esc(n)}</span>`)
    .join('');
  return `
    <h3 class="modal-title">Flowers Just For You</h3>
    <p class="modal-sub">Pink lilies, your favorite 🌸</p>
    <div class="bouquet">${bouquetSvg()}${notes}</div>`;
}

function couponsGift() {
  const coupons = CONFIG.coupons
    .map(({ icon, text }) => `<div class="coupon"><span class="coupon-icon">${icon}</span><span>${esc(text)}</span></div>`)
    .join('');
  return `
    <h3 class="modal-title">Love Coupons</h3>
    <p class="modal-sub">Redeemable anytime, no expiration</p>
    <div class="coupons">${coupons}</div>
    <p class="coupon-fine">Screenshot to redeem. Valid for one (1) princess only.</p>`;
}

function tarotGift() {
  return `
    <h3 class="modal-title">Your Birthday Reading</h3>
    <p class="modal-sub">Focus on your wish… then tap the card 🔮</p>
    <button class="tarot-card" id="tarotCard" aria-label="flip tarot card">
      <span class="tarot-inner">
        <span class="tarot-face tarot-back">☾ ✦ ☽<small>777</small></span>
        <span class="tarot-face tarot-front">
          <span class="tarot-numeral" id="tarotNumeral"></span>
          <span class="tarot-icon" id="tarotIcon"></span>
          <span class="tarot-name" id="tarotName"></span>
        </span>
      </span>
    </button>
    <p class="tarot-reading" id="tarotReading"></p>`;
}

function wireTarot(root) {
  const card = root.querySelector('#tarotCard');
  card.addEventListener('click', () => {
    if (card.classList.contains('flipped')) {
      card.classList.remove('flipped');
      root.querySelector('#tarotReading').textContent = '';
      return;
    }
    const pull = pick(CONFIG.tarot);
    root.querySelector('#tarotNumeral').textContent = pull.numeral;
    root.querySelector('#tarotIcon').textContent = pull.icon;
    root.querySelector('#tarotName').textContent = pull.name;
    card.classList.add('flipped');
    setTimeout(() => {
      root.querySelector('#tarotReading').textContent = `${pull.reading} (Tap again to pull another.)`;
      const r = card.getBoundingClientRect();
      burst({ count: 18, emojis: ['✦', '🔮', '⭐', '🌙'], x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }, 600);
  });
}

const GIFTS = {
  cake: { render: cakeGift, wire: wireCake },
  flowers: { render: flowersGift, wire: () => {} },
  coupons: { render: couponsGift, wire: () => {} },
  tarot: { render: tarotGift, wire: wireTarot },
};

function openGift(type) {
  const gift = GIFTS[type];
  if (!gift) return;
  const content = $('#modalContent');
  content.innerHTML = gift.render();
  gift.wire(content);
  $('#modal').hidden = false;
  document.body.style.overflow = 'hidden';
  if (type !== 'tarot') burst({ count: 22 });
}

function closeModal() {
  $('#modal').hidden = true;
  $('#modalContent').innerHTML = '';
  document.body.style.overflow = '';
}
