/** @type{import("@storybook/react-webpack5").StorybookConfig} */
export default {
  stories: ['../src/components/**/*.stories.?(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
