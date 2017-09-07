import rtlCSSJS from 'rtl-css-js';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

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
            sharedStyles: recursiveSharedStyles,
            ltrStyles: recursiveLtrStyles,
            rtlStyles: recursiveRtlStyles,
          } = recursiveStyles;

          if (!isEmpty(recursiveSharedStyles)) sharedStyles[key] = recursiveSharedStyles;
          if (!isEmpty(recursiveLtrStyles)) ltrStyles[key] = recursiveLtrStyles;
          if (!isEmpty(recursiveRtlStyles)) rtlStyles[key] = recursiveRtlStyles;
        }
      } else if (value != null) {
        hasRTLStyles = true;
        rtlStyles[key] = value;
      }
    });

  if (!hasRTLStyles) return null;

  return {
    sharedStyles,
    ltrStyles,
    rtlStyles,
  };
}

export default function generateDirectionalStyles(ltrStyles) {
  return separateDirectionalStyles(ltrStyles, rtlCSSJS(ltrStyles));
}
