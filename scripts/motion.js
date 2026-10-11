/* Motion and small interactions, kept to one visual language: the site's blue
   (--primary) is the only accent, the logo's orange stays in the logo and the
   industry lane of the timeline, and everything shares the easing and durations
   defined under "Motion" in source/css/custom.css. Every effect is decoration on a
   page that is complete without it, and all of it is off under
   prefers-reduced-motion.

   A  Header logo draws itself in (stroke, then fill), once per browser session.
   B  Hero title: hovering a word tints the words it "attends" to; most weight goes
      to a sink token <s>. Illustrative, labelled as such. Desktop pointers only.
   C  Banner dot grid that brightens around the cursor. Desktop pointers only.
   D  ⌘K / Ctrl K / "/" quick jump: pages, papers, contact actions.
   E  Timeline bars grow when the timeline scrolls into view, not on page load.
   F  Paper thumbnails: soft light that follows the cursor.

   Swup replaces #trm-dynamic-content on page transitions, so B, C, E and F are
   set up again on "swup:contentReplaced". The header logo and the palette live
   outside it. */
const fs = require('fs');
const path = require('path');

// --- A: inline the logo so its paths can be animated --------------------------
const LOGO = fs.readFileSync(path.join(hexo.source_dir, 'img', 'logo.svg'), 'utf8')
  .replace(/<!--[\s\S]*?-->\s*/g, '')
  .replace('<svg ', '<svg class="hd-logo" width="32" height="32" role="img" aria-label="logo" ')
  // each path gets a stroke in its own colour (width 0 except while drawing)
  .replace(/<path ([^>]*?)fill="([^"]+)"/g, '<path pathLength="1" $1fill="$2" stroke="$2" stroke-width="0"')
  .replace(/\n\s*/g, '');

// --- D: palette entries, built from the rendered page and publications source --
function paletteData(html) {
  const esc = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
  const items = [
    { g: 'Pages', t: 'Home', href: '/' },
    { g: 'Pages', t: 'Publications', href: '/publications/' },
    { g: 'Pages', t: 'Experience', href: '/more/' },
  ];
  const md = fs.readFileSync(path.join(hexo.source_dir, 'publications', 'index.md'), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  for (const card of md.split('<div class="pub-item').slice(1)) {
    const t = card.match(/<div class="pub-title"><a href="([^"]+)">([\s\S]*?)<\/a>/);
    const v = card.match(/<span class="pub-badge">([\s\S]*?)<\/span>/);
    if (t) items.push({ g: 'Papers', t: esc(t[2]), s: v ? esc(v[1]) : '', href: t[1] });
  }
  const email = (html.match(/href="mailto:([^"]+)"/) || [])[1];
  if (email) items.push({ g: 'Contact', t: 'Copy email address', s: email, copy: email });
  const chat = (html.match(/<div class="text-center sidebar-chat"><a[^>]*href="([^"]+)"/) || [])[1];
  if (chat) items.push({ g: 'Contact', t: 'Book a coffee chat', s: '30 min', href: chat });
  const social = (html.match(/<div class="trm-social">([\s\S]*?)<\/div>/) || [])[1] || '';
  for (const m of social.matchAll(/<a href="(https:[^"]+)" title="([^"]+)"/g)) {
    items.push({ g: 'Contact', t: esc(m[2]), s: new URL(esc(m[1])).hostname.replace(/^www\./, ''), href: esc(m[1]) });
  }
  return JSON.stringify(items).replace(/</g, '\\u003c');
}

const PALETTE = `<div class="hd-pal" id="hd-pal" hidden>`
  + `<div class="hd-pal-backdrop" data-close></div>`
  + `<div class="hd-pal-panel" role="dialog" aria-modal="true" aria-label="Quick jump">`
  + `<div class="hd-pal-field"><input id="hd-pal-q" type="text" placeholder="Jump to a page, paper or contact" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="hd-pal-list"><kbd>esc</kbd></div>`
  + `<ul class="hd-pal-list" id="hd-pal-list" role="listbox"></ul>`
  + `</div><div class="hd-pal-toast" id="hd-pal-toast" role="status"></div></div>`;

const PAL_BUTTON = `<button type="button" class="hd-pal-open" aria-label="Quick jump" data-pal-open>`
  + `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>`
  + `<kbd>⌘K</kbd></button>`;

hexo.extend.filter.register('after_render:html', function (html) {
  if (!html.includes('class="trm-top-bar"')) return html;
  return html
    .replace(/<img alt="logo" src="\/img\/logo\.svg"[^>]*>/, LOGO)
    .replace('<div class="trm-mode-switcher-place">', PAL_BUTTON + '<div class="trm-mode-switcher-place">')
    .replace('</body>', `${PALETTE}<script type="application/json" id="hd-pal-data">${paletteData(html)}</script></body>`);
}, 20);

// Decide before first paint whether the logo plays, so it never flashes filled first
hexo.extend.injector.register('head_end', `<script>
try {
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && !sessionStorage.getItem('hd-logo')) {
    document.documentElement.classList.add('hd-logo-intro');
    sessionStorage.setItem('hd-logo', '1');
  }
} catch (e) {}
</script>`);

