import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NeoStepper, { type NeoStepperProps } from './NeoStepper.vue'

const meta: Meta<typeof NeoStepper> = {
  title: 'Molecules/NeoStepper',
  component: NeoStepper,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    linear: { control: 'boolean' },
    clickable: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    style: { control: 'select', options: ['line', 'dot'] },
  },
}
export default meta
type Story = StoryObj<typeof meta>

const stepsBase: NeoStepperProps['steps'] = [
  { key: 'account', label: 'Account', description: 'Create your account' },
  { key: 'profile', label: 'Profile', description: 'Setup your profile' },
  { key: 'confirm', label: 'Confirm', description: 'Confirm and finish' },
]

export const Default: Story = {
  args: {
    steps: stepsBase,
    current: 1,
    orientation: 'horizontal',
    linear: true,
    clickable: true,
    size: 'md',
    style: 'line',
    ariaLabel: 'Onboarding progress',
  },
  render: (args) => ({
    components: { NeoStepper },
    setup() {
      const current = ref(args.current ?? 0)
      const steps = ref(args.steps ?? stepsBase)
      return { args, current, steps }
    },
    template: `
      <div class="max-w-3xl space-y-4">
        <NeoStepper
          v-bind="args"
          :steps="steps"
          :current="current"
          @update:current="current = $event"
          @stepClick="current = $event"
        />

        <div class="text-sm">Current step index: {{ current }} ({{ steps[current]?.label }})</div>
      </div>
    `,
  }),
}

export const VerticalLine: Story = {
  args: {
    steps: stepsBase,
    current: 0,
    orientation: 'vertical',
    linear: true,
    clickable: true,
    size: 'md',
    style: 'line',
  },
  render: (args) => ({
    components: { NeoStepper },
    setup() {
      const current = ref(args.current ?? 0)
      const steps = ref(args.steps ?? stepsBase)
      return { args, current, steps }
    },
    template: `
      <div class="max-w-3xl">
        <NeoStepper
          v-bind="args"
          :steps="steps"
          :current="current"
          @update:current="current = $event"
        />
      </div>
    `,
  }),
}

export const DotStyleNonLinear: Story = {
  args: {
    steps: stepsBase.map((s, i) => ({ ...s, completed: i < 1 })),
    current: 2,
    orientation: 'horizontal',
    linear: false,
    clickable: true,
    size: 'md',
    style: 'dot',
  },
  render: (args) => ({
    components: { NeoStepper },
    setup() {
      const current = ref(args.current ?? 0)
      const steps = ref(args.steps ?? stepsBase)
      return { args, current, steps }
    },
    template: `
      <div class="max-w-3xl space-y-3">
        <NeoStepper
          v-bind="args"
          :steps="steps"
          :current="current"
          @stepClick="current = $event"
        />
        <div class="text-sm text-muted-foreground">Non-linear mode allows jumping to any step (unless disabled).</div>
      </div>
    `,
  }),
}

export const WithDisabledSteps: Story = {
  args: {
    steps: [
      { key: 'a', label: 'Start', description: 'Begin setup' },
      { key: 'b', label: 'Middle', description: 'Configure options', disabled: true },
      { key: 'c', label: 'End', description: 'Finish' },
    ],
    current: 0,
    orientation: 'horizontal',
    linear: true,
    clickable: true,
    style: 'line',
  },
  render: (args) => ({
    components: { NeoStepper },
    setup() {
      const current = ref(args.current ?? 0)
      const steps = ref(args.steps ?? [])
      return { args, current, steps }
    },
    template: `
      <NeoStepper
        v-bind="args"
        :steps="steps"
        :current="current"
        @update:current="current = $event"
      />
    `,
  }),
}

export const Sizes: Story = {
  args: {
    steps: stepsBase,
    current: 1,
    orientation: 'horizontal',
    linear: true,
    clickable: true,
    style: 'line',
  },
  render: (args) => ({
    components: { NeoStepper },
    setup() {
      const currentSm = ref(1)
      const currentMd = ref(1)
      const currentLg = ref(1)
      return { args, currentSm, currentMd, currentLg }
    },
    template: `
      <div class="space-y-6">
        <div>
          <div class="font-semibold mb-2 text-sm">Small</div>
          <NeoStepper v-bind="args" size="sm" :current="currentSm" @update:current="currentSm = $event" />
        </div>
        <div>
          <div class="font-semibold mb-2 text-sm">Medium</div>
          <NeoStepper v-bind="args" size="md" :current="currentMd" @update:current="currentMd = $event" />
        </div>
        <div>
          <div class="font-semibold mb-2 text-sm">Large</div>
          <NeoStepper v-bind="args" size="lg" :current="currentLg" @update:current="currentLg = $event" />
        </div>
      </div>
    `,
  }),
}
