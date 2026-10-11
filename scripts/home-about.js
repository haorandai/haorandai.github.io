/* Inject the About content into the homepage's main content area (keeping the
   theme's profile card and hero). Server-side, so it ships in the HTML. */
/* Education & experience timeline (built at deploy time, so "Now" advances
   with each build). Desktop: a horizontal axis with two lanes; phones: a
   vertical list. Positions are computed from real start/end months. */
const JOURNEY = [
  { lane: 'edu',  start: [2017, 9],  end: [2021, 6], logo: 'cupb.webp',   short: 'CUP Beijing',       org: 'China University of Petroleum, Beijing', role: 'BE, Computer Software Engineering' },
  { lane: 'edu',  start: [2022, 8],  end: [2024, 1], logo: 'bu.webp',     short: 'Boston University', org: 'Boston University',                      role: 'MS, Computer Science', extra: 'Research Assistant' },
  { lane: 'edu',  start: [2024, 8],  end: null,      logo: 'iit.png',    short: 'Illinois Tech',     org: 'Illinois Institute of Technology',       role: 'PhD, Computer Science', extra: 'Teaching Assistant' },
  { lane: 'work', start: [2020, 7],  end: [2020, 8], logo: 'datacom.png', short: 'China DataCom',     org: 'China DataCom Corporation Limited',     role: 'SDE Intern', minor: true },
  { lane: 'work', start: [2021, 7],  end: [2022, 8], logo: 'cnpc.svg',   short: 'CNPC',              org: 'China National Petroleum Corporation',   role: 'Software Engineer' },
  { lane: 'work', start: [2024, 1],  end: [2024, 8], logo: 'revery.png', short: 'Revery AI',         org: 'Revery AI (YC S21)',                     role: 'Machine Learning Engineer Intern', roleShort: 'ML Engineer Intern' },
  { lane: 'work', start: [2025, 10], end: null,      logo: 'quiver.svg', short: 'QuiverAI',         org: 'QuiverAI',                              role: 'Research Scientist' },
];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function journeyHTML({ heading = true, moreLink = true } = {}) {
  const today = new Date();
  const idx = ([y, m]) => y * 12 + (m - 1);
  const nowIdx = today.getFullYear() * 12 + today.getMonth();
  // Start the axis at 2020 so recent years get the space; earlier roles
  // are clipped at the left edge and fade in to show they began before.
  const firstYear = 2020;
  const lastYear = today.getFullYear() + 1;
  const axisStart = firstYear * 12;
  const axisEnd = lastYear * 12;
  const pct = (i) => (((i - axisStart) / (axisEnd - axisStart)) * 100).toFixed(3) + '%';
  const yearSpan = (e) => (!e.end ? `${e.start[0]} – Present` : e.end[0] === e.start[0] ? `${e.start[0]}` : `${e.start[0]} – ${e.end[0]}`);
  const fmt = (d) => (d ? `${MONTHS[d[1] - 1]} ${d[0]}` : 'Present');

  const lanes = [['edu', 'Academia'], ['work', 'Industry']].map(([lane, label]) => {
    let seq = 0;
    const items = JOURNEY.filter((e) => e.lane === lane)
      .sort((a, b) => idx(a.start) - idx(b.start))
      .map((e) => {
        if (e.minor) {
          // brief early role: same anatomy as the others, drawn faded, label below
          const ms = Math.max(idx(e.start), firstYear * 12);
          const mt = e.end ? idx(e.end) : nowIdx;
          return `<div class="jr-item jr-minor jr-below" style="--s:${pct(ms)};--w:${(((mt - ms) / (axisEnd - axisStart)) * 100).toFixed(3)}%;--i:0" tabindex="0">`
            + `<span class="jr-bar"></span>`
            + `<span class="jr-pin"><img src="/img/logos/${e.logo}" alt="" loading="lazy" decoding="async"></span>`
            + `<span class="jr-text"><b>${esc(e.short)}</b><small>${e.start[0]}</small></span>`
            + `<span class="jr-card" role="tooltip"><b>${esc(e.role)}</b><span>${esc(e.org)}</span><em>${fmt(e.start)} – ${fmt(e.end)}</em></span>`
            + `</div>`;
        }
        const i = seq++;
        const s = Math.max(idx(e.start), firstYear * 12);
        const clipped = idx(e.start) < firstYear * 12 ? ' jr-clipped' : '';
        const t = e.end ? idx(e.end) : nowIdx;
        const place = i % 2 === 0 ? 'above' : 'below';
        const ongoing = e.end ? '' : ' jr-ongoing';
        return `<div class="jr-item jr-${place}${ongoing}${clipped}" style="--s:${pct(s)};--w:${(((t - s) / (axisEnd - axisStart)) * 100).toFixed(3)}%;--i:${i}" tabindex="0">`
          + `<span class="jr-bar"></span>`
          + `<span class="jr-pin"><img src="/img/logos/${e.logo}" alt="" loading="lazy" decoding="async"></span>`
          + `<span class="jr-text"><b>${esc(e.short)}</b><small>${yearSpan(e)}</small></span>`
          + `<span class="jr-card" role="tooltip"><b>${esc(e.role)}</b><span>${esc(e.org)}</span>${e.extra ? `<span class="jr-extra">${esc(e.extra)}</span>` : ''}<em>${fmt(e.start)} – ${fmt(e.end)}</em></span>`
          + `</div>`;
      }).join('');
    return `<div class="jr-lane jr-${lane}"><span class="jr-lane-label">${label}</span><div class="jr-track">${items}</div></div>`;
  }).join('');

  let ticks = '';
  let years = '';
  for (let y = firstYear; y <= lastYear; y++) {
    ticks += `<span class="jr-tick" style="--x:${pct(y * 12)}"></span>`;
    years += `<span class="jr-year" style="--x:${pct(y * 12)}">${y}</span>`;
  }
  const now = `<span class="jr-now" style="--x:${pct(nowIdx)}"><span>Now</span></span>`;

  const vertical = [...JOURNEY]
    .sort((a, b) => idx(b.start) - idx(a.start))
    .map((e) => `<li class="jr-v-item jr-${e.lane}${e.minor ? ' jr-v-minor' : ''}"><span class="jr-pin"><img src="/img/logos/${e.logo}" alt="" loading="lazy" decoding="async"></span>`
      + `<div><em>${fmt(e.start)} – ${fmt(e.end)}</em><b>${esc(e.role)}</b><span>${esc(e.org)}</span>${e.extra ? `<span class="jr-extra">${esc(e.extra)}</span>` : ''}</div></li>`)
    .join('');

  return `
  ${heading ? '<h3>Education &amp; Experience</h3>' : ''}
  <div class="journey" aria-label="Academia and industry timeline">
    <div class="jr-grid">
      <div class="jr-overlay">${ticks}${now}</div>
      ${lanes}
      <div class="jr-axis">${years}</div>
    </div>
    <ol class="jr-vertical">${vertical}</ol>
    ${moreLink ? '<a class="jr-more" href="/more/">Full experience →</a>' : ''}
  </div>`;
}

