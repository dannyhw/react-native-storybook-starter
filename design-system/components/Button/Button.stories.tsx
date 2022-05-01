// stories/MyButton.stories.tsx
import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {MyButton} from './Button';

export default {
  title: 'components/MyButton',
  component: MyButton,
} as ComponentMeta<typeof MyButton>;

export const Basic: ComponentStory<typeof MyButton> = args => (
  <MyButton {...args} />
);
Basic.parameters = {
  design: [{
    name: 'Status',
    type: 'figma',
    url:
      'https://www.figma.com/proto/hq0i18XppXSwxp0EuVnYfB/primitives%2FText?page-id=0%3A1&node-id=2%3A673&viewport=329%2C48%2C1&scaling=min-zoom',

  },{
    name: 'Documentation',
    type: 'figma',
    url:
      'https://www.figma.com/proto/hq0i18XppXSwxp0EuVnYfB/primitives%2FText?page-id=2%3A1186&node-id=23%3A745&viewport=329%2C48%2C0.5&scaling=min-zoom',

  },
 
  {
    name: 'Hand-off',
    type: 'figma',
    url:
      'https://www.figma.com/proto/hq0i18XppXSwxp0EuVnYfB/primitives%2FText?page-id=7%3A526&node-id=22%3A1403&viewport=329%2C48%2C0.71&scaling=min-zoom',

  }
]
}
Basic.args = {
  text: 'Hello World',
  color: 'purple',
};