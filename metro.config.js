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

module.exports = withStorybook(finalConfig, {
    enabled: process.env.STORYBOOK_ENABLED === 'true',
    configPath: path.resolve(__dirname, './.ondevice'),
});
