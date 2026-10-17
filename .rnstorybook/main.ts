import { StorybookConfig } from '@storybook/react-native';

const main: StorybookConfig = {
  stories: ['../src/components/**/*.stories.?(ts|tsx|js|jsx)'],
  deviceAddons: [
    '@storybook/addon-ondevice-notes',
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-backgrounds',
    '@storybook/addon-ondevice-actions',
  ],
  features: {},
  reactNative: {
    playFn: true,
  },
};

export default main;
