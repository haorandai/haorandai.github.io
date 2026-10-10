/* Schema.org data for search engines (standard JSON-LD blocks): the Person on the
   homepage, and one ScholarlyArticle per paper on /publications/, read from the
   rendered paper cards so the page stays the one source. */
const PERSON = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://haorandai.com/#person',
  name: 'Haoran Dai',
  alternateName: 'Harry Dai',
  url: 'https://haorandai.com/',
  image: 'https://haorandai.com/img/haoran.jpg',
  jobTitle: 'Research Scientist',
  worksFor: { '@type': 'Organization', name: 'QuiverAI', url: 'https://quiver.ai/' },
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Illinois Institute of Technology' },
  knowsAbout: ['Trustworthy generative AI', 'Efficient and stable inference', 'Vector graphics generation'],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Boston University' },
    { '@type': 'CollegeOrUniversity', name: 'China University of Petroleum, Beijing' },
  ],
  sameAs: [
    'https://scholar.google.com/citations?user=bZXkw3QAAAAJ',
    'https://github.com/haorandai',
    'https://www.linkedin.com/in/haorandai',
    'https://x.com/HHarryD',
  ],
};

hexo.extend.injector.register(
  'head_end',
  `<script type="application/ld+json">${JSON.stringify(PERSON)}</script>`,
  'home'
);

const strip = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();

hexo.extend.filter.register('after_render:html', function (html, data) {
  if (data.path !== 'publications/index.html') return html;
  const papers = [];
  // Year sections: <h2 id="2026">...</h2><div class="pub-grid">...cards...
  // Papers hidden inside an HTML comment in index.md stay out
  for (const sec of html.replace(/<!--[\s\S]*?-->/g, '').split(/<h2 id="(?=\d{4}")/).slice(1)) {
    const year = sec.slice(0, 4);
    for (const card of sec.split('<div class="pub-body">').slice(1)) {
      const t = card.match(/<div class="pub-title"><a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
      const meta = card.match(/<div class="pub-meta">([\s\S]*?)<\/div>/);
      if (!t || !meta) continue;
      papers.push({
        '@type': 'ScholarlyArticle',
        headline: strip(t[2]),
        url: new URL(t[1], 'https://haorandai.com/').href,
        datePublished: year,
        author: strip(meta[1]).split(/,\s*/).map(n => n.replace(/\*$/, '').trim()).filter(Boolean)
          .map(n => n === 'Haoran Dai' ? { '@id': PERSON['@id'] } : { '@type': 'Person', name: n }),
      });
    }
  }
  if (!papers.length) return html;
  const ld = { '@context': 'https://schema.org', '@graph': [{ '@type': 'Person', '@id': PERSON['@id'], name: PERSON.name, url: PERSON.url }, ...papers] };
  return html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script></head>`);
});
