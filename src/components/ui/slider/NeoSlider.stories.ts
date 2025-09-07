import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NeoSlider from '@/components/ui/slider/NeoSlider.vue'

const meta = {
  title: 'UI/NeoSlider',
  component: NeoSlider,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    disabled: { control: 'boolean' },
    showValueLabel: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
} satisfies Meta<typeof NeoSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    orientation: 'horizontal',
    showValueLabel: true,
  },
  render: (args: Record<string, unknown>) => ({
    components: { NeoSlider },
    setup() {
      const value = ref<number[]>([50])
      return { args, value }
    },
    template: `
      <div class="max-w-xl">
        <NeoSlider v-model="value" v-bind="args" />
        <div class="mt-2 text-sm">Value: {{ value.join(', ') }}</div>
      </div>
    `,
  }),
}

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    orientation: 'horizontal',
    showValueLabel: true,
  },
  render: (args: Record<string, unknown>) => ({
    components: { NeoSlider },
    setup() {
      const value = ref<number[]>([25, 75])
      return { args, value }
    },
    template: `
      <div class="max-w-xl">
        <NeoSlider v-model="value" v-bind="args" />
        <div class="mt-2 text-sm">Range: {{ value.join(' - ') }}</div>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  args: {
    defaultValue: [40],
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    orientation: 'vertical',
    showValueLabel: true,
  },
  render: (args: Record<string, unknown>) => ({
    components: { NeoSlider },
    setup() {
      const value = ref<number[]>([40])
      return { args, value }
    },
    template: `
      <div class="h-60">
        <NeoSlider v-model="value" v-bind="args" />
      </div>
    `,
  }),
}
