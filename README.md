# react-with-styles-interface-aphrodite <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![Build Status][travis-svg]][travis-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

Interface to use [react-with-styles][react-with-styles] with [Aphrodite][aphrodite].

[package-url]: https://npmjs.org/package/react-with-styles-interface-aphrodite
[npm-version-svg]: http://versionbadg.es/airbnb/react-with-styles-interface-aphrodite.svg
[travis-svg]: https://travis-ci.org/airbnb/react-with-styles-interface-aphrodite.svg
[travis-url]: https://travis-ci.org/airbnb/react-with-styles-interface-aphrodite
[deps-svg]: https://david-dm.org/airbnb/react-with-styles-interface-aphrodite.svg
[deps-url]: https://david-dm.org/airbnb/react-with-styles-interface-aphrodite
[dev-deps-svg]: https://david-dm.org/airbnb/react-with-styles-interface-aphrodite/dev-status.svg
[dev-deps-url]: https://david-dm.org/airbnb/react-with-styles-interface-aphrodite#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/react-with-styles-interface-aphrodite.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/react-with-styles-interface-aphrodite.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/react-with-styles-interface-aphrodite.svg
[downloads-url]: http://npm-stat.com/charts.html?package=react-with-styles-interface-aphrodite

[react-with-styles]: https://github.com/airbnb/react-with-styles
[aphrodite]: https://github.com/khan/aphrodite

## Import

```js
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
```

or when you need to [disable `!important`](https://github.com/Khan/aphrodite#disabling-important):

```js
import aphroditeInterface from 'react-with-styles-interface-aphrodite/no-important';
```

or when you want to support automatic style flipping for an RTL (right-to-left) language page
```js
import aphroditeInterface from 'react-with-styles-interface-aphrodite/with-rtl';
```

## Built-in RTL support

`react-with-styles-interface-aphrodite` now has built-in LTR/RTL context support in its `with-rtl` version. Specifically, it uses [rtl-css-js](https://github.com/kentcdodds/rtl-css-js) to automatically flip styles (`margin`, `padding`, `float`, `textAlign`, etc.) that were written for an LTR page when the `dir="rtl"` attribute is applied. We recommend using [react-with-direction](https://github.com/airbnb/react-with-direction)'s `DirectionProvider` at your top-level node to achieve best results.

For instance, if you were to write your styles as follows:
```jsx
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterfaceWithRTL from 'react-with-styles-interface-aphrodite/with-rtl';

ThemedStyleSheet.registerInterface(aphroditeInterfaceWithRTL);

...

import { withStyles, css } from react-with-styles`

function MyComponent() {
  return <div {...css(styles.container)}>Hello World</div>;
}

export default withStyles(() => ({
  container: {
    background: '#fff',
    float: 'left',
  },
}))(MyComponent);

```

The generated css would look like:
```CSS
.container_r5r4of {
  background: #fff !important;
}

[dir="ltr"] .container_r5r4of {
  float: left !important;
}

[dir="rtl"] .container_r5r4of {
  float: right !important;
}
```

If you used an inline style instead:
```jsx
import { css } from react-with-styles`

export default function MyComponent() {
  return <div {...css({ background: '#fff', float: 'left' })}>Hello World</div>;
}
```

In the default case, this would map to a `style={{ background: '#fff', float: 'left' }}` on the div
in question. However, in the withRTL case, we would convert these styles into a unique classname
(`inlineStyles_emgbm1` in this instance) and generate the following css instead:
```css
.inlineStyles_emgbm1 {
  background: #fff !important;
}

[dir="ltr"] .inlineStyles_emgbm1 {
  float: left !important;
}

[dir="rtl"] .inlineStyles_emgbm1 {
  float: right !important;
}

```

This behavior is due to some details of what is known at the time of style creation/resolution. Because of this, inline styles will always be converted to classnames when there is a flippable style. This may be slower than the default implementation and may be a poor choice if you are attempting to animate something using JS. If you do not want this behavior or if this behavior breaks your usage, `react-with-styles-interface-aphrodite/with-rtl` also exports a `resolveNoRTL` method which is exported by `react-with-styles` as `cssNoRTL`. `cssNoRTL` matches the behavior in the default implementation (no automatic style flipping).
