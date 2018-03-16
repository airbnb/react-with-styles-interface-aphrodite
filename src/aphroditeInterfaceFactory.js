import rtlCSSJS from 'rtl-css-js';
import entries from 'object.entries';

import resolveLTR from './utils/resolveLTR';
import resolveRTL from './utils/resolveRTL';

let flushToStyleTag;
try {
  // Aphrodite 1
  // eslint-disable-next-line import/no-unresolved, global-require, prefer-destructuring
  flushToStyleTag = require('aphrodite/lib/inject').flushToStyleTag;
} catch (e) {
  // Aphrodite 2
  // eslint-disable-next-line import/no-unresolved, global-require, prefer-destructuring
  flushToStyleTag = require('aphrodite').flushToStyleTag;
}

export default ({ StyleSheet, css }/* aphrodite */) => ({
  create(styleHash) {
    return StyleSheet.create(styleHash);
  },

  createLTR(styleHash) {
    return StyleSheet.create(styleHash);
  },

  createRTL(styleHash) {
    const styleHashRTL = {};
    entries(styleHash).forEach(([styleKey, styleDef]) => {
      styleHashRTL[styleKey] = rtlCSSJS(styleDef);
    });

    return StyleSheet.create(styleHashRTL);
  },

  resolve(styles) {
    return resolveLTR(css, styles);
  },

  resolveLTR(styles) {
    return resolveLTR(css, styles);
  },

  resolveRTL(styles) {
    return resolveRTL(css, styles);
  },

  // Flushes all buffered styles to a style tag. Required for components
  // that depend upon previous styles in the component tree (i.e.
  // for calculating container width, including padding/margin).
  flush() {
    flushToStyleTag();
  },
});
