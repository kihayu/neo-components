import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NeoRadio from './NeoRadio.vue'

const meta: Meta<typeof NeoRadio> = {
  title: 'Atoms/NeoRadio',
  component: NeoRadio,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The value of the currently selected radio in the group',
    },
    value: {
      control: 'text',
      description: 'The value of this radio button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled',
    },
    name: {
      control: 'text',
      description: 'Name attribute for the radio group',
    },
  },
  args: {
    id: 'demo-radio',
    modelValue: 'option1',
    value: 'option1',
    name: 'radio-group',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof NeoRadio>

export const Default: Story = {
  render: (args) => ({
    components: { NeoRadio },
    setup() {
      const selected = ref(args.modelValue)
      return { args, selected }
    },
    template: `
      <div class="space-y-2">
        <NeoRadio 
          id="radio-1"
          v-model="selected"
          value="option1"
          :name="args.name"
          :disabled="args.disabled"
        >
          Option 1
        </NeoRadio>
        <NeoRadio 
          id="radio-2"
          v-model="selected"
          value="option2"
          :name="args.name"
          :disabled="args.disabled"
        >
          Option 2
        </NeoRadio>
        <NeoRadio 
          id="radio-3"
          v-model="selected"
          value="option3"
          :name="args.name"
          :disabled="args.disabled"
        >
          Option 3
        </NeoRadio>
        <div class="mt-4">Selected value: {{ selected }}</div>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: (args) => ({
    components: { NeoRadio },
    setup() {
      const selected = ref(args.modelValue)
      return { args, selected }
    },
    template: `
      <div class="space-y-2">
        <NeoRadio 
          id="radio-disabled-1"
          v-model="selected"
          value="option1"
          :name="args.name"
          disabled
        >
          Disabled Option 1
        </NeoRadio>
        <NeoRadio 
          id="radio-disabled-2"
          v-model="selected"
          value="option2"
          :name="args.name"
          disabled
        >
          Disabled Option 2
        </NeoRadio>
      </div>
    `,
  }),
  args: {
    modelValue: 'option1',
    disabled: true,
  },
}
