import type { Meta, StoryObj } from '@storybook/vue3'
import NeoAlert from './NeoAlert.vue'
import NeoButton from '../NeoButton/NeoButton.vue'

const meta: Meta<typeof NeoAlert> = {
  title: 'Atoms/NeoAlert',
  component: NeoAlert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      description: 'The type/severity of the alert',
    },
    title: {
      control: 'text',
      description: 'Title of the alert (optional)',
    },
    message: {
      control: 'text',
      description: 'Message content',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the status icon',
    },
    autoClose: {
      control: 'boolean',
      description: 'Whether the alert should automatically close after a delay',
    },
    autoCloseDelay: {
      control: { type: 'number', min: 1000, max: 10000, step: 1000 },
      description: 'Delay in milliseconds before auto-closing',
    },
  },
  args: {
    show: true,
    type: 'info',
    title: 'Alert Title',
    message: 'This is an alert message with important information.',
    dismissible: false,
    showIcon: true,
    autoClose: false,
    autoCloseDelay: 5000,
  },
}

export default meta
type Story = StoryObj<typeof NeoAlert>

export const Default: Story = {
  render: (args) => ({
    components: { NeoAlert },
    setup() {
      return { args }
    },
    template: `<NeoAlert v-bind="args" />`,
  }),
}

export const TypeVariants: Story = {
  render: (args) => ({
    components: { NeoAlert },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-4">
        <NeoAlert
          type="info"
          title="Information"
          message="This is an informational message."
        />
        <NeoAlert
          type="success"
          title="Success"
          message="The operation was completed successfully."
        />
        <NeoAlert
          type="warning"
          title="Warning"
          message="Please be careful with this action."
        />
        <NeoAlert
          type="error"
          title="Error"
          message="An error occurred while processing your request."
        />
      </div>
    `,
  }),
}

export const WithoutTitle: Story = {
  render: (args) => ({
    components: { NeoAlert },
    setup() {
      return { args }
    },
    template: `<NeoAlert v-bind="args" />`,
  }),
  args: {
    title: '',
    message: 'This is an alert without a title, showing only the message content.',
  },
}

export const Dismissible: Story = {
  render: (args) => ({
    components: { NeoAlert },
    setup() {
      return { args }
    },
    template: `<NeoAlert v-bind="args" />`,
  }),
  args: {
    dismissible: true,
    message: 'This alert can be dismissed by clicking the X button.',
  },
}

export const WithoutIcon: Story = {
  render: (args) => ({
    components: { NeoAlert },
    setup() {
      return { args }
    },
    template: `<NeoAlert v-bind="args" />`,
  }),
  args: {
    showIcon: false,
    message: 'This alert is displayed without an icon.',
  },
}

export const AutoClose: Story = {
  render: (args) => ({
    components: { NeoAlert },
    setup() {
      return { args }
    },
    template: `<NeoAlert v-bind="args" />`,
  }),
  args: {
    autoClose: true,
    autoCloseDelay: 5000,
    message: 'This alert will automatically close after 5 seconds.',
  },
}

export const WithActions: Story = {
  render: (args) => ({
    components: { NeoAlert, NeoButton },
    setup() {
      return { args }
    },
    template: `
      <NeoAlert v-bind="args">
        <template #default>
          A new version is available. Would you like to update now?
        </template>
        <template #actions>
          <div class="flex gap-2">
            <NeoButton size="medium" type="primary">Update Now</NeoButton>
            <NeoButton size="medium" type="error">Remind Later</NeoButton>
          </div>
        </template>
      </NeoAlert>
    `,
  }),
  args: {
    type: 'info',
    title: 'Update Available',
    showIcon: true,
  },
}
