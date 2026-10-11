/* Load our custom stylesheet after the theme CSS so the variable
   overrides in source/css/custom.css win. Hexo's injector inserts this
   right before </head> on every page, independent of the theme.
   The ?v= query is a hash of the file, so browsers fetch a new copy
   whenever the stylesheet changes.
   Geist is self-hosted (source/fonts/geist, OFL): the variable font's latin and
   latin-ext files from Google Fonts. The @font-face rules are inline and the
   latin file is preloaded, so text no longer waits on a fonts.googleapis.com
   stylesheet and a second connection to fonts.gstatic.com. */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const cssFile = path.join(hexo.source_dir, 'css', 'custom.css');
const version = crypto.createHash('md5').update(fs.readFileSync(cssFile)).digest('hex').slice(0, 8);

const GEIST = [
  ['latin', 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'],
  ['latin-ext', 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF'],
].map(([subset, range]) => `@font-face{font-family:'Geist';font-style:normal;font-weight:100 900;font-display:swap;src:url(/fonts/geist/geist-${subset}.woff2) format('woff2');unicode-range:${range}}`).join('');

hexo.extend.injector.register(
  'head_end',
  '<link rel="preload" href="/fonts/geist/geist-latin.woff2" as="font" type="font/woff2" crossorigin>' +
  `<style>${GEIST}</style>` +
  `<link rel="stylesheet" href="/css/custom.css?v=${version}">`
);
