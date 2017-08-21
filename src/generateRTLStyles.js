import rtlCSSJS from 'rtl-css-js';
import has from 'has';

function stylesDiff(ltrStyles, rtlStyles) {
  const ltrStylesDiff = { ...ltrStyles };

  let hasRTLStyles = false;

  const styles = {}; // only includes the necessary styles and overrides
  Object.entries(rtlStyles)
    .forEach(([key, value]) => {
      if (has(ltrStylesDiff, key)) {
        // We want ltrStylesDiff to only include the styles that need to be
        // overridden because they had been flipped in such a way that they
        // don't exist in the rtlStyles object. As such, we delete everything
        // that exists in both rtlStyles and ltrStyles.
        delete ltrStylesDiff[key];
      }

      if (value === ltrStyles[key]) {
        return;
      }

      if (value && typeof value === 'object') {
        // In some cases (pseudoselectors, matchmedia queries, etc.), the style
        // value may be an object, and we need to recurse.
        const recursiveStyles = stylesDiff(ltrStyles[key], value);
        if (recursiveStyles != null) {
          hasRTLStyles = true;
          styles[key] = recursiveStyles;
        }
      } else if (value != null) {
        hasRTLStyles = true;
        styles[key] = value;
      }
    });

  // The only styles remaining in ltrStylesDiff are those that have
  // been flipped in such a way that they need to be reset in an RTL context.
  Object.keys(ltrStylesDiff)
    .forEach((key) => {
      styles[key] = 'initial';
    });

  if (!hasRTLStyles) return null;

  return styles;
}

export default function generateRTLStyles(ltrStyles) {
  return stylesDiff(ltrStyles, rtlCSSJS(ltrStyles));
}
