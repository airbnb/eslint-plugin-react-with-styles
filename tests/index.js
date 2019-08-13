'use strict';

const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');

const plugin = require('..');

const ruleFiles = fs.readdirSync(path.resolve(__dirname, '../lib/rules/'))
  .map((f) => path.basename(f, '.js'));

describe('all rule files are exported by the plugin', () => {
  ruleFiles.forEach((ruleName) => {
    it(`exports ${ruleName}`, () => {
      expect(plugin.rules[ruleName])
        // eslint-disable-next-line global-require, import/no-dynamic-require
        .to.eql(require(path.join('../lib/rules', ruleName)));
    });
  });
});

describe('configurations', () => {
  it('exports a "recommended" configuration', () => {
    expect(plugin.configs.recommended).to.not.equal(null);
    expect(plugin.configs.recommended).to.not.equal(undefined);
    expect(plugin.configs.recommended).to.not.be.eql({});
  });

  it('has rules in the "recommended" configuration', () => {
    expect(Object.keys(plugin.configs.recommended).length).to.be.above(0);
  });

  it('has correctly-formatted rule names in the "recommended" configuration', () => {
    Object.keys(plugin.configs.recommended.rules).forEach((configName) => {
      if (configName === 'no-restricted-imports') return;
      expect(configName.startsWith('react-with-styles/')).to.equal(true);
    });
  });

  it('has synchronized recommended metadata', () => {
    ruleFiles.forEach((ruleName) => {
      const fullRuleName = `react-with-styles/${ruleName}`;
      const inRecommendedConfig = Boolean(plugin.configs.recommended.rules[fullRuleName]);
      const isRecommended = plugin.rules[ruleName].meta.docs.recommended;
      if (inRecommendedConfig) {
        expect(isRecommended, `${ruleName} metadata should mark it as recommended`)
          .to.equal(true);
      } else {
        expect(isRecommended, `${ruleName} metadata should not mark it as recommended`)
          .to.equal(false);
      }
    });
  });

  it('has all "recommended" rule names that match rule names', () => {
    Object.keys(plugin.configs.recommended.rules).forEach((configName) => {
      if (configName === 'no-restricted-imports') return;
      const ruleName = configName.substring('react-with-styles/'.length);
      const rule = plugin.rules[ruleName];

      expect(rule).to.not.equal(null);
      expect(rule).to.not.equal(undefined);
      expect(rule).to.not.eql({});
    });
  });
});
