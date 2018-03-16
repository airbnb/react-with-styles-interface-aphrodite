import rtlCSSJS from 'rtl-css-js';
import entries from 'object.entries';

import resolveLTR from './utils/resolveLTR';
import resolveRTL from './utils/resolveRTL';

export default ({ StyleSheet, css, flushToStyleTag }/* aphrodite */) => ({
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
