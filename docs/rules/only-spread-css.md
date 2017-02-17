# Require that `css()` is only spread into a JSX element without a `className` or `style` prop

The shape of the object returned by the `css()` function from withStyles needs to be opaque in order to give us maximum interoperability with different style systems (e.g. Aphrodite or React Native). It may provide `className`, `style`, or both, so you cannot use these props if you are using `css()`.

If you need to add some inline styles (e.g. a style that depends on a non-enumerable value of a prop), `css()` can accept plain objects (example below).

## Rule details

The following patterns are considered warnings:

```jsx
import { css } from 'withStyles';
<div {...css(styles.foo)} className="foo" />
```

```jsx
import { css } from 'withStyles';
<div {...css(styles.foo)} style={{ color: 'red' }} />
```

```jsx
import { css } from 'withStyles';
<div className={css(styles.foo)} />
```

```jsx
import { css } from 'withStyles';
const { className, style } = css(styles.foo);
<div className={className} style={style} />
```

The following patterns are not warnings:

```jsx
import { css } from 'withStyles';
<div {...css(styles.foo)} />
```

```jsx
import { css } from 'withStyles';
<div {...css(styles.foo, { color: 'red' })} />
```

## Known limitations

- Does not try to check for the shape of other objects that are spread onto the element.

  ```jsx
  const bar = { className: 'foo' };
  <div {...css(styles.foo)} {...bar} />
  ```

- Does not keep track of assigning the `css()` function to a different variable.

  ```jsx
  import { css } from 'withStyles';
  const withStylesCSS = css;
  <div {...withStylesCSS(styles.foo)} className="foo" />
  ```
