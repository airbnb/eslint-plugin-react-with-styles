'use strict';

const onlySpreadCSS = require('./rules/only-spread-css');
const noUnusedStyles = require('./rules/no-unused-styles');

module.exports = {
  rules: {
    'only-spread-css': onlySpreadCSS,
    'no-unused-styles': noUnusedStyles,
  },

  configs: {
    recommended: {
      rules: {
        'react-with-styles/only-spread-css': 'error',
        'react-with-styles/no-unused-styles': 'error',
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
