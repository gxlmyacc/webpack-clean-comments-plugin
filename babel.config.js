// const camelCase =  require('camelcase');
// const path = require('path');

module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-syntax-jsx',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-strict-mode',
    '@babel/plugin-transform-parameters',
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-json-strings',
    '@babel/plugin-transform-spread',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-transform-arrow-functions'
  ]
};
