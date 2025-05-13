import type { Meta, StoryObj } from '@storybook/vue3'

import NeoSelect, { type NeoSelectProps } from './NeoSelect.vue'
import NeoOption from '../NeoOption/NeoOption.vue'

const meta: Meta<typeof NeoSelect> = {
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
      <div class="mt-8 p-4 bg-gray-100 rounded-xl">
        <p class="text-sm text-gray-700">⚠️ <strong>Note:</strong> This component does not resemble a functional select dropdown. For the full component, please see the <code>NeoLabeledSelect</code> molecule component.</p>
        <p class="text-sm text-gray-700 mt-2">See: <code>Molecules/NeoLabeledSelect</code> in Storybook</p>
      </div>
    `,
})

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => renderFunction(args),
}
