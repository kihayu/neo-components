import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NeoRadioGroup from './NeoRadioGroup.vue'

const meta: Meta<typeof NeoRadioGroup> = {
  title: 'Molecules/NeoRadioGroup',
  component: NeoRadioGroup,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The current selected value',
    },
    options: {
      control: 'object',
      description: 'Array of radio options with label, value, and optional disabled properties',
    },
    name: {
      control: 'text',
      description: 'Name attribute for the radio inputs',
    },
    label: {
      control: 'text',
      description: 'Label for the radio group',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the radio group',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all radio buttons in the group',
    },
    required: {
      control: 'boolean',
      description: 'Whether the radio group is required',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The layout orientation of the radio buttons',
    },
  },
  args: {
    modelValue: 'option1',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    name: 'radio-group',
    label: 'Select an option',
    helperText: 'Choose the option that best fits your needs',
    disabled: false,
    required: false,
    orientation: 'vertical',
  },
}

export default meta
type Story = StoryObj<typeof NeoRadioGroup>

export const Default: Story = {
  render: (args) => ({
    components: { NeoRadioGroup },
    setup() {
      const selectedValue = ref(args.modelValue)
      return { 
        args,
        selectedValue
      }
    },
    template: `
      <NeoRadioGroup
        v-model="selectedValue"
        :options="args.options"
        :name="args.name"
        :label="args.label"
        :helper-text="args.helperText"
        :disabled="args.disabled"
        :required="args.required"
        :orientation="args.orientation"
      />
      <div class="mt-4 p-3 bg-gray-100 rounded-md">
        <p>Selected value: <strong>{{ selectedValue }}</strong></p>
      </div>
    `,
  }),
}

export const Horizontal: Story = {
  render: (args) => ({
    components: { NeoRadioGroup },
    setup() {
      const selectedValue = ref(args.modelValue)
      return { 
        args,
        selectedValue
      }
    },
    template: `
      <NeoRadioGroup
        v-model="selectedValue"
        :options="args.options"
        :name="args.name"
        :label="args.label"
        :helper-text="args.helperText"
        :disabled="args.disabled"
        :required="args.required"
        orientation="horizontal"
      />
    `,
  }),
}

export const WithDisabledOptions: Story = {
  render: (args) => ({
    components: { NeoRadioGroup },
    setup() {
      const selectedValue = ref(args.modelValue)
      const options = [
        { label: 'Available option', value: 'option1' },
        { label: 'Disabled option', value: 'option2', disabled: true },
        { label: 'Another available option', value: 'option3' },
      ]
      return { 
        selectedValue,
        options,
        args
      }
    },
    template: `
      <NeoRadioGroup
        v-model="selectedValue"
        :options="options"
        :name="args.name"
        :label="args.label"
        :helper-text="args.helperText"
        :required="args.required"
        :orientation="args.orientation"
      />
    `,
  }),
}

export const AllDisabled: Story = {
  render: (args) => ({
    components: { NeoRadioGroup },
    setup() {
      const selectedValue = ref(args.modelValue)
      return { 
        args,
        selectedValue
      }
    },
    template: `
      <NeoRadioGroup
        v-model="selectedValue"
        :options="args.options"
        :name="args.name"
        :label="args.label"
        :helper-text="args.helperText"
        disabled
        :required="args.required"
        :orientation="args.orientation"
      />
    `,
  }),
}
