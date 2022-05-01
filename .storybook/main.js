module.exports = {
  stories: ['../design-system/**/*.stories.?(ts|tsx|js|jsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-react-native-web',
    'storybook-addon-designs',
    'storybook-addon-github-issues',
  ],
  framework: '@storybook/react',
};
