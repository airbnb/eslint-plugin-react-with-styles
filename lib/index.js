'use strict';

const onlySpreadCSS = require('./rules/only-spread-css');

module.exports = {
  rules: {
    'only-spread-css': onlySpreadCSS,
  },

  configs: {
    recommended: {
      rules: {
        'react-with-styles/only-spread-css': 2,
      },
    },
  },
};