const HOME_ABOUT = `
<div class="home-about">
  <h2 class="home-about-heading">About</h2>
  <p><strong>Harry (Haoran) Dai</strong> is a PhD candidate in Computer Science at the Illinois Institute of Technology (expected 2027), advised by <a href="https://wangbinghui.net/">Professor Binghui Wang</a>, and a Research Scientist at <a href="https://quiver.ai/">QuiverAI</a>. He studies the security and efficiency of generative AI models. At QuiverAI, he works on SVG generation and builds agent harnesses. He is based in Chicago, Illinois.</p>
  <h3>Research Themes</h3>
  <ul class="home-themes">
    <li><a class="theme-link" href="/publications/?topic=trustworthy"><strong>Trustworthy generative AI.</strong></a> Backdoor attacks on text-to-image and multimodal diffusion models, safety testing of text-to-image generators, and attacks that exploit test-time scaling in reasoning models.</li>
    <li><a class="theme-link" href="/publications/?topic=efficient"><strong>Efficient and stable inference.</strong></a> Attention sinks and activation outliers in transformers, and suppressing them to keep inference stable and robust to quantization.</li>
    <li><a class="theme-link" href="/publications/?topic=vector"><strong>Vector graphics generation.</strong></a> Benchmarks and reinforcement learning for vision-language models that generate, edit, and extract SVGs from text, sketches, and real-world images.</li>
  </ul>
  <div class="home-pubs-slot"></div>
  <h3>News</h3>
  <ul class="home-news">
    <li><span class="news-date">Sep 2026</span><span><a href="https://oasis-research.github.io/">Attention Sinks and Outliers in Attention Residuals</a> (OASIS) accepted at NeurIPS 2026.</span></li>
    <li><span class="news-date">Sep 2026</span><span>Contributed to QuiverAI's Arrow model family: <a href="https://quiver.ai/blog/introducing-arrow-2-0">Arrow 2 and Arrow 2 Telos</a> launched.</span></li>
    <li><span class="news-date">Sep 2026</span><span>Reviewing for ICLR 2027.</span></li>
    <li><span class="news-date">Aug 2026</span><span><a href="https://haorandai.com/vectorgym/">VectorGym: A Multi-Task Benchmark for SVG Code Generation, Sketching and Editing</a> accepted at EMNLP 2026.</span></li>
    <li><span class="news-date">Aug 2026</span><span><a href="https://oasis-research.github.io/">Attention Sinks and Outliers in Attention Residuals</a> (OASIS) selected as a spotlight at Efficient Reasoning @ COLM 2026.</span></li>
    <li><span class="news-date">Apr 2026</span><span><a href="https://haorandai.com/tides-paper/">TIDES: Test-time Inference Drift Exploitation via Scaling</a> selected as a spotlight at ES-Reasoning @ ICLR 2026.</span></li>
  </ul>
  <details class="home-news-more">
    <summary>More news</summary>
    <ul class="home-news">
      <li><span class="news-date">Mar 2026</span><span>Began reviewing for IEEE Transactions on Dependable and Secure Computing (TDSC).</span></li>
      <li><span class="news-date">Mar 2026</span><span><a href="https://arxiv.org/abs/2603.06508">When One Modality Rules Them All: Backdoor Modality Collapse in Multimodal Diffusion Models</a> accepted at Principled Design for Trustworthy AI @ ICLR 2026.</span></li>
      <li><span class="news-date">Feb 2026</span><span><a href="https://quiver.ai/blog/announcing-our-seed-round">Arrow 1.0</a>, QuiverAI's first SVG generation model, launched in public beta.</span></li>
      <li><span class="news-date">Oct 2025</span><span>Joined <a href="https://quiver.ai/">QuiverAI</a> as a Research Scientist before its public launch, working on SVG generation systems.</span></li>
      <li><span class="news-date">Aug 2025</span><span><a href="https://haorandai.com/practical-t2i-backdoors/">Practical, Generalizable and Robust Backdoor Attacks on Text-to-Image Diffusion Models</a> released on arXiv.</span></li>
      <li><span class="news-date">Aug 2024</span><span>Started the PhD in Computer Science at the Illinois Institute of Technology, advised by <a href="https://wangbinghui.net/">Professor Binghui Wang</a>.</span></li>
    </ul>
  </details>
${journeyHTML()}
</div>
`;

