// Renders every content section from CONFIG.
const MS_PER_DAY = 86400000;
const STAR_PATH = 'M0 -7 L1.8 -1.8 L7 0 L1.8 1.8 L0 7 L-1.8 1.8 L-7 0 L-1.8 -1.8Z';
const NOTE_TILTS = ['-2deg', '1.5deg', '-1deg', '2deg', '0deg', '-1.5deg'];

const PIXEL_BUG = [
  '..k......k..',
  '...k....k...',
  '...kkkkkk...',
  '..kwkkkkwk..',
  '..rrrkkrrr..',
  '.rkkrkkrkkr.',
  '.rkkrkkrkkr.',
  'rrrrrkkrrrrr',
  'rrkrrkkrrkrr',
  '.rrrrkkrrrr.',
  '..rrrkkrrr..',
  '....rkkr....',
];
const PIXEL_COLORS = {
  k: '#2b1a22', r: '#e6334a', w: '#ffffff',
};

const $ = (sel) => document.querySelector(sel);
const esc = (str) => String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function pixelGrid(rows) {
  return rows.join('').split('').map((ch) => `<i style="background:${PIXEL_COLORS[ch] || 'transparent'}"></i>`).join('');
}

// A polaroid that falls back to a cute placeholder until the photo file exists.
function polaroid(photo, tapeColor = '') {
  const fig = document.createElement('figure');
  fig.className = `polaroid tape ${tapeColor}`;
  const caption = photo.caption || '';
  fig.innerHTML = `<img src="${esc(photo.src)}" alt="${esc(caption)}" loading="lazy"><figcaption>${esc(caption)}</figcaption>`;
  if (photo.pos) fig.querySelector('img').style.objectPosition = photo.pos;
  if (photo.fit === 'square') fig.querySelector('img').style.aspectRatio = '1 / 1';
  fig.querySelector('img').addEventListener('error', (e) => {
    const ph = document.createElement('div');
    ph.className = 'ph';
    ph.textContent = 'A pic of us goes here ♡';
    e.target.replaceWith(ph);
  }, { once: true });
  return fig;
}

function renderHero() {
  const collage = $('#heroCollage');
  CONFIG.photos.slice(0, 3).forEach((photo, i) => collage.appendChild(polaroid(photo, ['', 'blue', 'pink'][i])));
  const stickers = [
    { html: bugSvg(44), style: 'left:2%;top:72%;--r:-20deg' },
    { html: '🎀', style: 'right:4%;top:70%' },
    { html: '🌸', style: 'left:45%;top:-3%' },
  ];
  stickers.forEach(({ html, style }) => {
    const s = document.createElement('span');
    s.className = 'sticker';
    s.style.cssText = style;
    s.innerHTML = html;
    collage.appendChild(s);
  });
}

function renderLetter() {
  const paragraphs = CONFIG.letter.map((p) => `<p>${esc(p)}</p>`).join('');
  $('#letterBody').innerHTML = `${paragraphs}<p class="sig">Forever yours,<br>${esc(CONFIG.fromName)} ♡</p>`;
}

function renderDays() {
  const met = new Date(`${CONFIG.metOn}T00:00:00`);
  const days = Math.max(0, Math.floor((Date.now() - met.getTime()) / MS_PER_DAY));
  $('#daysTogether').dataset.target = String(days);
}

function countUp(el, target, durationMs = 1600) {
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / durationMs);
    el.textContent = Math.round(target * (1 - (1 - t) ** 3)).toLocaleString();
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  // rAF pauses in background tabs; make sure the final number always lands
  setTimeout(() => { el.textContent = target.toLocaleString(); }, durationMs + 200);
}

