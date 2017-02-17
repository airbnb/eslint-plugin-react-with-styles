'use strict';

const findImportCSSFromWithStylesImportDeclaration = require('../util/findImportCSSFromWithStylesImportDeclaration');
const findRequireCSSFromWithStylesCallExpression = require('../util/findRequireCSSFromWithStylesCallExpression');

module.exports = {
  meta: {
    docs: {
      description: 'Require that css() is only spread into a JSX element without a `className` or `style` prop',
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

    return {
      CallExpression(node) {
        const found = findRequireCSSFromWithStylesCallExpression(node);
        if (found !== null) {
          cssFromWithStylesName = found;
        }

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

        const found = findImportCSSFromWithStylesImportDeclaration(node);
        if (found !== null) {
          cssFromWithStylesName = found;
        }
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
          }
        });
      },
    };
  },
};
