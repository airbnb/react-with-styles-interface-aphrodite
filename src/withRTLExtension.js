export const RTL_SELECTOR = '_rtl';

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

  // generated may include more than one style definition. We want to prefix each one individually.
  // This primarily happens for pseudo selectors for which generated looks like
  //   .classname::selector{...}.classname::otherselector{...}
  // This is the only case we really worry about, and as a result, we split on '}.' which marks the
  // end of style definition and beginning of a new one.
  const styleDefs = generated.split('}.').map(g => `[dir="rtl"] ${g}`);
  return styleDefs.join('}.');
}

export default function withRTLExtension({ StyleSheet } /* aphrodite */) {
  return StyleSheet.extend([{ selectorHandler: directionSelectorHandler }]);
}
