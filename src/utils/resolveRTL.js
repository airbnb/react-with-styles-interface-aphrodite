import { from as flatten } from 'array-flatten';
import rtlCSSJS from 'rtl-css-js';

import separateStyles from './separateStyles';

// Styles is an array of properties returned by `create()`, a POJO, or an
// array thereof. POJOs are treated as inline styles. This version of the
// resolve function explicitly flips inline styles for an RTL context.
// This function returns an object to be spread onto an element.
export default function resolveRTL(css, styles) {
  const flattenedStyles = flatten(styles);

  const {
    aphroditeStyles,
    hasInlineStyles,
    inlineStyles,
  } = separateStyles(flattenedStyles);

  const result = {};
  if (aphroditeStyles.length > 0) {
    result.className = css(...aphroditeStyles);
  }

  if (hasInlineStyles) {
    result.style = rtlCSSJS(inlineStyles);
  }

  return result;
}
