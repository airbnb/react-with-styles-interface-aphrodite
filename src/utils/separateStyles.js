import has from 'has';

// This function takes the array of styles and separates them into styles that
// are handled by Aphrodite and inline styles.
export default function separateStyles(stylesArray) {
  const aphroditeStyles = [];

  // Since determining if an Object is empty requires collecting all of its
  // keys, and we want the best performance in this code because we are in the
  // render path, we are going to do a little bookkeeping ourselves.
  let hasInlineStyles = false;
  const inlineStyles = {};

  // This is run on potentially every node in the tree when rendering, where
  // performance is critical. Normally we would prefer using `forEach`, but
  // old-fashioned for loops are faster so that's what we have chosen here.
  for (let i = 0; i < stylesArray.length; i += 1) {
    const style = stylesArray[i];

    // If this  style is falsey, we just want to disregard it. This allows for
    // syntax like:
    //
    //   css(isFoo && styles.foo)
    if (style) {
      if (has(style, '_name') && has(style, '_definition')) {
        aphroditeStyles.push(style);
      } else {
        Object.assign(inlineStyles, style);
        hasInlineStyles = true;
      }
    }
  }

  return {
    aphroditeStyles,
    hasInlineStyles,
    inlineStyles,
  };
}
