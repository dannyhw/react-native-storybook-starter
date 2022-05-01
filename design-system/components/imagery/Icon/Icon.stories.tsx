import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Icon as IconComponent} from './Icon';

export default {
    title: 'components/imagery/Icon',
    component: IconComponent,
  } as ComponentMeta<typeof Icon>;

  export const Icon = () => (
    <IconComponent/>
  );
  Icon.parameters = {
    design: [
        {
            name: 'Status',
            type: 'figma',
            url:'https://www.figma.com/proto/FQjrOHsfWVzRFy0oHYEQ29/imagery%2FIcon?page-id=0%3A1&node-id=2%3A673&viewport=329%2C48%2C1&scaling=scale-down-width',  
        },{
            name: 'Documentation',
            type: 'figma',
            url:'https://www.figma.com/proto/FQjrOHsfWVzRFy0oHYEQ29/imagery%2FIcon?page-id=2%3A1186&node-id=23%3A745&viewport=329%2C48%2C0.93&scaling=scale-down-width',
        },{
            name: 'Hand-off',
            type: 'figma',
            url:'https://www.figma.com/proto/FQjrOHsfWVzRFy0oHYEQ29/imagery%2FIcon?page-id=7%3A526&node-id=23%3A942&viewport=329%2C48%2C0.77&scaling=scale-down-width',    
        }
    ]
  }