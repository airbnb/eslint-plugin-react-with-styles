/**
* @fileoverview Require that all styles that are defined are also referenced in the same file
* @author Joe Lencioni
*/

'use strict';

const rule = require('../../../lib/rules/no-unused-styles');

const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
    experimentalObjectRestSpread: true,
  },
  sourceType: 'module',
};

const ruleTester = new RuleTester();
ruleTester.run('no-unused-styles', rule, {

  valid: [
    {
      parserOptions,
      code: `
        <div className="foo" />
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
  ],

  invalid: [
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
          bar: {},
        }))(Foo);
      `.trim(),
      errors: [{
        message: 'Style `bar` is unused',
        type: 'Property',
      }],
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
            bar: {},
          }
        })(Foo);
      `.trim(),
      errors: [{
        message: 'Style `bar` is unused',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        class Foo extends React.Component {
          render() {
            return (
              <div {...css(this.props.nonsense.foo)} />
            );
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
      errors: [{
        message: 'Style `foo` is unused',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo(props) {
          return (
            <div {...css(props.nonsense.foo)} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
      errors: [{
        message: 'Style `foo` is unused',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo(props) {
          return (
            <div {...css(props.styles.foo.bar)} />
          );
        }

        export default withStyles(() => ({
          bar: {},
        }))(Foo);
      `.trim(),
      errors: [{
        message: 'Style `bar` is unused',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        import { css } from 'withStyles';

        function Foo(props) {
          return (
            <div {...css(props.props.props.styles.foo)} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
      errors: [{
        message: 'Style `foo` is unused',
        type: 'Property',
      }],
    },
  ],
});
