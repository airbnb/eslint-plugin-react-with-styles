'use strict';

const onlySpreadCSS = require('./rules/only-spread-css');
const noUnusedStyles = require('./rules/no-unused-styles');
const onlyExtendDefined = require('./rules/only-extend-defined');

module.exports = {
  rules: {
    'only-spread-css': onlySpreadCSS,
    'no-unused-styles': noUnusedStyles,
    'only-extend-defined': onlyExtendDefined,
  },

  configs: {
    recommended: {
      rules: {
        'react-with-styles/only-spread-css': 'error',
        'react-with-styles/no-unused-styles': 'error',
        'react-with-styles/only-extend-defined': 'error',
        'no-restricted-imports': ['error', {
          paths: [{
            name: 'react-with-styles',
            importNames: ['css', 'cssNoRTL'],
            message: 'The global `css` and `cssNoRTL` exports are deprecated. Please use `this.props.css` instead!',
          }],
        }],
      },
    },
  },
};
