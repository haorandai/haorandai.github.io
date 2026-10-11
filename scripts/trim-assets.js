/* The theme always loads the Fancybox lightbox from a CDN, but no page uses
   data-fancybox and the theme's main.js only calls it if window.Fancybox
   exists. Drop the two tags to save a CSS and a JS request on every page. */
hexo.extend.filter.register('after_render:html', function (html) {
  return html
    .replace(/<link[^>]*@fancyapps\/ui[^>]*>\s*/g, '')
    .replace(/<script[^>]*@fancyapps\/ui[^>]*><\/script>\s*/g, '')
    // Font Awesome (54 KB CSS + webfonts) for eight icons; they are CSS masks in custom.css now
    .replace(/<link[^>]*font-awesome\.min\.css[^>]*>\s*/g, '')
    // Show content immediately on first load instead of waiting for main.js to
    // fade it in (page-to-page transitions still fade via the theme's script).
    .replace('class="trm-scroll-container" style="opacity: 0"', 'class="trm-scroll-container"')
    // Allow pinch-zoom (the theme sets user-scalable=0)
    .replace(/(<meta[^>]*content=")width=device-width, initial-scale=1\.0, maximum-scale=5\.0, user-scalable=0("[^>]*name="viewport")/, '$1width=device-width, initial-scale=1$2')
    // The theme's banner photo (195 KB) is hidden by custom.css but still downloaded
    .replace(/<img[^>]*class="trm-banner-cover"[^>]*>\s*/, '')
    // Size the header logo so the layout doesn't shift when it loads
    .replace('<img alt="logo" src="/img/logo.svg">', '<img alt="logo" src="/img/logo.svg" width="32" height="32">')
    // Mark the page's content column as the main landmark
    .replace('<div class="trm-page-content', '<div role="main" class="trm-page-content')
    // The sidebar name is an h5 right after the page h1; expose it as level 2
    .replace('<h5 class="trm-name', '<h5 aria-level="2" class="trm-name')
    // hidden categories card links to /categories/, which is not generated (404)
    .replace(/<!-- categories -->[\s\S]*?<!-- categories end -->\s*/, '')
    // hidden post list on the home page (its category link also 404s) and its pagination
    .replace(/<!-- newest publications -->[\s\S]*?<!-- newest publications end -->\s*(<div class="trm-pagination">[\s\S]*?<\/div>\s*)?/, '');
});

/* source/_posts/welcome.md only exists because hexo-generator-index makes no home page
   when there are zero posts. Its own page is stale ("Stay tuned..."), so don't publish it. */
hexo.extend.filter.register('after_generate', function () {
  hexo.route.remove('2025/09/02/welcome/index.html');
});
