import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NeoRating, { type NeoRatingProps } from './NeoRating.vue'

const meta: Meta<typeof NeoRating> = {
  title: 'Molecules/NeoRating',
  component: NeoRating,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'number' },
    max: { control: 'number' },
    allowHalf: { control: 'boolean' },
    allowClear: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'outline'] },
  },
}
export default meta
type Story = StoryObj<typeof meta>

const defaultArgs: Partial<NeoRatingProps> & { modelValue: number } = {
  modelValue: 3,
  max: 5,
  allowHalf: false,
  allowClear: false,
  disabled: false,
  readonly: false,
  size: 'md',
  variant: 'default',
  ariaLabel: 'Rating',
}

export const Default: Story = {
  args: { ...defaultArgs },
  render: (args) => ({
    components: { NeoRating },
    setup() {
      const value = ref(args.modelValue ?? 3)
      return { args, value }
    },
    template: `
      <div class="space-y-2">
        <NeoRating v-model="value" v-bind="args" />
        <div class="text-sm">Value: {{ value }} / {{ args.max }}</div>
      </div>
    `,
  }),
}

export const AllowHalf: Story = {
  args: { ...defaultArgs, allowHalf: true, modelValue: 2.5 },
  render: (args) => ({
    components: { NeoRating },
    setup() {
      const value = ref(args.modelValue ?? 2.5)
      return { args, value }
    },
    template: `
      <div class="space-y-2">
        <NeoRating v-model="value" v-bind="args" />
        <div class="text-sm">Half-steps enabled — Value: {{ value }}</div>
      </div>
    `,
  }),
}

export const AllowClear: Story = {
  args: { ...defaultArgs, allowClear: true, modelValue: 4 },
  render: (args) => ({
    components: { NeoRating },
    setup() {
      const value = ref(args.modelValue ?? 4)
      return { args, value }
    },
    template: `
      <div class="space-y-2">
        <NeoRating v-model="value" v-bind="args" />
        <div class="text-sm text-muted-foreground">Clicking the same star clears the selection.</div>
        <div class="text-sm">Value: {{ value }}</div>
      </div>
    `,
  }),
}

export const Readonly: Story = {
  args: { ...defaultArgs, readonly: true, modelValue: 4 },
  render: (args) => ({
    components: { NeoRating },
    setup() {
      const value = ref(args.modelValue ?? 4)
      return { args, value }
    },
    template: `
      <div class="space-y-2">
        <NeoRating v-model="value" v-bind="args" />
        <div class="text-sm text-muted-foreground">Readonly — keyboard/mouse interaction disabled.</div>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: { ...defaultArgs, disabled: true, modelValue: 3 },
  render: (args) => ({
    components: { NeoRating },
    setup() {
      const value = ref(args.modelValue ?? 3)
      return { args, value }
    },
    template: `
      <div class="space-y-2">
        <NeoRating v-model="value" v-bind="args" />
        <div class="text-sm text-muted-foreground">Disabled — not focusable or operable.</div>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  args: { ...defaultArgs, modelValue: 3 },
  render: (args) => ({
    components: { NeoRating },
    setup() {
      const vSm = ref(2)
      const vMd = ref(3)
      const vLg = ref(4)
      return { args, vSm, vMd, vLg }
    },
    template: `
      <div class="space-y-4">
        <div>
          <div class="mb-1 text-sm font-semibold">Small</div>
          <NeoRating v-model="vSm" v-bind="args" size="sm" />
        </div>
        <div>
          <div class="mb-1 text-sm font-semibold">Medium</div>
          <NeoRating v-model="vMd" v-bind="args" size="md" />
        </div>
        <div>
          <div class="mb-1 text-sm font-semibold">Large</div>
          <NeoRating v-model="vLg" v-bind="args" size="lg" />
        </div>
      </div>
    `,
  }),
}

export const KeyboardNavigation: Story = {
  args: { ...defaultArgs, modelValue: 2, allowHalf: true },
  render: (args) => ({
    components: { NeoRating },
    setup() {
      const value = ref(args.modelValue ?? 2)
      return { args, value }
    },
    template: `
      <div class="space-y-2">
        <p class="text-sm text-muted-foreground">
          Use Arrow keys to adjust, Home/End to set 0/max, Space/Enter to set the focused star.
        </p>
        <NeoRating v-model="value" v-bind="args" />
        <div class="text-sm">Value: {{ value }}</div>
      </div>
    `,
  }),
}
