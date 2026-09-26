/* Inject the About content into the homepage's main content area (keeping the
   theme's profile card and hero). Server-side, so it ships in the HTML. */
const HOME_ABOUT = `
<div class="home-about">
  <h2 class="home-about-heading">About</h2>
  <p><strong>Harry (Haoran) Dai</strong> is a PhD candidate in Computer Science at the Illinois Institute of Technology, advised by <a href="https://wangbinghui.net/">Professor Binghui Wang</a>, and a Research Scientist at <a href="https://quiver.ai/">Quiver AI</a>. His research examines the security and efficiency of modern AI systems. On the security side, he develops and evaluates backdoor attacks against text-to-image and multimodal diffusion models and vision-language models, together with defenses against them. On the efficiency side, he studies reasoning models and large language models, focusing on test-time inference scaling and the attention and quantization behavior underlying their inference stability. At Quiver AI, he works on SVG generation systems, spanning inference optimization, model post-training, data curation, and the internal tooling that supports them. He is based in Chicago, Illinois.</p>
  <h3>Research Interests</h3>
  <ul>
    <li>Reasoning Models and Test-Time Scaling</li>
    <li>Efficient LLM Inference</li>
    <li>Vector Graphics (SVG) Generation</li>
    <li>Diffusion Model Safety</li>
    <li>Vision-Language Model Safety</li>
  </ul>
  <h3>News</h3>
  <ul class="home-news">
    <li><span class="news-date">Sep 2026</span><span><a href="https://oasis-research.github.io/">Attention Sinks and Outliers in Attention Residuals</a> (OASIS) accepted at NeurIPS 2026.</span></li>
    <li><span class="news-date">Sep 2026</span><span><a href="https://quiver.ai/blog/introducing-arrow-2-0">Arrow 2 and Arrow 2 Telos</a>, the Quiver AI SVG generation models I contributed to, launched.</span></li>
    <li><span class="news-date">Aug 2026</span><span><a href="https://arxiv.org/abs/2603.29852">VectorGym</a>, a multi-task benchmark for SVG code generation, sketching and editing, accepted at EMNLP 2026.</span></li>
    <li><span class="news-date">Apr 2026</span><span><a href="https://iclr.cc/virtual/2026/10013309">TIDES</a> presented as a poster at ES-Reasoning @ ICLR 2026.</span></li>
  </ul>
  <details class="home-news-more">
    <summary>More news</summary>
    <ul class="home-news">
      <li><span class="news-date">Mar 2026</span><span><a href="https://arxiv.org/abs/2603.06508">When One Modality Rules Them All</a> accepted at Principled Design for Trustworthy AI @ ICLR 2026.</span></li>
      <li><span class="news-date">Oct 2025</span><span>Joined <a href="https://quiver.ai/">Quiver AI</a> as a Research Scientist, working on SVG generation systems.</span></li>
      <li><span class="news-date">Aug 2025</span><span><a href="https://arxiv.org/abs/2508.01605">Practical, Generalizable and Robust Backdoor Attacks on Text-to-Image Diffusion Models</a> released on arXiv.</span></li>
      <li><span class="news-date">Aug 2024</span><span>Started the PhD in Computer Science at the Illinois Institute of Technology, advised by <a href="https://wangbinghui.net/">Professor Binghui Wang</a>.</span></li>
    </ul>
  </details>
</div>
`;

hexo.extend.filter.register('after_render:html', function (html, data) {
  if (data.path !== 'index.html') return html;
  return html.replace(/(<div[^>]*\bclass="trm-content"[^>]*>)/, '$1' + HOME_ABOUT);
}, 15);

/* Coffee chat button, placed under the sidebar Contact Me button on every page. */
const COFFEE_CHAT = `<div class="text-center sidebar-chat"><a class="trm-btn trm-btn-outline" href="https://calendar.app.google/PJjm8BtGCkiXdk3x9" target="_blank" rel="noopener">Coffee Chat<svg viewBox="0 0 24 24" width="13" height="13" class="btn-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg></a></div>`;

hexo.extend.filter.register('after_render:html', function (html) {
  return html.replace(/(<a href="mailto:[^"]*" class="trm-btn">[\s\S]*?<\/a>\s*<\/div>)/, '$1' + COFFEE_CHAT);
}, 16);
