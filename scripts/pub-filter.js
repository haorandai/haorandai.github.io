/* Topic chips on the Publications page. Each .pub-item carries data-topic in
   source/publications/index.md; the chip row and its counts are built from those
   at render time, so adding a paper only needs its data-topic. Picking a chip hides
   the other papers and any year left empty, and records it as ?topic= in the URL;
   a link with ?topic= opens the page already filtered. One delegated listener, so
   it keeps working after Swup page transitions. */
const TOPICS = [
  ['trustworthy', 'Trustworthy AI'],
  ['efficient', 'Efficient inference'],
  ['vector', 'Vector graphics'],
  ['imaging', 'Imaging'],
];

hexo.extend.filter.register('after_render:html', function (html, data) {
  if (data.path !== 'publications/index.html') return html;
  const count = t => (html.match(new RegExp(`data-topic="${t}"`, 'g')) || []).length;
  const total = (html.match(/<div class="pub-item[^"]*" data-topic="/g) || []).length;
  if (!total) return html;
  const chip = (t, label, n, on) => `<button type="button" class="pub-chip${on ? ' is-active' : ''}" data-topic="${t}" aria-pressed="${on}">${label}<span>${n}</span></button>`;
  const bar = `<div class="pub-filter" role="group" aria-label="Filter papers by topic">`
    + chip('all', 'All', total, true)
    + TOPICS.map(([t, label]) => chip(t, label, count(t), false)).join('')
    + `</div>`;
  return html.replace(/<h2 id="\d{4}">/, m => bar + m);
});

hexo.extend.injector.register('body_end', `<script>
(function () {
  function apply(topic) {
    var chip = document.querySelector('.pub-chip[data-topic="' + topic + '"]');
    if (!chip) return false;
    document.querySelectorAll('.pub-chip').forEach(function (c) {
      var on = c === chip;
      c.classList.toggle('is-active', on);
      c.setAttribute('aria-pressed', on);
    });
    document.querySelectorAll('.pub-grid').forEach(function (grid) {
      var shown = 0;
      grid.querySelectorAll('.pub-item[data-topic]').forEach(function (item) {
        var hit = topic === 'all' || item.getAttribute('data-topic') === topic;
        item.hidden = !hit;
        if (hit) shown++;
      });
      grid.hidden = !shown;
      var h = grid.previousElementSibling;
      if (h && h.tagName === 'H2') h.hidden = !shown;
    });
    return true;
  }
  document.addEventListener('click', function (e) {
    var chip = e.target.closest && e.target.closest('.pub-chip');
    if (!chip) return;
    var topic = chip.getAttribute('data-topic');
    apply(topic);
    // Keep the choice in the URL (?topic=vector), so a filtered list can be linked
    var url = new URL(location.href);
    if (topic === 'all') url.searchParams.delete('topic'); else url.searchParams.set('topic', topic);
    history.replaceState(history.state, '', url);
  });
  // Links like /publications/?topic=trustworthy (the home Research Themes) open filtered
  function fromURL() {
    var t = new URLSearchParams(location.search).get('topic');
    if (t) apply(t);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fromURL); else fromURL();
  document.addEventListener('swup:contentReplaced', fromURL);
})();
</script>`);
