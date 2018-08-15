import flat from 'array.prototype.flat';

import separateStyles from './separateStyles';

// Styles is an array of properties returned by `create()`, a POJO, or an
// array thereof. POJOs are treated as inline styles. This version of the
// resolve function explicitly does no work to flip styles for an RTL context.
// This function returns an object to be spread onto an element.
export default function resolveLTR(css, styles) {
  const flattenedStyles = flat(styles, Infinity);

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
    result.style = inlineStyles;
  }

  return result;
}
