/* The theme always loads the Fancybox lightbox from a CDN, but no page uses
   data-fancybox and the theme's main.js only calls it if window.Fancybox
   exists. Drop the two tags to save a CSS and a JS request on every page. */
hexo.extend.filter.register('after_render:html', function (html) {
  return html
    .replace(/<link[^>]*@fancyapps\/ui[^>]*>\s*/g, '')
    .replace(/<script[^>]*@fancyapps\/ui[^>]*><\/script>\s*/g, '')
    // Show content immediately on first load instead of waiting for main.js to
    // fade it in (page-to-page transitions still fade via the theme's script).
    .replace('class="trm-scroll-container" style="opacity: 0"', 'class="trm-scroll-container"');
});
