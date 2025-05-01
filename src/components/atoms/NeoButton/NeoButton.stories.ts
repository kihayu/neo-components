import { expect, fn, userEvent, within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

import NeoButton, { type NeoButtonProps } from './NeoButton.vue'

const meta = {
  title: 'Atoms/NeoButton',
  component: NeoButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['medium', 'large'] },
    type: { control: 'select', options: ['primary', 'error', 'success', 'warning'] },
    default: { control: 'text' },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof NeoButton>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  size: 'medium',
  type: 'primary',
  disabled: false,
  extendedShadow: true,
  default: 'Button',
} as NeoButtonProps

const renderFunction = (args: NeoButtonProps) => ({
  components: { NeoButton },
  setup() {
    return { args }
  },
  template: `
    <NeoButton v-bind="args">
      {{ args.default }}
    </NeoButton>
  `,
})

export const Primary: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => renderFunction(args),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /Button/i })
    await expect(button).toBeInTheDocument()
    await userEvent.click(button)
    expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const NoShadow: Story = {
  args: {
    ...defaultArgs,
    extendedShadow: false,
  },
  render: (args) => renderFunction(args),
}

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true,
  },
  render: (args) => renderFunction(args),
}

export const Large: Story = {
  args: {
    ...defaultArgs,
    size: 'large',
  },
  render: (args) => renderFunction(args),
}
