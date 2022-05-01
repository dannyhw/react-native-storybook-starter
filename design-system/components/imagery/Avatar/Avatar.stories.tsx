import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Avatar as AvatarComponent} from './Avatar';

export default {
    title: 'components/imagery/Avatar',
    component: AvatarComponent,
  } as ComponentMeta<typeof AvatarComponent>;

  export const Avatar = () => (
    <AvatarComponent/>
  );
  Avatar.parameters = {
    design: [
        {
            name: 'Status',
            type: 'figma',
            url:'https://www.figma.com/proto/HN6q5ECt0hYoq4vgtoKdOv/imagery%2FAvatar?page-id=0%3A1&node-id=2%3A673&viewport=329%2C48%2C1&scaling=scale-down-width',  
        },{
            name: 'Documentation',
            type: 'figma',
            url:'https://www.figma.com/proto/HN6q5ECt0hYoq4vgtoKdOv/imagery%2FAvatar?page-id=2%3A1186&node-id=23%3A745&viewport=329%2C48%2C0.44&scale-down-width&starting-point-node-id=23%3A745',
        },{
            name: 'Hand-off',
            type: 'figma',
            url:'https://www.figma.com/proto/HN6q5ECt0hYoq4vgtoKdOv/imagery%2FAvatar?page-id=7%3A526&node-id=23%3A942&viewport=329%2C48%2C0.75&scaling=scale-down-width',    
        }
    ]
  }