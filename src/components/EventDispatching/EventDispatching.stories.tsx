import type { Meta, StoryObj } from '@storybook/react';
import { EventDispatching } from './EventDispatching';

const meta = {
  component: EventDispatching,
  parameters: {
    notes: `
# Event dispatching

React Native 0.88 dispatches events through the W3C \`EventTarget\` API. At the
**Canary** release level, native refs also expose \`addEventListener\`,
\`removeEventListener\` and \`dispatchEvent\`.

The outer view has a capture and a bubble listener, the inner view has a
listener plus declarative props. Tap the inner view and check the order:

1. outer capture listener
2. inner props, then inner listener
3. outer bubble listener (skipped when \`stopAtTarget\` is on)
`,
  },
  argTypes: {
    eventType: {
      control: 'select',
      options: ['click', 'pointerdown', 'pointerup', 'touchstart', 'touchend'],
    },
  },
} satisfies Meta<typeof EventDispatching>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Click: Story = {
  args: {
    eventType: 'click',
    stopAtTarget: false,
  },
};

export const StopPropagation: Story = {
  args: {
    eventType: 'click',
    stopAtTarget: true,
  },
};

export const PointerDown: Story = {
  args: {
    eventType: 'pointerdown',
    stopAtTarget: false,
  },
};

export const TouchStart: Story = {
  args: {
    eventType: 'touchstart',
    stopAtTarget: false,
  },
};
