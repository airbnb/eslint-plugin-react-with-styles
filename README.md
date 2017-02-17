# eslint-plugin-react-with-styles <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![Build Status][travis-svg]][travis-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

ESLint plugin for [react-with-styles][react-with-styles].

## Rules

- [react-with-styles/no-unused-styles](docs/rules/no-unused-styles.md): Require all styles that are defined to be referenced
- [react-with-styles/only-spread-css](docs/rules/only-spread-css.md): Require that `css()` is only spread into a JSX element without a `className` or `style` prop

[package-url]: https://npmjs.org/package/eslint-plugin-react-with-styles
[npm-version-svg]: http://versionbadg.es/airbnb/eslint-plugin-react-with-styles.svg
[travis-svg]: https://travis-ci.org/airbnb/eslint-plugin-react-with-styles.svg
[travis-url]: https://travis-ci.org/airbnb/eslint-plugin-react-with-styles
[deps-svg]: https://david-dm.org/airbnb/eslint-plugin-react-with-styles.svg
[deps-url]: https://david-dm.org/airbnb/eslint-plugin-react-with-styles
[dev-deps-svg]: https://david-dm.org/airbnb/eslint-plugin-react-with-styles/dev-status.svg
[dev-deps-url]: https://david-dm.org/airbnb/eslint-plugin-react-with-styles#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/eslint-plugin-react-with-styles.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/eslint-plugin-react-with-styles.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/eslint-plugin-react-with-styles.svg
[downloads-url]: http://npm-stat.com/charts.html?package=eslint-plugin-react-with-styles

[react-with-styles]: https://github.com/airbnb/react-with-styles