function renderConstellation() {
  const svg = $('#constellation');
  const moles = CONFIG.moles;
  const lines = moles.slice(1).map((m, i) => `<line class="mole-line" x1="${moles[i].x}" y1="${moles[i].y}" x2="${m.x}" y2="${m.y}"/>`).join('');
  const sky = Array.from({ length: 26 }, () => `<circle cx="${rand(4, 196).toFixed(0)}" cy="${rand(4, 236).toFixed(0)}" r="${rand(0.4, 1.1).toFixed(1)}" fill="#fff" opacity="${rand(0.2, 0.6).toFixed(2)}"/>`).join('');
  const stars = moles.map((m, i) => `
    <g class="mole" data-i="${i}" transform="translate(${m.x} ${m.y})" role="button" aria-label="star ${i + 1}">
      <circle r="15" fill="transparent"/>
      <path class="star" d="${STAR_PATH}" style="animation-delay:${(i * 0.3).toFixed(1)}s"/>
    </g>`).join('');
  svg.innerHTML = `${sky}<ellipse cx="100" cy="128" rx="80" ry="102" fill="none" stroke="rgba(255,255,255,.18)" stroke-dasharray="3 5"/>${lines}${stars}`;

  if (CONFIG.constellationPhoto) $('#moleProof').appendChild(polaroid(CONFIG.constellationPhoto, 'pink'));

  const found = new Set();
  const note = $('#starNote');
  svg.addEventListener('click', (e) => {
    const g = e.target.closest('.mole');
    if (!g) return;
    const i = Number(g.dataset.i);
    g.classList.add('found');
    found.add(i);
    note.textContent = `${moles[i].note} ✦ ${found.size}/7`;
    if (found.size === moles.length) {
      svg.parentElement.classList.add('done');
      note.textContent = 'All seven found. Every single one is my favorite ♡';
      const r = svg.getBoundingClientRect();
      burst({ count: 24, emojis: ['✦', '⭐', '💗'], x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }
  });
}

function renderTicket() {
  $('#ticketItems').innerHTML = CONFIG.freezeriaOrder
    .map(({ item, mod }) => `<li><span>${esc(item)}<small>${esc(mod)}</small></span><span class="check">✔</span></li>`)
    .join('');
}

function renderMinecraft() {
  $('#mcSkin').src = CONFIG.minecraftSkin;
  $('#mcToasts').innerHTML = CONFIG.achievements
    .map(({ icon, title }, i) => `<li class="mc-toast" style="--i:${i}"><span class="ic">${icon}</span><div><b>Achievement Get!</b><span>${esc(title)}</span></div></li>`)
    .join('');
}

function renderLore() {
  const board = $('#loreBoard');
  const extraPhotos = CONFIG.photos.slice(3);
  CONFIG.lore.forEach((card, i) => {
    const note = document.createElement('article');
    note.className = `note ${card.color}`;
    note.style.setProperty('--r', NOTE_TILTS[i % NOTE_TILTS.length]);
    note.innerHTML = `<h3>${card.icon} ${esc(card.title)}</h3><p>${esc(card.text)}</p>`;
    board.appendChild(note);
    const photo = extraPhotos[Math.floor(i / 3)];
    if (i % 3 === 1 && photo) board.appendChild(polaroid(photo, 'blue'));
  });
}

// Turns a Spotify track or YouTube link into an embeddable player.
function songEmbed(url) {
  const spotify = String(url).match(/spotify\.com\/track\/([A-Za-z0-9]+)/);
  if (spotify) return { kind: 'spotify', src: `https://open.spotify.com/embed/track/${spotify[1]}?utm_source=generator` };
  const youtube = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (youtube) return { kind: 'youtube', src: `https://www.youtube-nocookie.com/embed/${youtube[1]}?rel=0` };
  return null;
}

function renderSongs() {
  const embeds = CONFIG.songs.map(songEmbed).filter(Boolean);
  if (embeds.length === 0) return;
  $('#songSection').hidden = false;
  $('#songs').innerHTML = embeds
    .map(({ kind, src }) => `<iframe class="${kind}" src="${src}" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowfullscreen title="song"></iframe>`)
    .join('');
  $('#songNote').textContent = CONFIG.songNote || '';
}

function renderFinale() {
  $('#finaleFrom').textContent = `Love, ${CONFIG.fromName} 🐞`;
}

function renderAll() {
  $('#pxBug').innerHTML = pixelGrid(PIXEL_BUG);
  renderHero();
  renderLetter();
  renderDays();
  renderConstellation();
  renderTicket();
  renderMinecraft();
  renderLore();
  renderSongs();
  renderFinale();
}
