import type { Meta, StoryObj } from '@storybook/react';
import { TypingEvents } from './TypingEvents';

const meta = {
  component: TypingEvents,
  parameters: {
    notes: `
# Typing with dispatched events

Each character is sent to the \`TextInput\` ref with
\`dispatchEvent(new Event('keypress', { bubbles: true }))\`, carrying a
\`nativeEvent.key\` like the native event does.

The event runs the input's \`onKeyPress\` prop, which updates the controlled
\`value\`, and React Native then pushes that text to the native field. The event
bubbles, so the container's \`addEventListener('keypress')\` counts it too.

\`dispatchEvent\` only runs JS listeners and props: it does not make the native
keyboard insert text, so the prop has to apply the key itself. Typing on the
real keyboard still works and is logged as a native keypress.
`,
  },
  argTypes: {
    delayMs: {
      control: { type: 'range', min: 0, max: 500, step: 10 },
    },
  },
} satisfies Meta<typeof TypingEvents>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: 'Hello from dispatchEvent',
    delayMs: 80,
  },
};
