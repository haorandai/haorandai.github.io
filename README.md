# haorandai.github.io

Source of [haorandai.com](https://haorandai.com), the academic homepage of Harry (Haoran) Dai. It is a [Hexo](https://hexo.io) site on the [Async](https://github.com/MaLuns/hexo-theme-async) theme, deployed to GitHub Pages by GitHub Actions.

## Pages

| Page | Source |
| --- | --- |
| Home: About, Research Themes, News, timeline | `scripts/home-about.js` (injected into the index page) |
| Publications | `source/publications/index.md` |
| More: timeline, experience, education, service | `source/more/index.md` |

News items live in the News list in `scripts/home-about.js`: the visible list on the home page, and older items under "More news". The Academia/Industry timeline is generated from the `JOURNEY` array in the same file.

## Local development

```bash
npm ci
npx hexo server      # preview at http://localhost:4000
npx hexo generate    # build into public/
```

Restart the server after editing `_config.yml` or `_config.async.yml`; Hexo does not reload config while running.

## How it is put together

- **Theme.** `hexo-theme-async` is an npm dependency and is never edited in place. Theme settings live in `_config.async.yml`.
- **Styles.** `source/css/custom.css` overrides the theme (light and dark palettes, publication rows, timeline, accessibility fixes). `scripts/inject-custom-css.js` loads it after the theme stylesheet, along with the Geist font.
- **Build-time scripts** in `scripts/`:
  - `home-about.js`: home page content, the timeline, and the Coffee Chat button
  - `json-ld.js`: Schema.org `Person` data on the home page
  - `timeline-tap.js`: tap-to-open timeline cards on touch screens
  - `trim-assets.js`: drops unused theme assets and fixes a few accessibility attributes in the rendered HTML
- **Assets.** Avatar `source/img/haoran.jpg`, HD monogram `source/img/logo.svg`, favicons in `source/img/`, publication thumbnails (WebP) in `source/img/pubs/`, organization logos in `source/img/logos/`.
- **SEO.** `hexo-generator-sitemap` writes `sitemap.xml`, `source/robots.txt` points to it, and Hexo's `open_graph` helper provides link previews.

## Deployment

Every push to `master` runs `.github/workflows/deploy.yml`: `npm ci` and `hexo generate` on Node 22, then `actions/deploy-pages`. The workflow also runs on the first of each month, so the timeline's "now" marker stays current. The custom domain comes from `source/CNAME`.
