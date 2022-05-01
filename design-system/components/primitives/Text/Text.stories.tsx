import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Text as TextComponent} from './Text';

export default {
    title: 'components/primitives/Text',
    component: TextComponent,
  } as ComponentMeta<typeof Text>;

  export const Text = () => (
    <TextComponent/>
  );
  Text.parameters = {
    design: [
        {
            name: 'Status',
            type: 'figma',
            url:'https://www.figma.com/proto/hq0i18XppXSwxp0EuVnYfB/primitives%2FText?page-id=0%3A1&node-id=2%3A673&viewport=329%2C48%2C1&scaling=min-zoom',  
        },{
            name: 'Documentation',
            type: 'figma',
            url:'https://www.figma.com/proto/hq0i18XppXSwxp0EuVnYfB/primitives%2FText?page-id=2%3A1186&node-id=23%3A745&viewport=329%2C48%2C0.5&scaling=min-zoom',
        },{
            name: 'Hand-off',
            type: 'figma',
            url:'https://www.figma.com/proto/hq0i18XppXSwxp0EuVnYfB/primitives%2FText?page-id=7%3A526&node-id=22%3A1403&viewport=329%2C48%2C0.71&scaling=min-zoom',    
        },{
            name: 'Spec',
            type: 'figspec',
            url:'https://www.figma.com/file/hq0i18XppXSwxp0EuVnYfB/primitives%2FText?node-id=201%3A627',  
            accessToken: process.env.SB_FIGMA_ACCESS_TOKEN,  
        }

        
    ]
  }