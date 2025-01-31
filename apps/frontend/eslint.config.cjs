const vue = require('eslint-plugin-vue');
const baseConfig = require('../../eslint.config.cjs');
const prettier = require('eslint-config-prettier');

module.exports = [
  ...baseConfig,
  ...vue.configs['flat/recommended'],
  prettier,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: require('@typescript-eslint/parser'),
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
];
