/* Cloudflare Web Analytics (cookie-free page views; dashboard at dash.cloudflare.com ->
   Analytics & Logs -> Web Analytics). The token is public by design. "spa": true makes the
   beacon count Swup page transitions (history.pushState) as page views. */
hexo.extend.injector.register('body_end',
  '<!-- Cloudflare Web Analytics --><script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" ' +
  'data-cf-beacon=\'{"token": "2ea782b1ca6b45a686c5c82b027901ee", "spa": true}\'></script><!-- End Cloudflare Web Analytics -->');
