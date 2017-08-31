export const RTL_SELECTOR = '_rtl';

const styleDefRegex = /\.[^{}]+\{[^{}]+\}/g;

/*
 * When automatically flipping CSS styles in our interface, instead of determining RTL/LTR context
 * at the time of the create or resolve call (which is hard to do without either setting the
 * direction in the global cache or ignoring inline styles entirely), we simply add a new style
 * definition for the generated class name that is only applied in a [dir="rtl"] context. This
 * handler adds that extra style definition to the <style /> tag created by Aphrodite.
 */
function directionSelectorHandler(selector, baseSelector, generateSubtreeStyles) {
  if (selector !== RTL_SELECTOR) {
    return null;
  }

  const generated = generateSubtreeStyles(baseSelector);

  // generated may include more than one style definition (pseudoselectors, matchmedia, etc.).
  // We want to prefix each one individually.
  return generated.replace(styleDefRegex, g => `[dir="rtl"] ${g}`);
}

export default function withRTLExtension({ StyleSheet } /* aphrodite */) {
  return StyleSheet.extend([{ selectorHandler: directionSelectorHandler }]);
}
