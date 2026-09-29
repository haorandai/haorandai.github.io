/* Size and alt text for the link-preview card (source/img/og-card.png, rendered from
   tools/og-card/card.html). Hexo's open_graph helper only emits og:image, and some
   crawlers (LinkedIn, Slack) lay out the preview faster when the size is declared. */
hexo.extend.injector.register('head_end', [
  '<meta property="og:image:width" content="1200">',
  '<meta property="og:image:height" content="630">',
  '<meta property="og:image:alt" content="Harry (Haoran) Dai: Trustworthy &amp; Efficient Generative AI. CS PhD candidate at Illinois Tech and Research Scientist at QuiverAI.">',
  '<meta name="twitter:image:alt" content="Harry (Haoran) Dai: Trustworthy &amp; Efficient Generative AI. CS PhD candidate at Illinois Tech and Research Scientist at QuiverAI.">'
].join(''));
