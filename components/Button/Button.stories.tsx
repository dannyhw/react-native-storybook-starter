// stories/MyButton.stories.tsx
import type {Meta, StoryObj} from '@storybook/react';

import {MyButton} from './Button';

const meta: Meta<typeof MyButton> = {
  title: 'components/MyButton',
  component: MyButton,
};

export default meta;

export const Basic: StoryObj<typeof MyButton> = {
  args: {
    text: 'Hello World',
    color: 'purple',
  },
};
