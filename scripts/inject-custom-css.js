/* Load our custom stylesheet after the theme CSS so the variable
   overrides in source/css/custom.css win. Hexo's injector inserts this
   right before </head> on every page, independent of the theme. */
hexo.extend.injector.register(
  'head_end',
  '<link rel="stylesheet" href="/css/custom.css">'
);
