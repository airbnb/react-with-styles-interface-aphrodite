/* eslint-disable no-underscore-dangle, no-param-reassign */
import { from as flatten } from 'array-flatten';
import { hashObject } from 'aphrodite/lib/util';

import separateStyles from './separateStyles';
import generateDirectionalStyles from './generateDirectionalStyles';

import { LTR_SELECTOR, RTL_SELECTOR } from './withRTLExtension';

function setStyleDefinitionWithRTL(stylesObj, directionalStyleKeys) {
  // Since we are mutating the StyleSheet object directly, we want to cache the withRTL/noRTL
  // results and then set the _definition key to point to the appropriate version when necessary.
  if (!stylesObj.withRTL || !stylesObj.noRTL) {
    // The _definition key is an implementation detail of aphrodite. If aphrodite
    // changes it in the future, this code will need to be updated.
    const definition = stylesObj._definition;
    stylesObj.noRTL = definition;

    const directionalStyles = generateDirectionalStyles(definition, directionalStyleKeys);
    stylesObj.withRTL = directionalStyles || definition;
  }
  stylesObj._definition = stylesObj.withRTL;
  return stylesObj;
}

function fixStyleSpecificity(styles, styleKeys) {
  styles.forEach((stylesObj) => {
    const { _definition: definition } = stylesObj;
    Object.entries(definition).forEach(([styleKey, styleVal]) => {
      if (styleKey === RTL_SELECTOR || styleKey === LTR_SELECTOR) return;
      if (styleKeys.has(styleKey)) {
        // remove the style from the shared styles object
        delete definition[styleKey];

        // add the style to the rtlStyles to match specificity
        if (definition[RTL_SELECTOR]) {
          definition[RTL_SELECTOR][styleKey] = styleVal;
        } else {
          definition[RTL_SELECTOR] = { [styleKey]: styleVal };
        }

        // add the style to the ltrStyles to match specificity
        if (definition[LTR_SELECTOR]) {
          definition[LTR_SELECTOR][styleKey] = styleVal;
        } else {
          definition[LTR_SELECTOR] = { [styleKey]: styleVal };
        }
      }
    });
  });
}

// Styles is an array of properties returned by `create()`, a POJO, or an
// array thereof. POJOs are treated as inline styles. The default resolve
// method makes an effort to flip CSS styles for an RTL context.
// This function returns an object to be spread onto an element.
export default function resolveWithRTL(css, styles) {
  const flattenedStyles = flatten(styles);

  // we build this set of style keys in order to adjust the specificity of
  // keys used for overrides. Specifically, something like `float: none` which
  // is not directional will have a lower specificity than a `float: left` or
  // `float: right` earlier in the list of styles. To prevent this, we need to
  // collect all the directional keys and adjust accordingly after we've built
  // the styles object.
  const directionalStyleKeys = new Set();

  const {
    aphroditeStyles,
    hasInlineStyles,
    inlineStyles,
  } = separateStyles(
    flattenedStyles,
    stylesObj => setStyleDefinitionWithRTL(stylesObj, directionalStyleKeys),
  );

  const result = {};
  if (hasInlineStyles) {
    const inlineRTLStyles = generateDirectionalStyles(inlineStyles, directionalStyleKeys);

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
      aphroditeStyles.push({
        _name: `inlineStyles_${hashObject(inlineRTLStyles)}`,
        _definition: inlineRTLStyles,
      });
    } else {
      result.style = inlineStyles;
    }
  }

  fixStyleSpecificity(aphroditeStyles, directionalStyleKeys);

  if (aphroditeStyles.length > 0) {
    result.className = css(...aphroditeStyles);
  }

  return result;
}
