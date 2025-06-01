import { expect, fn, userEvent, within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

import NeoButton, { type NeoButtonProps } from './NeoButton.vue'

const meta: Meta<typeof NeoButton> = {
  title: 'UI/NeoButton',
  component: NeoButton,
  tags: ['autodocs'],
  argTypes: {
    class: { control: 'text' },
    size: { control: 'select', options: ['default', 'sm', 'lg'] },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
    },
    disabled: { control: 'boolean' },
    default: { control: 'text' },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof NeoButton>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  size: 'default',
  variant: 'default',
  disabled: false,
  extendedShadow: false,
  extendOnHover: true,
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

export const Default: Story = {
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

export const Shadow: Story = {
  args: {
    ...defaultArgs,
    extendedShadow: true,
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
    size: 'lg',
  },
  render: (args) => renderFunction(args),
}
