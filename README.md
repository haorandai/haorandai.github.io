# haorandai.github.io

Source of [haorandai.com](https://haorandai.com), the academic homepage of Harry (Haoran) Dai. It is a [Hexo](https://hexo.io) site on the [Async](https://github.com/MaLuns/hexo-theme-async) theme, deployed to GitHub Pages by GitHub Actions.

## Pages

| Page | Source |
| --- | --- |
| Home: About, Research Themes, Selected Publications, At QuiverAI, News, timeline | `scripts/home-about.js` (injected into the index page) |
| Publications | `source/publications/index.md` |
| Experience (`/more/`): timeline, experience, education, teaching, service | `source/more/index.md` |

News items live in the News list in `scripts/home-about.js`: the visible list on the home page, and older items under "More news". The Academia/Industry timeline is generated from the `JOURNEY` array in the same file. Selected Publications is the `SELECTED_PUBS` list of title links; the cards themselves are read from `source/publications/index.md`.

Each paper card in `source/publications/index.md` carries `data-topic` (`trustworthy`, `efficient`, `vector` or `imaging`), which drives the topic chips and the `?topic=` links from the Research Theme titles. Papers inside the HTML comment at the end of that file are hidden everywhere, including the structured data.

## Local development

```bash
npm ci
npx hexo server      # preview at http://localhost:4000
npx hexo generate    # build into public/
```

Restart the server after editing `_config.yml` or `_config.async.yml`; Hexo does not reload config while running.

## How it is put together

- **Theme.** `hexo-theme-async` is an npm dependency and is never edited in place. Theme settings live in `_config.async.yml`.
- **Styles.** `source/css/custom.css` overrides the theme (light and dark palettes, publication rows, timeline, accessibility fixes, the motion layer). `scripts/inject-custom-css.js` loads it after the theme stylesheet and declares the self-hosted Geist font (`source/fonts/geist/`, OFL). Font Awesome is not loaded: the eight icons the site uses are CSS masks in `custom.css`.
- **Build-time scripts** in `scripts/`:
  - `home-about.js`: home page content, the timeline, the Coffee Chat button, and the compact profile card shown on phones
  - `pub-filter.js`: topic chips on Publications (`?topic=` in the URL)
  - `pub-bibtex.js`: copy button for each BibTeX block
  - `motion.js`: logo draw-in, the illustrative attention view on the hero title, the banner dot grid, the ⌘K quick-jump palette, timeline-on-scroll and thumbnail light (all off under reduced motion)
  - `json-ld.js`: Schema.org `Person` on the home page and a `ScholarlyArticle` per paper on Publications
  - `page-titles.js`: inner pages get "Title · Harry (Haoran) Dai" in the tab title and link previews
  - `og-image-meta.js`: width, height and alt for the link-preview image
  - `first-load.js`: turns off the theme's full-screen spinner on direct page loads
  - `web-analytics.js`: Cloudflare Web Analytics beacon
  - `statcounter.js`: StatCounter visitor log (IP, network, location, referrer; free plan keeps 14 days; Swup page changes are recorded by counter.js itself)
  - `timeline-tap.js`: tap-to-open timeline cards on touch screens
  - `trim-assets.js`: drops unused theme assets (banner photo, Fancybox, Font Awesome, the column toggle), keeps the stale Welcome post unpublished, and fixes a few accessibility attributes in the rendered HTML
- **Assets.** Avatar `source/img/haoran.jpg`, HD monogram `source/img/logo.svg`, favicons in `source/img/`, publication thumbnails (WebP) in `source/img/pubs/`, organization logos in `source/img/logos/`, Arrow artwork from QuiverAI's public blog in `source/img/quiver/`.
- **Link-preview cards.** `tools/og-card/card.html` (home, `render.sh`) and `tools/og-card/paper-card.html#tides|t2i|vectorgym` for the paper project pages, whose cards live in each project repo as `assets/og-card.png`.
- **Welcome post.** `source/_posts/welcome.md` must stay: with zero posts Hexo generates no home page. Its own page is removed in `trim-assets.js`.
- **SEO.** `hexo-generator-sitemap` writes `sitemap.xml`, `source/robots.txt` points to it, and Hexo's `open_graph` helper provides link previews.

## Deployment

Every push to `master` runs `.github/workflows/deploy.yml`: `npm ci` and `hexo generate` on Node 22, then `actions/deploy-pages`. The workflow also runs on the first of each month, so the timeline's "now" marker stays current. The custom domain comes from `source/CNAME`.
