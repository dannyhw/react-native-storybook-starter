
import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {CurrencyIcon as CurrencyIconComponent} from './CurrencyIcon';

export default {
    title: 'components/imagery/CurrencyIcon',
    component: CurrencyIconComponent,
  } as ComponentMeta<typeof CurrencyIconComponent>;

  export const CurrencyIcon = () => (
    <CurrencyIconComponent/>
  );
  CurrencyIcon.parameters = {
    design: [
        {
            name: 'Status',
            type: 'figma',
            url:'https://www.figma.com/proto/D3sQceqMmmb26URCQfxCPs/imagery%2FCurrencyIcon?page-id=0%3A1&node-id=2%3A673&viewport=329%2C48%2C1.62&scaling=scale-down-width',  
        },{
            name: 'Documentation',
            type: 'figma',
            url:'https://www.figma.com/proto/D3sQceqMmmb26URCQfxCPs/imagery%2FCurrencyIcon?page-id=2%3A1186&node-id=23%3A745&viewport=329%2C48%2C0.5&scaling=scale-down-width&starting-point-node-id=23%3A745',
        },{
            name: 'Hand-off',
            type: 'figma',
            url:'https://www.figma.com/proto/D3sQceqMmmb26URCQfxCPs/imagery%2FCurrencyIcon?page-id=7%3A526&node-id=23%3A942&viewport=329%2C48%2C0.7&scaling=scale-down-width',    
        }
    ]
  }