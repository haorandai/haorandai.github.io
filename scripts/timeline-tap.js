/* Touch devices have no hover: tapping a timeline entry opens its card,
   tapping elsewhere closes it. Delegated on document, so it keeps working
   after the theme's swup page transitions. */
hexo.extend.injector.register('body_end', `<script>
document.addEventListener('click', function (e) {
  var item = e.target.closest && e.target.closest('.jr-item');
  document.querySelectorAll('.jr-item.is-open').forEach(function (el) {
    if (el !== item) el.classList.remove('is-open');
  });
  if (item) item.classList.toggle('is-open');
});
</script>`);
