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
      },
    },
  },
};
