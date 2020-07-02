'use strict';

// Traverse the style object and gather all possible paths
const gatherDefinedStylePaths = (acc, styleObject, currentPath = '') => {
  styleObject.properties.forEach((property) => {
    if (property.computed) {
      // Skip over computed properties for now.
      // e.g. `{ [foo]: { ... } }`
      // TODO handle this better?
      return;
    }

    if (property.type === 'ExperimentalSpreadProperty' || property.type === 'SpreadElement') {
      // Skip over object spread for now.
      // e.g. `{ ...foo }`
      // TODO handle this better?
      return;
    }

    const propertyName = property.key.value || property.key.name;
    const path = currentPath ? `${currentPath}.${propertyName}` : propertyName;

    // Save the path
    acc[path] = true;

    // Continue traversing
    if (property.value.type === 'ObjectExpression') {
      gatherDefinedStylePaths(acc, property.value, path);
    }
  });
};

// Traverse extendable styles and validate that all possible paths exist in the defined styles
const checkExtendedStyles = (context, definedStylePaths, extendedStyle, currentPath = '') => {
  extendedStyle.properties.forEach((property) => {
    if (property.computed) {
      // Skip over computed properties for now.
      // e.g. `{ [foo]: { ... } }`
      // TODO handle this better?
      return;
    }

    if (property.type === 'ExperimentalSpreadProperty' || property.type === 'SpreadElement') {
      // Skip over object spread for now.
      // e.g. `{ ...foo }`
      // TODO handle this better?
      return;
    }

    const propertyName = property.key.value || property.key.name;
    const path = currentPath ? `${currentPath}.${propertyName}` : propertyName;

    // Fire the lint rule if the path is not found
    if (!definedStylePaths[path]) {
      context.report(
        property,
        `\`${propertyName}\` is not extendable`
      );
      return;
    }

    // Continue traversing
    if (property.value.type === 'ObjectExpression') {
      checkExtendedStyles(context, definedStylePaths, property.value, path);
    }
  });
};

module.exports = {
  meta: {
    docs: {
      description: 'Require that all styles that are extendable are defined on the component.',
      recommended: true,
    },

    schema: [],
  },

  create: function rule(context) {
    // Paths that exist in the defined styles
    const definedStyles = {};

    return {
      CallExpression(node) {
        if (node.callee.name === 'withStyles') {
          const styles = node.arguments[0];
          if (styles && styles.type === 'ArrowFunctionExpression') {
            const body = styles.body;

            let stylesObj;
            if (body.type === 'ObjectExpression') {
              stylesObj = body;
            } else if (body.type === 'BlockStatement') {
              body.body.forEach((bodyNode) => {
                if (
                  bodyNode.type === 'ReturnStatement'
                  && bodyNode.argument.type === 'ObjectExpression'
                ) {
                  stylesObj = bodyNode.argument;
                }
              });
            }

            if (stylesObj) {
              gatherDefinedStylePaths(definedStyles, stylesObj);
            }
          }

          const options = node.arguments[1];
          if (options && options.type === 'ObjectExpression') {
            options.properties.forEach((optionProperty) => {
              if (optionProperty.key.name === 'extendableStyles' && optionProperty.value.type === 'ObjectExpression') {
                checkExtendedStyles(context, definedStyles, optionProperty.value);
              }
            });
          }
        }
      },
    };
  },
};
