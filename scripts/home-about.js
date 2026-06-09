/* Inject the About content into the homepage's main content area (keeping the
   theme's profile card and hero). Server-side, so it ships in the HTML. */
const HOME_ABOUT = `
<div class="home-about">
  <h2 class="home-about-heading">About</h2>
  <p><strong>Haoran (Harry) Dai</strong> is a PhD candidate in Computer Science at the Illinois Institute of Technology, advised by <a href="https://wangbinghui.net/">Professor Binghui Wang</a>, and a Research Scientist at <a href="https://quiver.ai/">Quiver AI</a>. His research examines the security and efficiency of modern AI systems. On the security side, he develops and evaluates backdoor attacks against text-to-image and multimodal diffusion models and vision-language models, together with defenses against them. On the efficiency side, he studies reasoning models and large language models, focusing on test-time inference scaling and the attention and quantization behavior underlying their inference stability. At Quiver AI, he works on SVG generation systems, spanning inference optimization, model post-training, data curation, and the internal tooling that supports them. He is based in Chicago, Illinois.</p>
  <p class="home-chat"><a href="https://calendar.app.google/PJjm8BtGCkiXdk3x9" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>Coffee chat</a></p>
  <h3>News</h3>
  <ul class="home-news">
    <li><span class="news-date">May 2026</span><span><a href="https://arxiv.org/abs/2605.17887">Attention Sinks and Outliers in Attention Residuals</a> released on arXiv.</span></li>
    <li><span class="news-date">Apr 2026</span><span><a href="https://iclr.cc/virtual/2026/10013309">TIDES</a> presented as a poster at the ICLR 2026 Workshop on Efficient Spatial Reasoning.</span></li>
    <li><span class="news-date">Mar 2026</span><span><a href="https://arxiv.org/abs/2603.06508">When One Modality Rules Them All</a> accepted at the ICLR 2026 Workshop on Principled Design for Trustworthy AI.</span></li>
    <li><span class="news-date">Feb 2026</span><span><a href="https://arxiv.org/abs/2603.29852">VectorGym</a> and <a href="https://arxiv.org/abs/2602.21416">WildSVG</a>, two benchmarks for SVG generation, released on arXiv.</span></li>
    <li><span class="news-date">Oct 2025</span><span>Joined <a href="https://quiver.ai/">Quiver AI</a> as a Research Scientist, working on SVG generation systems.</span></li>
    <li><span class="news-date">Aug 2025</span><span><a href="https://arxiv.org/abs/2508.01605">Practical, Generalizable and Robust Backdoor Attacks on Text-to-Image Diffusion Models</a> released on arXiv.</span></li>
    <li><span class="news-date">Aug 2024</span><span>Started the PhD in Computer Science at the Illinois Institute of Technology, advised by <a href="https://wangbinghui.net/">Professor Binghui Wang</a>.</span></li>
  </ul>
  <h3>Research Interests</h3>
  <ul>
    <li>Reasoning models and test-time inference scaling</li>
    <li>Vector graphics (SVG) generation</li>
    <li>Efficiency and robustness of large language models</li>
    <li>Backdoor attacks and defenses for diffusion models (text-to-image, multimodal) and vision-language models</li>
    <li>Trustworthy and secure AI</li>
  </ul>
  <h3>Currently</h3>
  <ul>
    <li><strong>Research Scientist</strong>, <a href="https://quiver.ai/">Quiver AI</a> (Oct 2025 - Now). SVG generation: inference optimization, post-training, data optimization, and internal tooling.</li>
    <li><strong>PhD, Computer Science</strong>, Illinois Institute of Technology (Aug 2024 - Now). Advisor: <a href="https://wangbinghui.net/">Professor Binghui Wang</a>.</li>
  </ul>
</div>
`;

hexo.extend.filter.register('after_render:html', function (html, data) {
  if (data.path !== 'index.html') return html;
  return html.replace(/(<div[^>]*\bclass="trm-content"[^>]*>)/, '$1' + HOME_ABOUT);
}, 15);