hexo.extend.injector.register('body_end', `<script>
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // A: drop the intro class once the draw has finished, so later theme toggles don't replay it
  setTimeout(function () { document.documentElement.classList.remove('hd-logo-intro'); }, 2400);

  // B: illustrative attention over the hero title
  function attention() {
    var title = document.querySelector('.trm-hero-title');
    if (!title || title.dataset.hdAttn || !finePointer || reduce) return;
    title.dataset.hdAttn = '1';
    var words = title.textContent.replace(/\\u00a0/g, ' ').trim().split(/\\s+/);
    title.textContent = '';
    // the sink token sits in a small caption above the title, so the title itself never reflows
    var note = document.createElement('span');
    note.className = 'hd-attn-note'; note.setAttribute('aria-hidden', 'true');
    var sink = document.createElement('span');
    sink.className = 'hd-tok hd-sink'; sink.textContent = '<s>';
    note.appendChild(sink);
    note.appendChild(document.createTextNode(' takes most of the attention · illustrative'));
    var toks = [sink];
    words.forEach(function (w, i) {
      var t = document.createElement('span');
      t.className = 'hd-tok'; t.textContent = w;
      title.appendChild(t); toks.push(t);
      if (i < words.length - 1) title.appendChild(document.createTextNode(i === words.length - 2 ? '\\u00a0' : ' '));
    });
    title.appendChild(note);
    // causal and sink-heavy: a query sees itself and earlier tokens, and <s> takes the most
    function show(q) {
      var raw = toks.map(function (_, k) { return k > q ? 0 : k === 0 ? 3.2 : k === q ? 1.1 : 0.45 + 0.3 * (k % 2); });
      var sum = raw.reduce(function (a, b) { return a + b; }, 0);
      title.classList.add('hd-attn-on');
      toks.forEach(function (t, k) {
        t.style.setProperty('--hd-w', Math.min(0.42, (raw[k] / sum) * 0.95).toFixed(3));
        t.classList.toggle('hd-q', k === q);
      });
    }
    toks.slice(1).forEach(function (t, i) { t.addEventListener('mouseenter', function () { show(i + 1); }); });
    title.addEventListener('mouseleave', function () {
      title.classList.remove('hd-attn-on');
      toks.forEach(function (t) { t.style.removeProperty('--hd-w'); t.classList.remove('hd-q'); });
    });
  }

  // C: dot grid in the banner that brightens near the cursor
  function dots() {
    var banner = document.querySelector('.trm-banner');
    if (!banner || banner.querySelector('.hd-dots') || !finePointer || reduce) return;
    var cv = document.createElement('canvas');
    cv.className = 'hd-dots'; cv.setAttribute('aria-hidden', 'true');
    banner.insertBefore(cv, banner.firstChild);
    banner.classList.add('hd-has-dots');
    var ctx = cv.getContext('2d'), mx = -1e4, my = -1e4, cur = 0, target = 0, raf = 0, w = 0, h = 0;
    var GAP = 24, R = 150;
    function size() {
      var r = banner.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1);
      w = r.width; h = r.height; cv.width = w * d; cv.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    }
    function draw() {
      var dark = document.documentElement.classList.contains('dark');
      var base = dark ? '255,255,255' : '31,35,40', baseA = 0.07;
      ctx.clearRect(0, 0, w, h);
      for (var x = GAP / 2; x < w; x += GAP) for (var y = GAP / 2; y < h; y += GAP) {
        var dx = x - mx, dy = y - my, d = Math.sqrt(dx * dx + dy * dy), f = Math.max(0, 1 - d / R) * cur;
        f = f * f * (3 - 2 * f);
        var push = f * 5, px = x + (d ? dx / d : 0) * push, py = y + (d ? dy / d : 0) * push;
        ctx.fillStyle = f > 0.02 ? 'rgba(' + (dark ? '56,139,253' : '9,105,218') + ',' + (0.18 + f * 0.6).toFixed(3) + ')' : 'rgba(' + base + ',' + baseA + ')';
        ctx.beginPath(); ctx.arc(px, py, 1 + f * 1.3, 0, 6.283); ctx.fill();
      }
    }
    function tick() {
      cur += (target - cur) * 0.12;
      draw();
      raf = Math.abs(target - cur) > 0.01 || target ? requestAnimationFrame(tick) : 0;
      if (!raf) { cur = target; draw(); }
    }
    function kick() { if (!raf) raf = requestAnimationFrame(tick); }
    banner.addEventListener('pointermove', function (e) { var r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; target = 1; kick(); });
    banner.addEventListener('pointerleave', function () { target = 0; kick(); });
    size(); draw();
    new ResizeObserver(function () { size(); draw(); }).observe(banner);
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  }

  // E: grow the timeline when it scrolls into view rather than on load
  function timeline() {
    document.querySelectorAll('.journey').forEach(function (j) {
      if (j.dataset.hdTl || reduce || !('IntersectionObserver' in window)) return;
      j.dataset.hdTl = '1';
      var r = j.getBoundingClientRect();
      if (r.top < innerHeight * 0.9) return; // already on screen: keep the load animation
      j.classList.add('hd-wait');
      var io = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return;
        j.classList.remove('hd-wait'); io.disconnect();
      }, { threshold: 0.35 });
      io.observe(j);
    });
  }

  // F: light that follows the cursor across paper thumbnails
  if (finePointer && !reduce) document.addEventListener('pointermove', function (e) {
    var c = e.target.closest && e.target.closest('.pub-thumb, .hp-thumb');
    if (!c) return;
    var r = c.getBoundingClientRect();
    c.style.setProperty('--hd-x', (e.clientX - r.left) + 'px');
    c.style.setProperty('--hd-y', (e.clientY - r.top) + 'px');
  }, { passive: true });

  // D: quick jump palette (its markup comes after this script, so set up once parsed)
  function palette() {
  var pal = document.getElementById('hd-pal');
  var dataEl = document.getElementById('hd-pal-data');
  if (!pal || !dataEl || pal.dataset.hdReady) return;
  pal.dataset.hdReady = '1';
  {
    var items = JSON.parse(dataEl.textContent), q = document.getElementById('hd-pal-q');
    var list = document.getElementById('hd-pal-list'), toast = document.getElementById('hd-pal-toast');
    var shown = [], sel = 0, opener = null;
    var isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    document.querySelectorAll('.hd-pal-open kbd').forEach(function (k) { k.textContent = isMac ? '⌘K' : 'Ctrl K'; });
    function render() {
      var term = q.value.trim().toLowerCase();
      shown = items.filter(function (it) { return !term || (it.t + ' ' + (it.s || '') + ' ' + it.g).toLowerCase().indexOf(term) >= 0; });
      sel = Math.min(sel, Math.max(0, shown.length - 1));
      list.textContent = '';
      var group = '';
      shown.forEach(function (it, i) {
        if (it.g !== group) {
          group = it.g;
          var g = document.createElement('li'); g.className = 'hd-pal-group'; g.setAttribute('role', 'presentation'); g.textContent = group; list.appendChild(g);
        }
        var li = document.createElement('li');
        li.className = 'hd-pal-item'; li.id = 'hd-pal-' + i; li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', i === sel ? 'true' : 'false');
        var t = document.createElement('span'); t.textContent = it.t; li.appendChild(t);
        if (it.s) { var s = document.createElement('small'); s.textContent = it.s; li.appendChild(s); }
        li.addEventListener('mousemove', function () { if (sel !== i) { sel = i; mark(); } });
        li.addEventListener('click', function () { run(it); });
        list.appendChild(li);
      });
      if (!shown.length) { var e = document.createElement('li'); e.className = 'hd-pal-empty'; e.textContent = 'Nothing matches. Try “svg” or “backdoor”.'; list.appendChild(e); }
      q.setAttribute('aria-activedescendant', shown.length ? 'hd-pal-' + sel : '');
    }
    function mark() {
      list.querySelectorAll('.hd-pal-item').forEach(function (el, i) {
        el.setAttribute('aria-selected', i === sel ? 'true' : 'false');
        if (i === sel) el.scrollIntoView({ block: 'nearest' });
      });
      q.setAttribute('aria-activedescendant', 'hd-pal-' + sel);
    }
    function say(msg) {
      toast.textContent = msg; toast.classList.add('is-on');
      clearTimeout(say.t); say.t = setTimeout(function () { toast.classList.remove('is-on'); }, 1800);
    }
    function run(it) {
      if (it.copy) {
        var done = function () { say('Copied ' + it.copy); };
        if (navigator.clipboard) navigator.clipboard.writeText(it.copy).then(done, function () { say(it.copy); }); else say(it.copy);
        return;
      }
      close();
      if (/^https?:/.test(it.href) && it.href.indexOf(location.origin) !== 0) window.open(it.href, '_blank', 'noopener');
      else location.href = it.href;
    }
    function open() {
      if (!pal.hidden) return;
      opener = document.activeElement;
      pal.hidden = false; q.value = ''; sel = 0; render();
      requestAnimationFrame(function () { pal.classList.add('is-open'); q.focus(); });
    }
    function close() {
      if (pal.hidden) return;
      pal.classList.remove('is-open');
      setTimeout(function () { pal.hidden = true; }, reduce ? 0 : 160);
      if (opener && opener.focus) opener.focus();
    }
    q.addEventListener('input', function () { sel = 0; render(); });
    q.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, shown.length - 1); mark(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); mark(); }
      else if (e.key === 'Enter' && shown[sel]) { e.preventDefault(); run(shown[sel]); }
      else if (e.key === 'Tab') e.preventDefault();
    });
    pal.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) close(); });
    document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('[data-pal-open]')) open(); });
    document.addEventListener('keydown', function (e) {
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? open() : close(); }
      else if (e.key === '/' && !typing && pal.hidden) { e.preventDefault(); open(); }
      else if (e.key === 'Escape' && !pal.hidden) { e.preventDefault(); close(); }
    });
  }

  }

  function init() { attention(); dots(); timeline(); }
  function boot() { palette(); init(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  document.addEventListener('swup:contentReplaced', init);
})();
</script>`);
