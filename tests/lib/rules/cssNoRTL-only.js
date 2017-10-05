/**
 * @fileoverview Tests for cssNoRTL-only.
 * @author Maja Wichrowska
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/cssNoRTL-only');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('cssNoRTL-only', rule, {
  valid: [
    {
      code: `
        import { css } from 'react-with-styles';
        <div {...css()} />
      `,
      options: [],
    },
    {
      code: `
        import { css } from 'react-with-styles';
        <div {...css} />
      `,
      options: ['Animated'],
    },
    {
      code: `
        import { css } from 'react-with-styles';
        <div {...cssNoRTL()} />
      `,
      options: [],
    },
    {
      code: `
        import { css } from 'react-with-styles';
        <div {...css()} />
      `,
      options: ['Animated'],
    },
    {
      code: `
        import { css } from 'react-with-styles';
        <div {...cssNoRTL()} />
      `,
      options: ['Animated', 'Motion'],
    },
    {
      code: `
        import { css } from 'react-with-styles';
        <Animated {...cssNoRTL()} />
      `,
      options: ['Animated', 'Motion'],
    },
    {
      code: `
        import { css } from 'react-with-styles';
        <Motion {...cssNoRTL()} />
      `,
      options: ['Animated', 'Motion'],
    },
  ],
  invalid: [
    {
      code: `
        import { css } from 'react-with-styles';
        <Animated {...css()} />
      `,
      options: ['Animated', 'Motion'],
      errors: [{
        message: "'<Animated />' must use the 'cssNoRTL' method in place of the 'css' method.",
        type: 'JSXSpreadAttribute',
      }],
    },
    {
      code: `
        const css = require('react-with-styles').css;
        <Animated {...css()} />
      `,
      options: ['Animated', 'Motion'],
      errors: [{
        message: "'<Animated />' must use the 'cssNoRTL' method in place of the 'css' method.",
        type: 'JSXSpreadAttribute',
      }],
    },
  ],
});
