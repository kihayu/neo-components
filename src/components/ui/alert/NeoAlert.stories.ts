import type { Meta, StoryObj } from '@storybook/vue3'
import NeoAlert from './NeoAlert.vue'
import NeoAlertTitle from './NeoAlertTitle.vue'
import NeoAlertDescription from './NeoAlertDescription.vue'
import { Rocket } from 'lucide-vue-next'

const meta: Meta<typeof NeoAlert> = {
  title: 'UI/NeoAlert',
  component: NeoAlert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error', 'destructive'],
    },
  },
}

export default meta
type Story = StoryObj<typeof NeoAlert>

export const Default: Story = {
  render: (args) => ({
    components: { NeoAlert, NeoAlertTitle, NeoAlertDescription },
    setup() {
      return { args }
    },
    template: `
      <NeoAlert v-bind="args">
        <NeoAlertTitle>Alert Title</NeoAlertTitle>
        <NeoAlertDescription>
          You can add components to your app using the cli.
        </NeoAlertDescription>
      </NeoAlert>
    `,
  }),
}

export const Icon: Story = {
  render: (args) => ({
    components: { NeoAlert, NeoAlertTitle, NeoAlertDescription, Rocket },
    setup() {
      return { args }
    },
    template: `
      <NeoAlert v-bind="args">
        <Rocket class="size-4" />
        <NeoAlertTitle>Alert Title</NeoAlertTitle>
        <NeoAlertDescription>
          You can add components to your app using the cli.
        </NeoAlertDescription>
      </NeoAlert>
    `,
  }),
}
