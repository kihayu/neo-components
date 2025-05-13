import type { Meta, StoryObj } from '@storybook/vue3'
import NeoSpinner from './NeoSpinner.vue'

const meta: Meta<typeof NeoSpinner> = {
  title: 'Atoms/NeoSpinner',
  component: NeoSpinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the spinner',
    },
    label: {
      control: 'text',
      description: 'Text label displayed next to the spinner',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the spinner for screen readers',
    },
  },
  args: {
    size: 'md',
    label: '',
    ariaLabel: 'Loading',
  },
}

export default meta
type Story = StoryObj<typeof NeoSpinner>

export const Default: Story = {
  render: (args) => ({
    components: { NeoSpinner },
    setup() {
      return { args }
    },
    template: `<NeoSpinner v-bind="args" />`,
  }),
}

export const WithLabel: Story = {
  render: (args) => ({
    components: { NeoSpinner },
    setup() {
      return { args }
    },
    template: `<NeoSpinner v-bind="args" />`,
  }),
  args: {
    label: 'Loading...',
  },
}

export const WithSlotContent: Story = {
  render: (args) => ({
    components: { NeoSpinner },
    setup() {
      return { args }
    },
    template: `
      <NeoSpinner v-bind="args">
        Please wait while we load your content...
      </NeoSpinner>
    `,
  }),
}

export const SizeVariants: Story = {
  render: (args) => ({
    components: { NeoSpinner },
    setup() {
      return { args }
    },
    template: `
      <div class="flex flex-col gap-6 items-start">
        <NeoSpinner size="sm" label="Small spinner" />
        <NeoSpinner size="md" label="Medium spinner" />
        <NeoSpinner size="lg" label="Large spinner" />
      </div>
    `,
  }),
}

export const LoadingStates: Story = {
  render: (args) => ({
    components: { NeoSpinner },
    setup() {
      return { args }
    },
    template: `
      <div class="flex flex-col gap-4">
        <div class="p-4 rounded-xl border-4 border-black flex items-center justify-center h-32">
          <NeoSpinner size="md" label="Loading data..." />
        </div>
        <div class="p-4 rounded-xl border-4 border-black flex items-center justify-center h-32">
          <NeoSpinner size="md">
            <div class="flex flex-col">
              <span>Fetching resources</span>
              <span class="text-sm text-gray-500">This might take a moment</span>
            </div>
          </NeoSpinner>
        </div>
      </div>
    `,
  }),
}
