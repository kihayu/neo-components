import type { Meta, StoryObj } from '@storybook/vue3'

import NeoLabel, { type NeoLabelProps } from './NeoLabel.vue'

const meta: Meta<typeof NeoLabel> = {
  title: 'Atoms/NeoLabel',
  component: NeoLabel,
  tags: ['autodocs'],
  argTypes: {
    default: { control: 'text' },
  },
} satisfies Meta<typeof NeoLabel>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  forId: 'neo-label',
  default: 'Label Text',
} as NeoLabelProps

const renderFunction = (args: NeoLabelProps) => ({
  components: { NeoLabel },
  setup() {
    return { args }
  },
  template: `
    <NeoLabel v-bind="args">
      {{ args.default }}
    </NeoLabel>
  `,
})

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => renderFunction(args),
}
