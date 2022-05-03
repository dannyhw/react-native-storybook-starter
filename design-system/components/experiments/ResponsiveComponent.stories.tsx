import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {ResponsiveComponent} from './ResponsiveComponent';

export default {
    title: 'experimets/Responsive',
    component: ResponsiveComponent,
  } as ComponentMeta<typeof ResponsiveComponent>;

  export const Responsive = () => (
    <ResponsiveComponent/>
  );
  