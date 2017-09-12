/* eslint-disable no-underscore-dangle */
import { from as flatten } from 'array-flatten';
import { hashObject } from 'aphrodite/lib/util';

import separateStyles from './separateStyles';
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

  aphroditeStyles.forEach((stylesObj) => {
    // The _definition key is an implementation detail of aphrodite. If aphrodite
    // changes it in the future, this code will need to be updated.
    const definition = stylesObj._definition;
    const directionalStyles = generateDirectionalStyles(definition);

    if (!directionalStyles) return;

    stylesObj._definition = directionalStyles; // eslint-disable-line no-param-reassign
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
      aphroditeStyles.push({
        _name: `inlineStyles_${hashObject(inlineRTLStyles)}`,
        _definition: inlineRTLStyles,
      });
    } else {
      result.style = inlineStyles;
    }
  }

  if (aphroditeStyles.length > 0) {
    result.className = css(...aphroditeStyles);
  }

  return result;
}
