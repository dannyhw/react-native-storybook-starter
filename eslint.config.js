const { defineConfig } = require('eslint/config');
const reactNativeConfig = require('@react-native/eslint-config/flat');

module.exports = defineConfig([
  { ignores: ['.yarn'] },
  ...reactNativeConfig.filter(
    // ft-flow is not compatible with flat config
    config => config.plugins?.['ft-flow'] === undefined,
  ),
]);
