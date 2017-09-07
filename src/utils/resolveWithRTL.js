/* eslint-disable no-underscore-dangle */
import { from as flatten } from 'array-flatten';
import { hashObject } from 'aphrodite/lib/util';

import separateStyles from './separateStyles';
import { LTR_SELECTOR, RTL_SELECTOR } from './withRTLExtension';
import generateDirectionalStyles from './generateDirectionalStyles';

// Styles is an array of properties returned by `create()`, a POJO, or an
// array thereof. POJOs are treated as inline styles. The default resolve
// method makes an effort to flip CSS styles for an RTL context.
// This function returns an object to be spread onto an element.
export default function resolveWithRTL(css, styles) {
  const flattenedStyles = flatten(styles);

  const {
    aphroditeStyles,
    hasInlineStyles,
    inlineStyles,
  } = separateStyles(flattenedStyles);

  const stylesWithDirection = aphroditeStyles.map((stylesObj) => {
    let definition = stylesObj._definition;
    const directionalStyles = generateDirectionalStyles(definition);
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
    const inlineRTLStyles = generateDirectionalStyles(inlineStyles);

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
}
