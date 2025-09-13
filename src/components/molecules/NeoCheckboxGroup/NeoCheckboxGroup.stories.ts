import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NeoCheckboxGroup from './NeoCheckboxGroup.vue'

const meta: Meta<typeof NeoCheckboxGroup> = {
  title: 'Molecules/NeoCheckboxGroup',
  component: NeoCheckboxGroup,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'object',
      description: 'Array of currently selected values',
    },
    options: {
      control: 'object',
      description: 'Array of checkbox options with label, value, and optional disabled properties',
    },
    name: {
      control: 'text',
      description: 'Base name attribute for the checkbox inputs',
    },
    legend: {
      control: 'text',
      description: 'Legend for the checkbox group',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the checkbox group',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all checkboxes in the group',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox group is required',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The layout orientation of the checkboxes',
    },
  },
  args: {
    modelValue: ['option1', 'option3'],
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
      { label: 'Option 4', value: 'option4' },
    ],
    name: 'checkbox-group',
    legend: 'Select all that apply',
    helperText: 'You can select multiple options',
    disabled: false,
    required: false,
    orientation: 'vertical',
  },
}

export default meta
type Story = StoryObj<typeof NeoCheckboxGroup>

export const Default: Story = {
  render: (args) => ({
    components: { NeoCheckboxGroup },
    setup() {
      const selectedValues = ref([...(args.modelValue ?? [])])
      return {
        args,
        selectedValues,
      }
    },
    template: `
      <NeoCheckboxGroup
        v-model="selectedValues"
        :options="args.options"
        :name="args.name"
        :legend="args.legend"
        :helper-text="args.helperText"
        :disabled="args.disabled"
        :required="args.required"
        :orientation="args.orientation"
      />
      <div class="mt-4 p-3 bg-gray-100 rounded-md">
        <p>Selected values: <strong>{{ selectedValues.join(', ') }}</strong></p>
      </div>
    `,
  }),
}

export const Horizontal: Story = {
  render: (args) => ({
    components: { NeoCheckboxGroup },
    setup() {
      const selectedValues = ref([...(args.modelValue ?? [])])
      return {
        args,
        selectedValues,
      }
    },
    template: `
      <NeoCheckboxGroup
        v-model="selectedValues"
        :options="args.options"
        :name="args.name"
        :legend="args.legend"
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
    components: { NeoCheckboxGroup },
    setup() {
      const selectedValues = ref(['option1'])
      const options = [
        { label: 'Available option', value: 'option1' },
        { label: 'Disabled option', value: 'option2', disabled: true },
        { label: 'Another available option', value: 'option3' },
        { label: 'Another disabled option', value: 'option4', disabled: true },
      ]
      return {
        selectedValues,
        options,
        args,
      }
    },
    template: `
      <NeoCheckboxGroup
        v-model="selectedValues"
        :options="options"
        :name="args.name"
        :legend="args.legend"
        :helper-text="args.helperText"
        :required="args.required"
        :orientation="args.orientation"
      />
    `,
  }),
}

export const AllDisabled: Story = {
  render: (args) => ({
    components: { NeoCheckboxGroup },
    setup() {
      const selectedValues = ref([...(args.modelValue ?? [])])
      return {
        args,
        selectedValues,
      }
    },
    template: `
      <NeoCheckboxGroup
        v-model="selectedValues"
        :options="args.options"
        :name="args.name"
        :legend="args.legend"
        :helper-text="args.helperText"
        disabled
        :required="args.required"
        :orientation="args.orientation"
      />
    `,
  }),
}

export const EmptySelection: Story = {
  render: (args) => ({
    components: { NeoCheckboxGroup },
    setup() {
      const selectedValues = ref<string[]>([])
      return {
        args,
        selectedValues,
      }
    },
    template: `
      <NeoCheckboxGroup
        v-model="selectedValues"
        :options="args.options"
        :name="args.name"
        :legend="args.legend"
        :helper-text="args.helperText"
        :disabled="args.disabled"
        :required="args.required"
        :orientation="args.orientation"
      />
      <div class="mt-4 p-3 bg-gray-100 rounded-md">
        <p>{{ selectedValues.length === 0 ? 'No options selected' : 'Selected: ' + selectedValues.join(', ') }}</p>
      </div>
    `,
  }),
}
