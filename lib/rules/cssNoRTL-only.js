/**
 * @fileoverview Force usage of cssNoRTL over css for certain components.
 * @author Maja Wichrowska
 */

'use strict';

const findImportCSSFromWithStylesImportDeclaration = require('../util/findImportCSSFromWithStylesImportDeclaration');
const findRequireCSSFromWithStylesCallExpression = require('../util/findRequireCSSFromWithStylesCallExpression');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Force restricted components to use the RWS cssNoRTL method instead of the regular css method',
      recommended: false,
    },

    schema: {
      type: 'array',
      items: {
        type: 'string',
      },
      uniqueItems: true,
    },
  },

  create(context) {
    const restrictedComponents = new Set(context.options);

    // if no components are restricted we don't need to check for restricted css calls
    if (restrictedComponents.length === 0) {
      return {};
    }

    // If `css()` is imported by this file, we want to store what it is imported
    // as in this variable so we can verify where it is used.
    let cssFromWithStylesName;

    function isCSSFound() {
      return !!cssFromWithStylesName;
    }

    function getObjectSpreadFunctionName(node) {
      const callee = node.argument.callee;
      if (!callee) return null;
      return callee.name;
    }

    function getComponentNameFromAttribute(node) {
      return node.parent.name.name;
    }

    return {
      CallExpression(node) {
        if (isCSSFound()) {
          // We've already found it, so there is no more work to do.
          return;
        }

        const found = findRequireCSSFromWithStylesCallExpression(node);
        if (found !== null) {
          cssFromWithStylesName = found;
        }
      },

      ImportDeclaration(node) {
        if (isCSSFound()) {
          // We've already found it, so there is no more work to do.
          return;
        }

        const found = findImportCSSFromWithStylesImportDeclaration(node);
        if (found !== null) {
          cssFromWithStylesName = found;
        }
      },

      JSXSpreadAttribute(node) {
        const functionName = getObjectSpreadFunctionName(node);
        const componentName = getComponentNameFromAttribute(node);

        if (!functionName || !componentName) return null;

        if (functionName === 'css') {
          if (restrictedComponents.has(componentName)) {
            context.report(node, "'<{{componentName}} />' must use the 'cssNoRTL' method in place of the 'css' method.", {
              componentName,
            });
          }
        }

        return null;
      },
    };
  },
};
