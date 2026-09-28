/* Copy button for the per-paper BibTeX blocks on the Publications page.
   One delegated listener, so it keeps working after Swup page transitions. */
hexo.extend.injector.register('body_end', `<script>
document.addEventListener('click', function (e) {
  var btn = e.target.closest && e.target.closest('.pub-bib-copy');
  if (!btn) return;
  var code = btn.parentElement.querySelector('code');
  if (!code || !navigator.clipboard) return;
  navigator.clipboard.writeText(code.textContent).then(function () {
    btn.textContent = 'Copied';
    setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
  }, function () { btn.textContent = 'Select text'; });
});
</script>`);
