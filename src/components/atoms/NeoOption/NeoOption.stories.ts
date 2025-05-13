import type { Meta, StoryObj } from '@storybook/vue3'

import NeoOption, { type NeoOptionProps } from './NeoOption.vue'

const meta = {
  title: 'Atoms/NeoOption',
  component: NeoOption,
  tags: ['autodocs'],
  argTypes: {
    selected: { control: 'boolean' },
  },
} satisfies Meta<typeof NeoOption>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  selected: false,
  default: 'Option Text',
} as NeoOptionProps

const renderFunction = (args: NeoOptionProps) => ({
  components: { NeoOption },
  setup() {
    return { args }
  },
  template: `
    <NeoOption v-bind="args">
      {{ args.default }}
    </NeoOption>
  `,
})

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => renderFunction(args),
}
