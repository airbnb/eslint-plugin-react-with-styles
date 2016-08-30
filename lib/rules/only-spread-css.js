'use strict';

module.exports = {
  meta: {
    docs: {
      description: // eslint-disable-next-line max-len
        'Require that css() is only spread into a JSX element without a `className` or `style` prop',
      recommended: true,
    },

    schema: [],
  },

  create: function rule(context) {
    // If `css()` is imported by this file, we want to store what it is imported
    // as in this variable so we can verify where it is used.
    let cssFromWithStylesName;

    function isCSSFound() {
      return !!cssFromWithStylesName;
    }

    function findRequireCSSFromWithStylesCallExpression(node) {
      if (isCSSFound()) {
        // We've already found it, so there is no more work to do.
        return;
      }

      if (node.callee.name !== 'require') {
        // foo();
        return;
      }

      if (!node.arguments.length) {
        // require();
        return;
      }

      if (!node.arguments[0].value) {
        // require(foo);
        return;
      }

      if (!node.arguments[0].value.endsWith('withStyles')) {
        // require('foo');
        return;
      }

      if (node.parent.type !== 'VariableDeclarator') {
        return;
      }

      if (node.parent.id.type !== 'ObjectPattern') {
        // const foo = require('withStyles');
        return;
      }

      node.parent.id.properties.some((property) => {
        if (property.key.name !== 'css') {
          // This is not the import that we are looking for.
          // const { withStyles } = require('withStyles');
          return false;
        }

        cssFromWithStylesName = property.value.name;
        return true;
      });
    }

    return {
      CallExpression(node) {
        findRequireCSSFromWithStylesCallExpression(node);

        // foo()
        if (!isCSSFound()) {
          // We are not importing `css` from withStyles, so we have no work to
          // do here.
          return;
        }

        if (node.callee.name !== cssFromWithStylesName) {
          // foo()
          return;
        }

        if (node.parent.type === 'JSXSpreadAttribute') {
          // <div {...css()} />
          return;
        }

        context.report(
          node,
          // eslint-disable-next-line max-len
          `Only spread \`${cssFromWithStylesName}()\` directly into an element, e.g. \`<div {...${cssFromWithStylesName}(foo)} />\`.`
        );
      },

      ImportDeclaration(node) {
        if (isCSSFound()) {
          // We've already found it, so there is no more work to do.
          return;
        }

        if (!node.source.value.endsWith('withStyles')) {
          return;
        }

        if (!node.specifiers.length) {
          // import 'foo';
          return;
        }

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

          cssFromWithStylesName = specifier.local.name;
          return true;
        });
      },

      JSXSpreadAttribute(node) {
        // <div {...foo()} />
        if (!isCSSFound()) {
          // We are not importing `css` from withStyles, so we have no work to
          // do here.
          return;
        }

        if (node.argument.type !== 'CallExpression') {
          // <div {...foo} />
          //
          // TODO make this work for
          // const foo = css(bar);
          // <div {...foo} />
          return;
        }

        if (node.argument.callee.name !== cssFromWithStylesName) {
          // <div {...foo()} />
          return;
        }

        // At this point, we know that this JSX is using `css()` from
        // withStyles, so let's see if it is also using `className` or `style`.
        node.parent.attributes.forEach((attribute) => {
          if (attribute === node) {
            // This is the `{...css(foo)}` bit, so let's skip it.
            return;
          }

          if (attribute.type === 'JSXSpreadAttribute') {
            // TODO dig into other spread things to see if we can find a
            // `className` or `style` prop. This would require a bunch of manual
            // bookkeeping about variables and scopes.
            //
            // e.g.
            //
            //   const foo = { className: 'hi' };
            //   <div {...css(styles.bar)} {...foo} />
            return;
          }

          if (attribute.name.name === 'className') {
            context.report(
              attribute,
              `Do not use \`className\` with \`{...${cssFromWithStylesName}()}\`.`
            );
            return;
          }

          if (attribute.name.name === 'style') {
            context.report(
              attribute,
              `Do not use \`style\` with \`{...${cssFromWithStylesName}()}\`.`
            );
            return;
          }
        });
      },
    };
  },
};
