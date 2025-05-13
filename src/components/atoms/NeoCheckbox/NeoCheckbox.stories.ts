import type { Meta, StoryObj } from '@storybook/vue3'
import NeoCheckbox from './NeoCheckbox.vue'

const meta: Meta<typeof NeoCheckbox> = {
  title: 'Atoms/NeoCheckbox',
  component: NeoCheckbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'The checked state of the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
  },
  args: {
    id: 'demo-checkbox',
    modelValue: false,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof NeoCheckbox>

export const Default: Story = {
  render: (args) => ({
    components: { NeoCheckbox },
    setup() {
      return { args }
    },
    template: `
      <NeoCheckbox v-bind="args" v-model="args.modelValue">
        Checkbox Label
      </NeoCheckbox>
    `,
  }),
}

export const Checked: Story = {
  render: (args) => ({
    components: { NeoCheckbox },
    setup() {
      return { args }
    },
    template: `
      <NeoCheckbox v-bind="args" v-model="args.modelValue">
        Checked Checkbox
      </NeoCheckbox>
    `,
  }),
  args: {
    modelValue: true,
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { NeoCheckbox },
    setup() {
      return { args }
    },
    template: `
      <NeoCheckbox v-bind="args" v-model="args.modelValue">
        Disabled Checkbox
      </NeoCheckbox>
    `,
  }),
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  render: (args) => ({
    components: { NeoCheckbox },
    setup() {
      return { args }
    },
    template: `
      <NeoCheckbox v-bind="args" v-model="args.modelValue">
        Disabled Checked Checkbox
      </NeoCheckbox>
    `,
  }),
  args: {
    modelValue: true,
    disabled: true,
  },
}
