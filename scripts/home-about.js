/* Inject the About content into the homepage's main content area (keeping the
   theme's profile card and hero). Server-side, so it ships in the HTML. */
/* Education & experience timeline (built at deploy time, so "Now" advances
   with each build). Desktop: a horizontal axis with two lanes; phones: a
   vertical list. Positions are computed from real start/end months. */
const JOURNEY = [
  { lane: 'edu',  start: [2017, 9],  end: [2021, 6], logo: 'cupb.svg',   short: 'CUP Beijing',       org: 'China University of Petroleum, Beijing', role: 'BE, Computer Software Engineering' },
  { lane: 'edu',  start: [2022, 8],  end: [2024, 1], logo: 'bu.svg',     short: 'Boston University', org: 'Boston University',                      role: 'MS, Computer Science', extra: 'Research Assistant' },
  { lane: 'edu',  start: [2024, 8],  end: null,      logo: 'iit.png',    short: 'Illinois Tech',     org: 'Illinois Institute of Technology',       role: 'PhD, Computer Science', extra: 'Teaching Assistant' },
  { lane: 'work', start: [2020, 7],  end: [2020, 8], logo: 'datacom.png', short: 'China DataCom',     org: 'China DataCom Corporation Limited',     role: 'SDE Intern', minor: true },
  { lane: 'work', start: [2021, 7],  end: [2022, 8], logo: 'cnpc.svg',   short: 'CNPC',              org: 'China National Petroleum Corporation',   role: 'Software Engineer' },
  { lane: 'work', start: [2024, 1],  end: [2024, 8], logo: 'revery.png', short: 'Revery AI',         org: 'Revery AI (YC S21)',                     role: 'Machine Learning Engineer Intern', roleShort: 'ML Engineer Intern' },
  { lane: 'work', start: [2025, 10], end: null,      logo: 'quiver.svg', short: 'Quiver AI',         org: 'Quiver AI',                              role: 'Research Scientist' },
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
  const fmt = (d) => (d ? `${MONTHS[d[1] - 1]} ${d[0]}` : 'Now');

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
          + `<span class="jr-text"><b>${esc(e.short)}</b><small>${e.start[0]} – ${e.end ? e.end[0] : 'now'}</small></span>`
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
    ${moreLink ? '<a class="jr-more" href="/more/">Details →</a>' : ''}
  </div>`;
}

const HOME_ABOUT = `
<div class="home-about">
  <h2 class="home-about-heading">About</h2>
  <p><strong>Harry (Haoran) Dai</strong> is a PhD candidate in Computer Science at the Illinois Institute of Technology, advised by <a href="https://wangbinghui.net/">Professor Binghui Wang</a>, and a Research Scientist at <a href="https://quiver.ai/">Quiver AI</a>. His research examines the security and efficiency of modern AI systems, from backdoor attacks on diffusion and vision-language models to efficient inference for reasoning models and large language models. At Quiver AI, he works on SVG generation systems. He is based in Chicago, Illinois.</p>
  <h3>Research Themes</h3>
  <ul class="home-themes">
    <li><strong>Trustworthy generative AI.</strong> Backdoor attacks on text-to-image and multimodal diffusion models and vision-language models, and defenses against them.</li>
    <li><strong>Efficient reasoning.</strong> Test-time scaling for reasoning models, and the attention and quantization behavior behind stable LLM inference.</li>
    <li><strong>Vector graphics generation.</strong> SVG generation models: post-training, inference optimization and data.</li>
  </ul>
  <h3>News</h3>
  <ul class="home-news">
    <li><span class="news-date">Sep 2026</span><span><a href="https://oasis-research.github.io/">Attention Sinks and Outliers in Attention Residuals</a> (OASIS) accepted at NeurIPS 2026.</span></li>
    <li><span class="news-date">Sep 2026</span><span>OASIS also selected as a spotlight at Efficient Reasoning @ COLM 2026.</span></li>
    <li><span class="news-date">Sep 2026</span><span>Contributed to <a href="https://quiver.ai/blog/introducing-arrow-2-0">Arrow 2 and Arrow 2 Telos</a>, Quiver AI's SVG generation models, now launched.</span></li>
    <li><span class="news-date">Aug 2026</span><span><a href="https://arxiv.org/abs/2603.29852">VectorGym</a>, a multi-task benchmark for SVG code generation, sketching and editing, accepted at EMNLP 2026.</span></li>
    <li><span class="news-date">Apr 2026</span><span><a href="https://haorandai.com/tides-paper/">TIDES</a> presented as a poster at ES-Reasoning @ ICLR 2026.</span></li>
  </ul>
  <details class="home-news-more">
    <summary>More news</summary>
    <ul class="home-news">
      <li><span class="news-date">Mar 2026</span><span><a href="https://arxiv.org/abs/2603.06508">When One Modality Rules Them All</a> accepted at Principled Design for Trustworthy AI @ ICLR 2026.</span></li>
      <li><span class="news-date">Oct 2025</span><span>Joined <a href="https://quiver.ai/">Quiver AI</a> as a Research Scientist, working on SVG generation systems.</span></li>
      <li><span class="news-date">Aug 2025</span><span><a href="https://haorandai.com/practical-t2i-backdoors/">Practical, Generalizable and Robust Backdoor Attacks on Text-to-Image Diffusion Models</a> released on arXiv.</span></li>
      <li><span class="news-date">Aug 2024</span><span>Started the PhD in Computer Science at the Illinois Institute of Technology, advised by <a href="https://wangbinghui.net/">Professor Binghui Wang</a>.</span></li>
    </ul>
  </details>
  <h3>Service</h3>
  <p class="home-service">Reviewer for ICLR 2027 and IEEE Transactions on Dependable and Secure Computing (TDSC).</p>
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

/* Coffee chat button, placed under the sidebar Contact Me button on every page. */
const COFFEE_CHAT = `<div class="text-center sidebar-chat"><a class="trm-btn trm-btn-outline" href="https://calendar.app.google/PJjm8BtGCkiXdk3x9" target="_blank" rel="noopener">Coffee Chat<svg viewBox="0 0 24 24" width="13" height="13" class="btn-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg></a></div>`;

hexo.extend.filter.register('after_render:html', function (html) {
  return html.replace(/(<a href="mailto:[^"]*" class="trm-btn">[\s\S]*?<\/a>\s*<\/div>)/, '$1' + COFFEE_CHAT);
}, 16);
