import type { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';
import { TypingEvents, typingEventsHandle } from './TypingEvents';

// Polls until `get` returns a value, since the story may not be mounted or
// re-rendered yet when the play function runs.
async function waitFor<T>(
  get: () => T | null | undefined | false,
  timeoutMs = 5000,
): Promise<T | null> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const result = get();
    if (result) {
      return result;
    }
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  return null;
}

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

After each dispatch the story asserts that the same event object reached both
the \`onKeyPress\` prop and the container listener. Dispatch is synchronous, so
this is checked right after \`dispatchEvent\` returns. Failures are counted,
logged and reported with \`console.error\`.

The \`play\` function types \`args.text\` the same way, then uses \`expect\` to
check the input holds exactly that text. Its result shows under the
assertions, since React Native has no interactions panel.

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
  play: async ({ args }) => {
    const handle = await waitFor(() => typingEventsHandle.current);
    if (!handle) {
      throw new Error('TypingEvents story did not mount');
    }

    handle.reset();
    handle.setPlayStatus(`typing "${args.text}"…`);
    await handle.typeText(args.text);

    try {
      await waitFor(() => handle.getInputText() === args.text);
      await expect(handle.getInputText()).toBe(args.text);
      handle.setPlayStatus(`✓ input contains "${args.text}"`);
    } catch (error) {
      handle.setPlayStatus(`✗ ${(error as Error).message}`);
      throw error;
    }
  },
};
