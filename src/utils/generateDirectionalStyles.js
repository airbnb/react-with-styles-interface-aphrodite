import rtlCSSJS from 'rtl-css-js';

import { LTR_SELECTOR, RTL_SELECTOR } from './withRTLExtension';

function separateDirectionalStyles(originalStyles, autoRTLStyles) {
  const sharedStyles = {};
  const ltrStyles = { ...originalStyles };
  const rtlStyles = {};

  let hasRTLStyles = false;
  Object.entries(autoRTLStyles)
    .forEach(([key, value]) => {
      if (value === originalStyles[key]) {
        delete ltrStyles[key];
        sharedStyles[key] = value;
        return;
      }

      if (value && typeof value === 'object') {
        // In some cases (pseudoselectors, matchmedia queries, etc.), the style
        // value may be an object, and we need to recurse.
        const recursiveStyles = separateDirectionalStyles(originalStyles[key], value);
        if (recursiveStyles != null) {
          hasRTLStyles = true;
          const {
            [LTR_SELECTOR]: recursiveLtrStyles,
            [RTL_SELECTOR]: recursiveRtlStyles,
          } = recursiveStyles;

          delete recursiveStyles[LTR_SELECTOR];
          delete recursiveStyles[RTL_SELECTOR];

          sharedStyles[key] = recursiveStyles;
          ltrStyles[key] = recursiveLtrStyles;
          rtlStyles[key] = recursiveRtlStyles;
        }
      } else if (value != null) {
        hasRTLStyles = true;
        rtlStyles[key] = value;
      }
    });

  if (!hasRTLStyles) return null;

  return {
    ...sharedStyles,
    [LTR_SELECTOR]: ltrStyles,
    [RTL_SELECTOR]: rtlStyles,
  };
}

export default function generateDirectionalStyles(ltrStyles) {
  return separateDirectionalStyles(ltrStyles, rtlCSSJS(ltrStyles));
}
