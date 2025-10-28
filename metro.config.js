const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
  withStorybook,
} = require('@storybook/react-native/metro/withStorybook');
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

const defaultConfig = getDefaultConfig(__dirname);

const finalConfig = mergeConfig(defaultConfig, config);

module.exports = withStorybook(finalConfig, {
  // set this to "enabled: true" to enable storybook config always
  enabled: process.env.STORYBOOK_ENABLED === 'true',
  liteMode: true,
});