hexo.extend.filter.register('after_render:html', function (html, data) {
  if (data.path !== 'more/index.html') return html;
  return html.replace('<div class="journey-slot"></div>', journeyHTML({ heading: false, moreLink: false }));
}, 15);

hexo.extend.filter.register('after_render:html', function (html, data) {
  if (data.path !== 'index.html') return html;
  return html.replace(/(<div[^>]*\bclass="trm-content"[^>]*>)/, '$1' + HOME_ABOUT);
}, 15);

/* Selected publications on the home page. The cards are read from
   source/publications/index.md (matched by title link), so title, authors, venue
   and thumbnail stay in one place; long author lists are shortened around Harry. */
const SELECTED_PUBS = [
  'https://oasis-research.github.io/',
  'https://haorandai.com/tides-paper/',
  'https://haorandai.com/practical-t2i-backdoors/',
];

// Publications source without the papers hidden in an HTML comment
function pubsMarkdown() {
  return require('fs').readFileSync(require('path').join(hexo.source_dir, 'publications', 'index.md'), 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '');
}

function selectedPubsHTML(md) {
  const cards = md.split('<div class="pub-item').slice(1);
  const rows = SELECTED_PUBS.map((url) => {
    const card = cards.find((c) => c.includes(`<div class="pub-title"><a href="${url}">`));
    if (!card) throw new Error(`home-about.js: no paper with title link ${url} in publications/index.md`);
    const pick = (re) => (card.match(re) || [])[1];
    const title = pick(/<div class="pub-title"><a href="[^"]+">([\s\S]*?)<\/a>/);
    const img = pick(/<img src="([^"]+)"/);
    const venue = pick(/<div class="pub-venue">([\s\S]*?)<\/div>/);
    let authors = pick(/<div class="pub-meta">([\s\S]*?)<\/div>/).split(', ');
    if (authors.length > 7) {
      const me = authors.findIndex((a) => a.includes('pub-me'));
      const keep = new Set([0, 1, 2, me, authors.length - 2, authors.length - 1]);
      authors = authors.map((a, i) => (keep.has(i) ? a : null))
        .filter((a, i, all) => a !== null || all[i - 1] !== null).map((a) => a ?? '…');
    }
    return `<li><a class="hp-thumb" href="${url}" tabindex="-1" aria-hidden="true"><img src="${img}" alt="" loading="lazy" decoding="async"></a>`
      + `<div><a class="hp-title" href="${url}">${title}</a><div class="hp-authors">${authors.join(', ')}</div><div class="hp-venue">${venue}</div></div></li>`;
  }).join('');
  return `<h3>Selected Publications</h3><ul class="home-pubs">${rows}</ul><a class="home-pubs-all" href="/publications/">All publications →</a>`;
}

