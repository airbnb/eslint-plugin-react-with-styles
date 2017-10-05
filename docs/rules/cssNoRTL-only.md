# Force certain components to use cssNoRTL. (cssNoRTL-only)

`cssNoRTL-only` is a configurable rule that allows applications to force certain components to use `cssNoRTL` over the default `css` call for styling.

Why would you want to do this?

Specifically, if your application relies on `react-with-styles-interface-aphrodite/with-rtl` as its primary interface, the default behavior of the `css` (née `resolve`) method may not always be desired. Specifically, if you pass in a vanilla object into the method (as opposed to a reference to the `styles` prop), it may be converted to a class instead of remaining an inline style in order to support flipping the style in a right-to-left (RTL) environment. While this is fine much of the time, there are scenarios where you might not want this to happen, specifically if you are using a library that relies on an explicit inline style (you are using `react-virtualized` for instance) or converting from an inline style would be less performant (when relying on `react-motion` or `animated-js`). For these components, you may wish to enforce a rule where they use `cssNoRTL` in place of `css` for their styling.

## Rule Details

This rule allows you to specify components that must use `cssNoRTL` over `css` for styling.

## Options
The syntax to specify components looks like this:

```json
"cssNoRTL-only": ["error", "Component1", "Component2"]
```

## Examples
Examples of **incorrect** code for this rule:

```js
/*eslint "cssNoRTL-only": ["error", "Animated"]*/
import { css } from 'react-with-styles';

function MyComponent({ styles }) {
  return (
    <Animated {...css(styles.foo)}>foo</Animated>
  );
}
```

Examples of **correct** code for this rule:

```js
/*eslint "cssNoRTL-only": ["error", "Animated"]*/
import { cssNoRTL } from 'react-with-styles';

function MyComponent({ styles }) {
  return (
    <Animated {...cssNoRTL(styles.foo)}>foo</Animated>
  );
}
```
