import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { MyButton } from './Button';

const meta = {
  component: MyButton,
  parameters: {
    notes: `
# Button

A simple pressable button built on \`TouchableOpacity\`.

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| \`text\` | \`string\` | yes | Label shown inside the button |
| \`onPress\` | \`() => void\` | yes | Called when the button is pressed |
| \`color\` | \`string\` | no | Background color, defaults to purple |
| \`textColor\` | \`string\` | no | Label color, defaults to white |

## Usage

\`\`\`tsx
<MyButton text="Save" color="green" onPress={() => save()} />
\`\`\`

## Try it

- [x] Change \`text\` and \`color\` in the **Controls** tab
- [ ] Press the button and check the **Actions** tab for \`onPress\`
`,
  },
} satisfies Meta<typeof MyButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: 'Hello World',
    color: 'purple',
    onPress: fn(),
  },
};

export const Secondary: Story = {
  args: {
    text: 'Secondary Button',
    color: 'blue',
    onPress: fn(),
  },
  parameters: {
    notes: `
# Secondary

Use for less prominent actions next to a primary button.

- Background: **blue**
- Label: white (set \`textColor\` to override)

> Notes set on a story replace the component notes from \`meta\`.
`,
  },
};
