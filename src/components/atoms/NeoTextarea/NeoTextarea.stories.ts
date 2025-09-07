import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NeoTextarea, { type NeoTextareaProps } from './NeoTextarea.vue'

const meta = {
  title: 'Atoms/NeoTextarea',
  component: NeoTextarea,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
  },
} satisfies Meta<typeof NeoTextarea>

export default meta

type Story = StoryObj<typeof meta>

type NeoTextareaStoryArgs = Partial<NeoTextareaProps> & { modelValue: string }

const defaultArgs: NeoTextareaStoryArgs = {
  modelValue: '',
  id: 'neo-textarea',
  placeholder: 'Enter text...',
  rows: 4,
  autosize: false,
  resize: 'vertical',
  disabled: false,
  readonly: false,
  required: false,
  variant: 'default',
  size: 'md',
  invalid: false,
  showCounter: false,
  maxlength: 160,
  helperText: 'This is helper text providing additional context.',
}

const renderFunction = (args: Partial<NeoTextareaProps>) => ({
  components: { NeoTextarea },
  setup() {
    return { args }
  },
  template: `
    <div class="max-w-xl space-y-2">
      <NeoTextarea v-bind="args" />
    </div>
  `,
})

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => renderFunction(args),
}

export const WithCounter: Story = {
  args: {
    ...defaultArgs,
    showCounter: true,
    maxlength: 120,
  },
  render: (args) => renderFunction(args),
}

export const Autosize: Story = {
  args: {
    ...defaultArgs,
    autosize: true,
    rows: 3,
    helperText: 'Autosizes to fit content.',
  },
  render: (args) => renderFunction(args),
}

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true,
  },
  render: (args) => renderFunction(args),
}

export const Invalid: Story = {
  args: {
    ...defaultArgs,
    invalid: true,
    helperText: 'There is an error with your input.',
  },
  render: (args) => renderFunction(args),
}

export const VariantsAndSizes: Story = {
  args: {
    ...defaultArgs,
  },
  render: () => ({
    components: { NeoTextarea },
    setup() {
      const text = ref('')
      const variants = ['default', 'success', 'warning', 'error'] as const
      const sizes = ['sm', 'md', 'lg'] as const
      return { text, variants, sizes }
    },
    template: `
      <div class="grid grid-cols-1 gap-4">
        <div v-for="v in variants" :key="v" class="space-y-2">
          <div class="font-bold text-sm">Variant: {{ v }}</div>
          <div class="flex flex-col gap-3">
            <NeoTextarea v-for="s in sizes" :key="v + s" v-model="text" :variant="v" :size="s" :placeholder="v + ' / ' + s" />
          </div>
        </div>
      </div>
    `,
  }),
}
