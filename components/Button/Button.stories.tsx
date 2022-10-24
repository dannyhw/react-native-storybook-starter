// stories/MyButton.stories.tsx

import {ComponentMeta, StoryObj} from '@storybook/react';

import {ButtonProps, MyButton} from './Button';

export default {
  title: 'components/MyButton',
  component: MyButton,
} as ComponentMeta<typeof MyButton>;

export const Basic: StoryObj<ButtonProps> = {
  args: {
    text: 'Hello World',
    color: 'purple',
  },
};
