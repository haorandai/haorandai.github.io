/* Schema.org Person data for search engines (standard JSON-LD block),
   inserted on the homepage with Hexo's injector. */
const PERSON = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Haoran Dai',
  alternateName: 'Harry Dai',
  url: 'https://haorandai.com/',
  image: 'https://haorandai.com/img/haoran.jpg',
  jobTitle: 'Research Scientist',
  worksFor: { '@type': 'Organization', name: 'QuiverAI', url: 'https://quiver.ai/' },
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Illinois Institute of Technology' },
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
