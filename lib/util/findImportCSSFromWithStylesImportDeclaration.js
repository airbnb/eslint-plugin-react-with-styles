'use strict';

function findImportCSSFromWithStylesImportDeclaration(node) {
  if (!node.source.value.endsWith('withStyles')) {
    return null;
  }

  if (!node.specifiers.length) {
    // import 'foo';
    return null;
  }

  let name = null;
  node.specifiers.some((specifier) => {
    if (specifier.type !== 'ImportSpecifier') {
      // This is the default specifier, so let's keep moving.
      // import foo from 'foo';
      return false;
    }

    if (specifier.imported.name !== 'css') {
      // This is not the import that we are looking for.
      // import { withStyles } from 'withStyles';
      return false;
    }

    name = specifier.local.name;
    return true;
  });
  return name;
}

module.exports = findImportCSSFromWithStylesImportDeclaration;
