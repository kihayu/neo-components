import type { Meta, StoryObj } from '@storybook/vue3'

import NeoButton, { type NeoButtonProps } from './NeoButton.vue'

const meta: Meta<typeof NeoButton> = {
  title: 'Atoms/NeoButton',
  component: NeoButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['medium', 'large'] },
    variant: { control: 'select', options: ['primary', 'error', 'success', 'warning'] },
    default: { control: 'text' },
  },
} satisfies Meta<typeof NeoButton>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  size: 'md',
  variant: 'primary',
  disabled: false,
  extendedShadow: false,
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

export const Small: Story = {
  args: {
    ...defaultArgs,
    size: 'sm',
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
