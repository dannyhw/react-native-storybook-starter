
import ThemeDecorator from './ThemeDecorator';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export const decorators = [ThemeDecorator]
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  issues: {
    repository: process.env.GITHUB_REPOSITORY,
    token: process.env.GITHUB_TOKEN,
  },
}

