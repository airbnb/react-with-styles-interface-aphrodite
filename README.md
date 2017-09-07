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

or when you want to support style flipping for an RTL context
```js
import aphroditeInterface from 'react-with-styles-interface-aphrodite/with-rtl';
```

## Built-in RTL support

`react-with-styles-interface-aphrodite` now has built-in LTR/RTL context support in its `with-rtl` version. Specifically, it uses [rtl-css-js](https://github.com/kentcdodds/rtl-css-js) to automatically flip styles (`margin`, `padding`, `float`, `textAlign`, etc.) written for an LTR context when in a `dir="rtl"` context. We recommend using [react-with-direction](https://github.com/airbnb/react-with-direction)'s `DirectionProvider` at your top-level node to achieve best results.

One caveat for this implementation is that it may cause some trouble when relying on inline styles explicitly. Due to some details of what is known at the time of style creation/resolution, inline styles are converted to classnames when there is a flippable style attribute. If you do not want this behavior or if this behavior breaks your usage, `react-with-styles-interface-aphrodite` exports a `resolveNoRTL` method which is exported by `react-with-styles` as `cssNoRTL`. This method matches the behavior in past versions (no automatic style flipping).
