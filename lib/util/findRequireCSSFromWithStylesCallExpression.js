function findRequireCSSFromWithStylesCallExpression(node) {
  if (node.callee.name !== 'require') {
    // foo();
    return null;
  }

  if (!node.arguments.length) {
    // require();
    return null;
  }

  if (!node.arguments[0].value) {
    // require(foo);
    return null;
  }

  if (!node.arguments[0].value.endsWith('withStyles')) {
    // require('foo');
    return null;
  }

  if (node.parent.type !== 'VariableDeclarator') {
    return null;
  }

  if (node.parent.id.type !== 'ObjectPattern') {
    // const foo = require('withStyles');
    return null;
  }

  let name = null;
  node.parent.id.properties.some((property) => {
    if (property.key.name !== 'css') {
      // This is not the import that we are looking for.
      // const { withStyles } = require('withStyles');
      return false;
    }

    name = property.value.name;
    return true;
  });
  return name;
}

module.exports = findRequireCSSFromWithStylesCallExpression;
