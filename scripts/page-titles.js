/* Inner pages are titled "Publications", "Experience" and so on, which is what the hero
   should say but too bare for a browser tab, a search result or a link preview. Add the
   author's name there (the <title>, og:title and twitter:title), not on the page itself. */
hexo.extend.filter.register('after_render:html', function (html, data) {
  const author = hexo.config.author;
  const m = html.match(/<title\s*>([^<]*)<\/title>/);
  if (!m || !author || data.path === 'index.html') return html;
  const title = m[1].trim();
  if (!title || title.includes(author)) return html;
  const full = `${title} · ${author}`;
  return html
    .replace(m[0], `<title>${full}</title>`)
    .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*"/g, `$1${full}"`);
});
