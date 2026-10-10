/* The theme's main.js calls asyncFun.pageLoading() on every full page load: it shows
   the full-screen spinner and hides the content for 600 ms, even though the HTML is
   already there. Make that call a no-op. Swup page transitions do not use it (they
   toggle html.is-animating themselves), so their spinner is unchanged. This runs
   after main.js has defined asyncFun and before DOMContentLoaded, when it is called. */
hexo.extend.injector.register('body_end', `<script>
if (window.asyncFun) window.asyncFun.pageLoading = function () { return Promise.resolve(); };
</script>`);
