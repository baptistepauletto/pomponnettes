// PostCSS config to prefix selectors under the app container in production only
// Ensures WordPress theme styles do not leak into the app, and our styles do not leak out

const prefixer = require('postcss-prefix-selector');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    isProduction &&
      prefixer({
        prefix: '.pomponnettes-app-container',
        transform: function (prefix, selector, prefixedSelector) {
          // Rewrite global roots to the container to avoid leaking page-wide
          if (selector === 'html' || selector === 'body' || selector === ':root') {
            return prefix;
          }

          // Already-scoped selectors should not get double-prefixed
          if (selector.startsWith(prefix + ' ')) {
            return selector;
          }

          return prefixedSelector;
        },
        // Avoid prefixing keyframes and similar at-rules
        exclude: [
          /^@keyframes/i,
          /^@font-face/i
        ]
      })
  ].filter(Boolean)
};


