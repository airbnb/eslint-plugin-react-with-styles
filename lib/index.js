'use strict';

const cssNoRTLOnly = require('./rules/cssNoRTL-only.js');
const onlySpreadCSS = require('./rules/only-spread-css');
const noUnusedStyles = require('./rules/no-unused-styles');

module.exports = {
  rules: {
    'cssNoRTL-only': cssNoRTLOnly,
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
