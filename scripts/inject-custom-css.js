/* Load our custom stylesheet after the theme CSS so the variable
   overrides in source/css/custom.css win. Hexo's injector inserts this
   right before </head> on every page, independent of the theme.
   The ?v= query is a hash of the file, so browsers fetch a new copy
   whenever the stylesheet changes. */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const cssFile = path.join(hexo.source_dir, 'css', 'custom.css');
const version = crypto.createHash('md5').update(fs.readFileSync(cssFile)).digest('hex').slice(0, 8);

hexo.extend.injector.register(
  'head_end',
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;450;500;600;700&display=swap">' +
  `<link rel="stylesheet" href="/css/custom.css?v=${version}">`
);
