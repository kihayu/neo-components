import type { Meta, StoryObj } from '@storybook/vue3'

import NeoLegend from './NeoLegend.vue'

const meta: Meta<typeof NeoLegend> = {
  title: 'Atoms/NeoLegend',
  component: NeoLegend,
  tags: ['autodocs'],
  argTypes: {
    default: { control: 'text' },
  },
} satisfies Meta<typeof NeoLegend>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  default: 'Label Text',
}

const renderFunction = (args: unknown) => ({
  components: { NeoLegend },
  setup() {
    return { args }
  },
  template: `
    <NeoLegend v-bind="args">
      {{ args.default }}
    </NeoLegend>
  `,
})

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => renderFunction(args),
}
