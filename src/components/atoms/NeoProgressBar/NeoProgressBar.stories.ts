import type { Meta, StoryObj } from '@storybook/vue3'
import NeoProgressBar from './NeoProgressBar.vue'

const meta: Meta<typeof NeoProgressBar> = {
  title: 'Atoms/NeoProgressBar',
  component: NeoProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Current progress value (0-100)',
    },
    label: {
      control: 'text',
      description: 'Text label for the progress bar',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'error', 'success', 'warning', 'info'],
      description: 'Color theme of the progress bar',
    },
    showLabels: {
      control: 'boolean',
      description: 'Whether to show the text label',
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to show the percentage value',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
  args: {
    id: 'demo-progress',
    value: 45,
    label: 'Loading',
    color: 'primary',
    showLabels: true,
    showValue: true,
    ariaLabel: '',
  },
}

export default meta
type Story = StoryObj<typeof NeoProgressBar>

export const Default: Story = {
  render: (args) => ({
    components: { NeoProgressBar },
    setup() {
      return { args }
    },
    template: `<NeoProgressBar v-bind="args" />`,
  }),
}

export const NoLabels: Story = {
  render: (args) => ({
    components: { NeoProgressBar },
    setup() {
      return { args }
    },
    template: `<div class="w-64"><NeoProgressBar v-bind="args" /></div>`,
  }),
  args: {
    showLabels: false,
    showValue: false,
  },
}

export const ColorVariants: Story = {
  render: (args) => ({
    components: { NeoProgressBar },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-6">
        <NeoProgressBar id="primary-progress" value="65" color="primary" label="Primary" />
        <NeoProgressBar id="success-progress" value="80" color="success" label="Success" />
        <NeoProgressBar id="error-progress" value="30" color="error" label="Error" />
        <NeoProgressBar id="warning-progress" value="50" color="warning" label="Warning" />
        <NeoProgressBar id="info-progress" value="90" color="info" label="Info" />
      </div>
    `,
  }),
}

export const ProgressStates: Story = {
  render: (args) => ({
    components: { NeoProgressBar },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-6">
        <NeoProgressBar id="empty-progress" value="0" label="Not started" />
        <NeoProgressBar id="partial-progress" value="35" label="In progress" />
        <NeoProgressBar id="almost-progress" value="85" label="Almost complete" />
        <NeoProgressBar id="complete-progress" value="100" label="Complete" color="success" />
      </div>
    `,
  }),
}
