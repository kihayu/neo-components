import type { Meta, StoryObj } from '@storybook/vue3'

import NeoLabeledSelect, { type NeoLabeledSelectProps } from './NeoLabeledSelect.vue'
import NeoOption from '@/components/atoms/NeoOption/NeoOption.vue'

const meta = {
  title: 'Molecules/NeoLabeledSelect',
  component: NeoLabeledSelect,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof NeoLabeledSelect>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  id: 'neo-select',
  options: ['Option 1', 'Option 2', 'Option 3'],
  label: 'Custom Select',
} as NeoLabeledSelectProps

const renderFunction = (args: NeoLabeledSelectProps) => ({
  components: { NeoLabeledSelect, NeoOption },
  setup() {
    return { args }
  },
  template: `
      <NeoLabeledSelect v-bind="args">
        <template #label>
          {{ args.label }}
        </template>
        Options
      </NeoLabeledSelect>
    `,
})

export const Primary: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => renderFunction(args),
}

export const ManyOptions: Story = {
  args: {
    ...defaultArgs,
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'],
  },
  render: (args) => renderFunction(args),
}
