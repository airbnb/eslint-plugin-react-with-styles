'use strict';

module.exports = {
  meta: {
    docs: {
      description: 'Require that css() is only spread into a JSX element without a `className` or `style` prop',
      recommended: true,
    },

    schema: [],
  },

  create: function rule(context) {
    const CSS_METHOD_NAME = 'css';
    return {
      CallExpression(node) {
        if (node.callee.name !== CSS_METHOD_NAME) {
          // foo()
          return;
        }

        if (node.parent.type === 'JSXSpreadAttribute') {
          // <div {...css()} />
          return;
        }

        context.report(
          node,
          `Only spread \`${CSS_METHOD_NAME}()\` directly into an element, e.g. \`<div {...${CSS_METHOD_NAME}(foo)} />\`.`
        );
      },

      JSXSpreadAttribute(node) {
        if (node.argument.type !== 'CallExpression') {
          // <div {...foo} />
          //
          // TODO make this work for
          // const foo = css(bar);
          // <div {...foo} />
          return;
        }

        if (node.argument.callee.name !== CSS_METHOD_NAME) {
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
              `Do not use \`className\` with \`{...${CSS_METHOD_NAME}()}\`.`
            );
            return;
          }

          if (attribute.name.name === 'style') {
            context.report(
              attribute,
              `Do not use \`style\` with \`{...${CSS_METHOD_NAME}()}\`.`
            );
          }
        });
      },
    };
  },
};
