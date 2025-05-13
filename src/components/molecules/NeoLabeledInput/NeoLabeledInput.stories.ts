import type { Meta, StoryObj } from '@storybook/vue3'

import NeoLabeledInput, { type NeoLabeledInputProps } from './NeoLabeledInput.vue'

const meta: Meta<typeof NeoLabeledInput> = {
  title: 'Molecules/NeoLabeledInput',
  component: NeoLabeledInput,
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'select', options: ['vertical', 'horizontal'] },
    default: { control: 'text' },
  },
} satisfies Meta<typeof NeoLabeledInput>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  id: 'neo-labeled-input',
  default: 'Label Text',
  placeholder: '',
  disabled: false,
  layout: 'vertical',
} as NeoLabeledInputProps

const renderFunction = (args: NeoLabeledInputProps) => ({
  components: { NeoLabeledInput },
  setup() {
    return { args }
  },
  template: `
    <NeoLabeledInput v-bind="args">
      {{ args.default }}
    </NeoLabeledInput>
  `,
})

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => renderFunction(args),
}

export const Horizontal: Story = {
  args: {
    ...defaultArgs,
    layout: 'horizontal',
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
