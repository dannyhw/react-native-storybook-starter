const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
const withStorybook = require('@storybook/react-native/metro/withStorybook');
const defaultConfig = getDefaultConfig(__dirname);
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

const finalConfig = mergeConfig(defaultConfig, config);

/**
 * @type {import('@storybook/react-native/metro/withStorybook').WithStorybookOptions}
 */
const storybookOptions = {
  // set this to "enabled: true" to enable storybook config always
  enabled: process.env.STORYBOOK_ENABLED === 'true',
  configPath: path.resolve(__dirname, './.ondevice'),

  // set this to true to remove storybook from the bundle when disabled
  onDisabledRemoveStorybook: false,
};

module.exports = withStorybook(finalConfig, storybookOptions);
