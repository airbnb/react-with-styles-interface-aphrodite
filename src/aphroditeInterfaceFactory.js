/* eslint-disable no-underscore-dangle */
import { flushToStyleTag } from 'aphrodite/lib/inject';
import { hashObject } from 'aphrodite/lib/util';
import { from as flatten } from 'array-flatten';
import has from 'has';

import { LTR_SELECTOR, RTL_SELECTOR } from './withRTLExtension';
import generateRTLStyles from './generateRTLStyles';

// This function takes the array of styles and separates them into styles that
// are handled by Aphrodite and inline styles.
function separateStyles(stylesArray) {
  const aphroditeStyles = [];

  // Since determining if an Object is empty requires collecting all of its
  // keys, and we want the best performance in this code because we are in the
  // render path, we are going to do a little bookkeeping ourselves.
  let hasInlineStyles = false;
  const inlineStyles = {};

  // This is run on potentially every node in the tree when rendering, where
  // performance is critical. Normally we would prefer using `forEach`, but
  // old-fashioned for loops are faster so that's what we have chosen here.
  for (let i = 0; i < stylesArray.length; i++) { // eslint-disable-line no-plusplus
    const style = stylesArray[i];

    // If this  style is falsey, we just want to disregard it. This allows for
    // syntax like:
    //
    //   css(isFoo && styles.foo)
    if (style) {
      if (
        has(style, '_name') &&
        has(style, '_definition')
      ) {
        // This looks like a reference to an Aphrodite style object, so that's
        // where it goes.
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

export default ({ StyleSheet, css }/* aphrodite */) => ({
  create(styleHash) {
    return StyleSheet.create(styleHash);
  },

  // Styles is an array of properties returned by `create()`, a POJO, or an
  // array thereof. POJOs are treated as inline styles. The default resolve
  // method makes an effort to flip CSS styles for an RTL context.
  // This function returns an object to be spread onto an element.
  resolve(styles) {
    const flattenedStyles = flatten(styles);

    const {
      aphroditeStyles,
      hasInlineStyles,
      inlineStyles,
    } = separateStyles(flattenedStyles);

    const stylesWithDirection = aphroditeStyles.map((stylesObj) => {
      let definition = stylesObj._definition;
      const directionalStyles = generateRTLStyles(definition);
      if (directionalStyles) {
        const { sharedStyles, ltrStyles, rtlStyles } = directionalStyles;
        definition = {
          ...sharedStyles,
          [LTR_SELECTOR]: ltrStyles,
          [RTL_SELECTOR]: rtlStyles,
        };
      }

      return {
        ...stylesObj,
        _definition: definition,
      };
    });

    const result = {};
    if (hasInlineStyles) {
      const inlineRTLStyles = generateRTLStyles(inlineStyles);

      if (inlineRTLStyles) {
        // Because we know nothing about the current directional context, there
        // is no way to determine whether or not the inline styles should be
        // flipped. As a result, if there are inline styles to be flipped, we
        // do so by converting them to classnames and providing styles in both
        // an RTL and an LTR context.
        // This may not work for all situations! For instance, when using inline
        // styles to animate a component with react-motion or animated.js,
        // converting to classes is likely to be way too slow. For those and
        // other edge-cases, consumers should rely on the resolveNoRTL method
        // instead.
        const { sharedStyles, ltrStyles, rtlStyles } = inlineRTLStyles;
        const stylesDef = {
          ...sharedStyles,
          [LTR_SELECTOR]: ltrStyles,
          [RTL_SELECTOR]: rtlStyles,
        };

        stylesWithDirection.push({
          _name: `inlineStyles_${hashObject(stylesDef)}`,
          _definition: stylesDef,
        });
      } else {
        result.style = inlineStyles;
      }
    }

    if (stylesWithDirection.length > 0) {
      result.className = css(...stylesWithDirection);
    }

    return result;
  },

  // Styles is an array of properties returned by `create()`, a POJO, or an
  // array thereof. POJOs are treated as inline styles. This version of the
  // resolve function explicitly does no work to flip styles for an RTL context.
  // This function returns an object to be spread onto an element.
  resolveNoRTL(styles) {
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
      result.style = inlineStyles;
    }

    return result;
  },

  // Flushes all buffered styles to a style tag. Required for components
  // that depend upon previous styles in the component tree (i.e.
  // for calculating container width, including padding/margin).
  flush() {
    flushToStyleTag();
  },
});
