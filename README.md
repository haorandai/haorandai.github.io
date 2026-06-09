# haorandai.github.io

Source for my personal site at [haorandai.com](https://haorandai.com). A static site built with [Hexo](https://hexo.io) and a customized [Async](https://github.com/MaLuns/hexo-theme-async) theme, deployed to GitHub Pages through GitHub Actions.

## Stack

- Hexo 8.1 (static site generator)
- hexo-theme-async 2.2, installed from npm rather than vendored
- Node 22, npm
- GitHub Actions for build and deploy
- GitHub Pages, custom domain `haorandai.com`, HTTPS enforced

## Build and deployment

Hexo renders the files in `source/` against the theme into a static `public/` directory. Markdown is converted by `hexo-renderer-marked`, theme templates render through `hexo-renderer-ejs`, and the theme's LESS compiles with `hexo-renderer-less`. `hexo-generator-searchdb` writes `search.xml` for the in-page search.

Every push to `master` runs `.github/workflows/deploy.yml`. The workflow runs `npm ci` and `npx hexo generate` on Node 22, uploads `public/` as a Pages artifact, and publishes it with `actions/deploy-pages`. The Pages source is set to GitHub Actions, so no built files are committed. The custom domain is set by `source/CNAME`, which Hexo copies into `public/CNAME` on each build.

## Repository layout

```
_config.yml                  Site config: title, url, permalinks, search index
_config.async.yml            Theme config: nav, sidebar, banner, social, favicon
package.json                 Hexo and plugin dependencies
scripts/
  inject-custom-css.js       Loads custom.css after the theme stylesheet
source/
  _posts/                    Posts (Markdown)
  about/index.md             About page (layout: about)
  tags/index.md              Tag index (layout: tag)
  categories/index.md        Category index (layout: category)
  css/custom.css             Style overrides (see below)
  img/haoran.jpg             Avatar
  img/logo.svg               HD monogram, used for the nav logo and favicon
  CNAME                      Custom domain
.github/workflows/deploy.yml Build and deploy to GitHub Pages
```

`node_modules/`, `public/`, and `db.json` are generated and gitignored.

## Local development

```bash
npm ci
npx hexo server      # preview at http://localhost:4000
npx hexo generate    # build into public/
```

Restart the server after editing `_config.yml` or `_config.async.yml`. Hexo does not reload config changes while running.

## Customization

The theme is an npm dependency and is never edited in place, so it stays upgradable. Overrides live in `source/css/custom.css`, which `scripts/inject-custom-css.js` injects after the theme stylesheet using Hexo's injector. The file can therefore override the theme's CSS variables without touching `node_modules/`.

`custom.css` currently:

- sets the accent color to `#0969da`, replacing the theme's olive default in light and dark mode
- replaces the hero banner photo with a flat `#0d1117` canvas, a blue accent glow, and a faint dot grid
- adds the research keyword tags below the hero headline
- hides the date, time, and author cards at the top of each post

Two asset notes:

- The avatar is `source/img/haoran.jpg`, not `avatar.jpg`. The theme ships its own `source/img/avatar.jpg`, and that file shadows a site file of the same name, so the avatar uses a unique name.
- The logo is `source/img/logo.svg`, set as `favicon.logo` and the favicon in `_config.async.yml`.

## Writing a post

Add a Markdown file to `source/_posts/` with front matter, then commit and push to `master`:

```yaml
---
title: Post title
date: 2025-09-02 10:00:00
tags: [intro]
categories: [General]
---
```

The workflow rebuilds and redeploys, usually within a minute.
