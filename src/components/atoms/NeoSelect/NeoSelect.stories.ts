import type { Meta, StoryObj } from '@storybook/vue3'

import NeoSelect, { type NeoSelectProps } from './NeoSelect.vue'
import NeoOption from '../NeoOption/NeoOption.vue'

const meta = {
  title: 'Atoms/NeoSelect',
  component: NeoSelect,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
  },
} satisfies Meta<typeof NeoSelect>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  id: 'neo-select',
} as NeoSelectProps

const renderFunction = (args: NeoSelectProps) => ({
  components: { NeoSelect, NeoOption },
  setup() {
    return { args }
  },
  template: `
      <NeoSelect v-bind="args">
        Options
      </NeoSelect>
    `,
})

export const Primary: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => renderFunction(args),
}
