# Disallow unused styles

## Rule Details

The following patterns are considered warnings:

``` jsx
function MyComponent({ styles }) {
  return (
    <div {...css(styles.foo)}>
      Foo
    </div>
  );
}

export default withStyles(() => ({
  foo: {
    backgroundColor: 'red',
  },

  bar: { // <--- this style is not used
    backgroundColor: 'green',
  },
}))(MyComponent);
```

The following patterns are not warnings:

``` jsx
function MyComponent({ styles }) {
  return (
    <div {...css(styles.foo)}>
      Foo
    </div>
  );
}

export default withStyles(() => ({
  foo: {
    backgroundColor: 'red',
  },
}))(MyComponent);
```

## Known limitations

- Will not detect styles defined by computed properties.
- Will not detect styles defined by object spread.
- Will not handle files that contain multiple styled components very well.
- Will not handle `styles` prop that has been renamed to something else.
