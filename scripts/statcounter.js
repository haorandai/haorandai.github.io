/* StatCounter (statcounter.com, free Basic plan): a visitor log with IP, ISP/organization,
   location and referrer, kept for 14 days; dashboard at statcounter.com, weekly email.
   Invisible tracking, so nothing shows on the page. The project id and security code are
   public by design (they appear in every page's source). counter.js notices Swup's
   history.pushState page changes by itself and records each one, so it is loaded once. */
const PROJECT = 13359244;
const SECURITY = 'f390cabf';

hexo.extend.injector.register('body_end',
  `<script>var sc_project=${PROJECT}, sc_invisible=1, sc_security="${SECURITY}";</script>`
  + `<script src="https://www.statcounter.com/counter/counter.js" async></script>`
  + `<noscript><img src="https://c.statcounter.com/${PROJECT}/0/${SECURITY}/1/" alt="" width="1" height="1" referrerpolicy="no-referrer-when-downgrade" style="position:absolute;left:-9999px"></noscript>`);
