/* Inject the About content into the homepage's main content area (keeping the
   theme's profile card and hero). Server-side, so it ships in the HTML. */
const HOME_ABOUT = `
<div class="home-about">
  <h2 class="home-about-heading">About</h2>
  <p>I am <strong>Haoran (Harry) Dai</strong>, a Computer Science PhD candidate at the Illinois Institute of Technology, advised by <a href="https://wangbinghui.net/">Professor Binghui Wang</a>, and a Research Scientist at <a href="https://quiver.ai/">Quiver AI</a>. My research spans the security and efficiency of modern AI systems. On the security side, I design and evaluate backdoor attacks against text-to-image and multimodal diffusion models and vision-language models, and study how to defend against them. On the efficiency side, I work on reasoning models and large language models, including test-time inference scaling and the attention and quantization behavior that governs their inference stability. I am based in Chicago, Illinois.</p>
  <h3>Research Interests</h3>
  <ul>
    <li>Reasoning models and test-time inference scaling</li>
    <li>Efficiency and robustness of large language models</li>
    <li>Backdoor attacks and defenses for diffusion models (text-to-image, multimodal) and vision-language models</li>
    <li>Trustworthy and secure AI</li>
  </ul>
  <h3>Experience</h3>
  <ul>
    <li><strong>Research Scientist</strong>, <a href="https://quiver.ai/">Quiver AI</a> (Oct 2025 - Present). Research and engineering on multimodal machine learning.</li>
    <li><strong>Machine Learning Engineer Intern</strong>, Revery AI (YC S21) (Jan 2024 - Aug 2024).</li>
    <li><strong>Software Engineer</strong>, China National Petroleum Corporation (Jul 2021 - Aug 2022).</li>
  </ul>
  <h3>Education</h3>
  <ul>
    <li><strong>PhD, Computer Science</strong>, Illinois Institute of Technology (Aug 2024 - Jun 2028). Advisor: <a href="https://wangbinghui.net/">Professor Binghui Wang</a>.</li>
    <li><strong>MS, Computer Science</strong>, Boston University (Aug 2022 - Jun 2024).</li>
    <li><strong>BE, Computer Software Engineering</strong>, China University of Petroleum, Beijing (Sep 2017 - Jun 2021).</li>
  </ul>
  <h3>Contact</h3>
  <p>Reach me at <a href="mailto:haorand16@gmail.com">haorand16@gmail.com</a>, or connect on <a href="https://www.linkedin.com/in/haorandai">LinkedIn</a> and <a href="https://github.com/haorandai">GitHub</a>.</p>
</div>
`;

hexo.extend.filter.register('after_render:html', function (html, data) {
  if (data.path !== 'index.html') return html;
  return html.replace(/(<div class="trm-content[^"]*"[^>]*>)/, '$1' + HOME_ABOUT);
}, 15);