hexo.extend.filter.register('after_render:html', function (html, data) {
  if (data.path !== 'index.html') return html;
  const md = pubsMarkdown();
  return html.replace('<div class="home-pubs-slot"></div>', selectedPubsHTML(md));
}, 16);

const BOOKING_URL = 'https://calendar.app.google/xCTjoLaTQdL3nXgb7';

/* Coffee chat button, placed under the sidebar Contact Me button on every page. */
const COFFEE_CHAT = `<div class="text-center sidebar-chat"><a class="trm-btn trm-btn-outline" href="${BOOKING_URL}" target="_blank" rel="noopener">Coffee Chat<svg viewBox="0 0 24 24" width="13" height="13" class="btn-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg></a></div>`;

hexo.extend.filter.register('after_render:html', function (html) {
  return html.replace(/(<a href="mailto:[^"]*" class="trm-btn">[\s\S]*?<\/a>\s*<\/div>)/, '$1' + COFFEE_CHAT);
}, 16);

// Current affiliations with logos under the name in the sidebar card (LinkedIn-style)
const AFFILIATIONS = `<ul class="sidebar-affil">`
  + `<li><a href="https://www.iit.edu/" target="_blank" rel="noopener"><img src="/img/logos/iit.png" alt="" width="20" height="20"><span>Illinois Institute of Technology</span></a></li>`
  + `<li><a href="https://quiver.ai/" target="_blank" rel="noopener"><img src="/img/logos/quiver.svg" alt="" width="20" height="20"><span>QuiverAI</span></a></li>`
  + `</ul>`;

hexo.extend.filter.register('after_render:html', function (html) {
  return html.replace(/(<span class="trm-typed-text">[\s\S]*?<\/span>\s*<\/div>)/, '$1' + AFFILIATIONS);
});

/* The theme hides the whole sidebar card below 768px (`hidden-sm`), which leaves
   phones with no photo, links or contact buttons. Rebuild a compact version above
   the home About section, shown only at that width. Avatar, social row and email
   are copied from the rendered sidebar, so _config.async.yml stays the one source. */
hexo.extend.filter.register('after_render:html', function (html, data) {
  if (data.path !== 'index.html') return html;
  const avatar = (html.match(/class="trm-avatar" src="([^"]+)"/) || [])[1];
  const social = (html.match(/<div class="trm-social">[\s\S]*?<\/div>/) || [])[0];
  const email = (html.match(/href="(mailto:[^"]+)" class="trm-btn"/) || [])[1];
  if (!avatar || !social || !email) return html;
  const card = `<div class="mobile-profile">`
    + `<img class="mp-avatar" src="${avatar}" alt="" width="72" height="72">`
    + `<p class="mp-name">${esc(hexo.config.author)}</p>`
    + `<div class="trm-label mp-role" aria-hidden="true"><span class="mp-typed"></span></div>`
    + AFFILIATIONS
    + social
    + `<div class="mp-actions"><a class="mp-btn trm-btn" href="${email}">Contact Me</a>`
    + `<a class="mp-btn mp-btn-outline trm-btn" href="${BOOKING_URL}" target="_blank" rel="noopener">Coffee Chat</a></div>`
    + `</div>`;
  return html.replace('<div class="home-about">', card + '<div class="home-about">');
}, 17);

/* The theme's typewriter only drives the first .trm-typed-text, the sidebar one, which is
   hidden on phones. Mirror its text into the phone card so both show the same line. */
hexo.extend.injector.register('body_end', `<script>
(function () {
  var obs;
  function mirror() {
    if (obs) obs.disconnect();
    var src = document.querySelector('.trm-main-card .trm-typed-text'), dst = document.querySelector('.mobile-profile .mp-typed');
    if (!src || !dst) return;
    dst.textContent = src.textContent;
    obs = new MutationObserver(function () { dst.textContent = src.textContent; });
    obs.observe(src, { childList: true, characterData: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mirror); else mirror();
  document.addEventListener('swup:contentReplaced', mirror);
})();
</script>`, 'home');
