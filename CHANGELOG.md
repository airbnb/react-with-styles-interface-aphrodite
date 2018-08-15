## v5.0.1

- [Deps] Replace `array-flatten` with `array.prototype.flat`
- [Deps] Update `has` and `rtl-css-js`
- [Dev] Update devDependencies

## v5.0.0

- Remove support for Aphrodite v1 and earlier

## v4.0.2

- Add support for Aphrodite v2

## v4.0.1

- Fix `this` reference in create and resolve methods

## v4.0.0

- Remove with-rtl interface in favor of separate LTR/RTL create and resolve methods

## v3.1.1

- Allow boolean values for styles to run without failure

## v3.1.0

- Add RTL support for `linear-gradient`

## v3.0.1

- Fix for `with-rtl` interface when an aphrodite style is called multiple times

## v3.0.0

- Revert default export to v1 version and export `with-rtl` interface in addition

## v2.1.0

- Add RTL support for `borderLeftWidth`, `translateX`, `translate`, and `translate3d`

## v2.0.1

- Fix RTL support for pseudoselectors and match media queries

## v2.0.0

- Add RTL support in the `resolve` method

## v1.2.0

- Add support for using Aphrodite in no-important mode, which disables adding
  `!important` to every style.

## v1.1.1

- This release reverts all of the changes from 1.1.0, so inline styles no longer
  include vendor prefixes.

## v1.1.0

- Inline styles will now automatically include vendor prefixes.

## v1.0.0

- Initial release.
