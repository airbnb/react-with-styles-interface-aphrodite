import { flushToStyleTag } from 'aphrodite/lib/inject';

import resolveWithRTL from './utils/resolveWithRTL';
import resolve from './utils/resolve';

export default ({ StyleSheet, css }/* aphrodite */) => ({
  create(styleHash) {
    return StyleSheet.create(styleHash);
  },

  resolve(styles) {
    return resolveWithRTL(css, styles);
  },

  resolveNoRTL(styles) {
    return resolve(css, styles);
  },

  // Flushes all buffered styles to a style tag. Required for components
  // that depend upon previous styles in the component tree (i.e.
  // for calculating container width, including padding/margin).
  flush() {
    flushToStyleTag();
  },
});
