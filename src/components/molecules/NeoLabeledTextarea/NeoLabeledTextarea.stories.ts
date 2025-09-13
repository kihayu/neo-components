import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NeoLabeledTextarea, { type NeoLabeledTextareaProps } from './NeoLabeledTextarea.vue'

const meta: Meta<typeof NeoLabeledTextarea> = {
  title: 'Molecules/NeoLabeledTextarea',
  component: NeoLabeledTextarea,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    label: { control: 'text' },
    description: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    maxlength: { control: 'number' },
    showCounter: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof meta>

const defaultArgs: Partial<NeoLabeledTextareaProps> & { modelValue: string } = {
  modelValue: '',
  id: 'neo-labeled-textarea',
  label: 'Your message',
  placeholder: 'Type your message...',
  description: 'Please be concise and specific.',
  helperText: 'We value your feedback.',
  rows: 4,
  maxlength: 160,
  showCounter: true,
  disabled: false,
  required: false,
  invalid: false,
}

export const Default: Story = {
  args: { ...defaultArgs },
  render: (args) => ({
    components: { NeoLabeledTextarea },
    setup() {
      const text = ref('')
      return { args, text }
    },
    template: `
      <div class="max-w-xl space-y-2">
        <NeoLabeledTextarea v-model="text" v-bind="args" />
        <div class="text-sm">Value: {{ text.length }} chars</div>
      </div>
    `,
  }),
}

export const CustomSlots: Story = {
  args: { ...defaultArgs },
  render: (args) => ({
    components: { NeoLabeledTextarea },
    setup() {
      const text = ref('')
      return { args, text }
    },
    template: `
      <div class="max-w-xl space-y-2">
        <NeoLabeledTextarea v-model="text" v-bind="args">
          <template #label>
            <span class="text-primary">Custom label</span>
          </template>
          <template #description>
            <em>Custom description content.</em>
          </template>
          <template #helper>
            <span>Custom helper text below.</span>
          </template>
          <template #counter="{ current, max }">
            <span class="text-[11px]">Chars: {{ current }}<span v-if="max"> / {{ max }}</span></span>
          </template>
        </NeoLabeledTextarea>
      </div>
    `,
  }),
}
