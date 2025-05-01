import type { Meta, StoryObj } from '@storybook/vue3'

import NeoInput, { type NeoInputProps } from './NeoInput.vue'

const meta = {
  title: 'Atoms/NeoInput',
  component: NeoInput,
  tags: ['autodocs'],
} satisfies Meta<typeof NeoInput>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  id: 'neo-input',
  scaleOnFocus: true,
  disabled: false,
  placeholder: 'Test',
} as NeoInputProps

const renderFunction = (args: NeoInputProps) => ({
  components: { NeoInput },
  setup() {
    return { args }
  },
  template: `
    <NeoInput v-bind="args" />
  `,
})

export const Primary: Story = {
  args: {
    ...defaultArgs,
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
