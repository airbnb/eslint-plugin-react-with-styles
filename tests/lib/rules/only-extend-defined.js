/**
* @fileoverview Require that all styles that are extendable are defined on the component.
* @author Tae Kim
*/

'use strict';

const RuleTester = require('eslint').RuleTester;

const rule = require('../../../lib/rules/only-extend-defined');

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
    experimentalObjectRestSpread: true,
  },
  sourceType: 'module',
};

const ruleTester = new RuleTester();
ruleTester.run('only-extend-defined', rule, {

  valid: [
    {
      parserOptions,
      code: `
        import { css } from 'withStyles';
        <div className="foo" />
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';
        const foo = props.styles;
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo({ styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo({ styles }) {
          return (
            <div {...css(styles['foo'])} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo({ styles }) {
          return (
            <div {...css(styles[\`foo\`])} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo(props) {
          return (
            <div {...css(props.styles.foo)} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo(props) {
          return (
            <div {...css(props.styles['foo'])} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo(props) {
          return (
            <div {...css(props['styles'].foo)} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo(props) {
          return (
            <div {...css(props['styles']['foo'])} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo(props) {
          return (
            <div {...css(props.styles[\`foo\`])} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo(props) {
          return (
            <div {...css(props[\`styles\`].foo)} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo(props) {
          return (
            <div {...css(props[\`styles\`][\`foo\`])} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        class Foo extends React.Component {
          render() {
            return <div {...css(this.props.styles.foo)} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        class Foo extends React.Component {
          render() {
            return <div {...css(this.props.styles['foo'])} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        class Foo extends React.Component {
          render() {
            return <div {...css(this.props['styles']['foo'])} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        class Foo extends React.Component {
          render() {
            return <div {...css(this['props'].styles['foo'])} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        class Foo extends React.Component {
          render() {
            return <div {...css(this['props']['styles']['foo'])} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        class Foo extends React.Component {
          render() {
            return <div {...css(this.props.styles[\`foo\`])} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        class Foo extends React.Component {
          render() {
            return <div {...css(this.props[\`styles\`][\`foo\`])} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        class Foo extends React.Component {
          render() {
            return <div {...css(this[\`props\`].styles[\`foo\`])} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        class Foo extends React.Component {
          render() {
            return <div {...css(this[\`props\`][\`styles\`][\`foo\`])} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },


    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        class Foo extends React.Component {
          render() {
            const { styles } = this.props;
            return <div {...css(styles.foo)} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo({ styles }) {
          const something = isActive ? styles.foo : null;
          return <div {...css(something)} />;
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    { // TODO handle computed properties better?
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo({ styles }) {
          return (
            <div />
          );
        }

        export default withStyles(() => ({
          [foo]: {},
        }))(Foo);
      `.trim(),
    },

    { // TODO handle object spread better?
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo({ styles }) {
          return (
            <div />
          );
        }

        export default withStyles(() => ({
          ...foo,
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo({ styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(() => {
          return {
            foo: {},
          }
        })(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo({ styles }) {
          return (
            <div {...css(styles.foo, styles.bar)} />
          );
        }

        export default withStyles(() => ({
          foo: {},
          bar: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo({ styles }) {
          return (
            <div {...css(styles.foo)}>
              <div {...css(styles.bar)} />
            </div>
          );
        }

        export default withStyles(() => ({
          foo: {},
          bar: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(
          () => ({
            foo: {
              background: 'red',
            },
          }),
          {},
        )(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(
          () => ({
            foo: {
              background: 'red',
            },
          }),
          {
            extendableStyles: {},
          },
        )(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(
          () => ({
            foo: {
              background: 'red',
            },
          }),
          {
            extendableStyles: {
              foo: {
                background: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(
          () => ({
            foo: {
              background: 'red',
              color: 'blue',
              fontSize: 12,
            },
          }),
          {
            extendableStyles: {
              foo: {
                background: () => true,
                color: () => true,
                fontSize: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)}>
              <div {...css(styles.bar)}>FOO</div>
            </div>
          );
        }

        export default withStyles(
          () => ({
            foo: {
              background: 'red',
            },
            bar: {
              color: 'purple',
            }
          }),
          {
            extendableStyles: {
              foo: {
                background: () => true,
              },
              bar: {
                color: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)}>
              <div {...css(styles.bar)}>BAR</div>
              <div {...css(styles.zar)}>ZAR</div>
            </div>
          );
        }

        export default withStyles(
          () => ({
            foo: {
              background: 'red',
              fontSize: 12,
              padding: 30,
            },
            bar: {
              color: 'purple',
              margin: 15,
            },
            zar: {
              border: '1px solid black',
            },
          }),
          {
            extendableStyles: {
              foo: {
                background: () => true,
                fontSize: () => true,
                padding: () => true,
              },
              bar: {
                color: () => true,
                margin: () => true,
              },
              zar: {
                border: () => true,
              }
            },
          },
        )(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)}>
              <div {...css(styles.bar)}>BAR</div>
              <div {...css(styles.zar)}>ZAR</div>
            </div>
          );
        }

        export default withStyles(
          () => ({
            foo: {
              background: 'red',
              fontSize: 12,
              padding: 30,
            },
            bar: {
              color: 'purple',
              margin: 15,
            },
            zar: {
              border: '1px solid black',
            },
          }),
          {
            extendableStyles: {
              bar: {
                color: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        const className = 'foo';

        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(
          () => ({
            [className]: {
              background: 'red',
            },
          }),
          {
            extendableStyles: {
              [className]: {
                background: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        const className = 'foo';

        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(
          () => ({
            [className]: {
              background: 'red',
              color: 'purple',
              fontSize: 12,
            },
          }),
          {
            extendableStyles: {
              [className]: {
                background: () => true,
                color: () => true,
                fontSize: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        const styles = {
          background: 'red',
          color: 'purple',
          fontSize: 12,
        };

        const extendableStyles = {
          background: () => true,
          color: () => true,
          fontSize: () => true,
        };

        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(
          () => ({
            foo: {
              ...styles,
            },
          }),
          {
            extendableStyles: {
              foo: {
                ...extendableStyles
              },
            },
          },
        )(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        const extendableStyles = {
          background: () => true,
          color: () => true,
          fontSize: () => true,
        };

        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(
          () => ({
            foo: {
              background: 'red',
              color: 'purple',
              fontSize: 12,
            },
          }),
          {
            extendableStyles: {
              foo: {
                ...extendableStyles
              },
            },
          },
        )(Foo);
      `.trim(),
    },
  ],

  invalid: [
    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(
          () => ({}),
          {
            extendableStyles: {
              foo: {
                background: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
      errors: [{
        message: '`foo` is not extendable',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(
          () => ({
            foo: {},
          }),
          {
            extendableStyles: {
              foo: {
                background: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
      errors: [{
        message: '`background` is not extendable',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(
          () => ({
            foo: {
              background: 'red',
            },
          }),
          {
            extendableStyles: {
              bar: {
                background: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
      errors: [{
        message: '`bar` is not extendable',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(
          () => ({
            foo: {
              background: 'red',
            },
          }),
          {
            extendableStyles: {
              foo: {
                color: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
      errors: [{
        message: '`color` is not extendable',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(
          () => ({
            foo: {
              background: 'red',
            },
          }),
          {
            extendableStyles: {
              foo: {
                background: () => true,
                fontSize: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
      errors: [{
        message: '`fontSize` is not extendable',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(
          () => ({
            foo: {
              background: 'red',
            },
          }),
          {
            extendableStyles: {
              foo: {
                background: () => true,
                color: () => true,
                fontSize: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
      errors: [
        {
          message: '`color` is not extendable',
          type: 'Property',
        },
        {
          message: '`fontSize` is not extendable',
          type: 'Property',
        },
      ],
    },

    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)}>
              <div {...css(styles.bar)} />
            </div>
          );
        }

        export default withStyles(
          () => ({
            foo: {
              background: 'red',
            },
            bar: {
              color: 'purple',
            },
          }),
          {
            extendableStyles: {
              test: {
                background: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
      errors: [{
        message: '`test` is not extendable',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)}>
              <div {...css(styles.bar)} />
            </div>
          );
        }

        export default withStyles(
          () => ({
            foo: {
              background: 'red',
            },
            bar: {
              color: 'purple',
            },
          }),
          {
            extendableStyles: {
              foo: {
                color: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
      errors: [{
        message: '`color` is not extendable',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)}>
              <div {...css(styles.bar)} />
            </div>
          );
        }

        export default withStyles(
          () => ({
            foo: {
              background: 'red',
            },
            bar: {
              color: 'purple',
            },
          }),
          {
            extendableStyles: {
              bar: {
                background: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
      errors: [{
        message: '`background` is not extendable',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)}>
              <div {...css(styles.bar)} />
            </div>
          );
        }

        export default withStyles(
          () => ({
            foo: {
              background: 'red',
            },
            bar: {
              color: 'purple',
            },
          }),
          {
            extendableStyles: {
              foo: {
                fontSize: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
      errors: [{
        message: '`fontSize` is not extendable',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        const className = 'foo';

        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(
          () => ({
            [className]: {
              background: 'red',
            },
          }),
          {
            extendableStyles: {
              foo: {
                background: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
      errors: [{
        message: '`foo` is not extendable',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        const styles = {
          background: 'red',
          color: 'purple',
          fontSize: 12,
        };

        function Foo({ css, styles }) {
          return (
            <div {...css(styles.foo)} />
          );
        }

        export default withStyles(
          () => ({
            foo: {
              ...styles,
            },
          }),
          {
            extendableStyles: {
              foo: {
                background: () => true,
                color: () => true,
                fontSize: () => true,
              },
            },
          },
        )(Foo);
      `.trim(),
      errors: [
        {
          message: '`background` is not extendable',
          type: 'Property',
        },
        {
          message: '`color` is not extendable',
          type: 'Property',
        },
        {
          message: '`fontSize` is not extendable',
          type: 'Property',
        },
      ],
    },
  ],
});
