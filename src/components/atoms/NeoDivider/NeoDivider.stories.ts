import type { Meta, StoryObj } from '@storybook/vue3'
import NeoDivider from './NeoDivider.vue'

const meta: Meta<typeof NeoDivider> = {
  title: 'Atoms/NeoDivider',
  component: NeoDivider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the divider',
    },
    label: {
      control: 'text',
      description: 'Optional text label to display in the middle of the divider',
    },
    tight: {
      control: 'boolean',
      description: 'Whether to reduce the spacing around the divider',
    },
  },
  args: {
    orientation: 'horizontal',
    label: '',
    tight: false,
  },
}

export default meta
type Story = StoryObj<typeof NeoDivider>

export const Horizontal: Story = {
  render: (args) => ({
    components: { NeoDivider },
    setup() {
      return { args }
    },
    template: `
      <div class="p-4">
        <div class="p-4 bg-gray-100 rounded-xl">Content above</div>
        <NeoDivider v-bind="args" />
        <div class="p-4 bg-gray-100 rounded-xl">Content below</div>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  render: (args) => ({
    components: { NeoDivider },
    setup() {
      return { args }
    },
    template: `
      <div class="flex p-4">
        <div class="p-4 bg-gray-100 rounded-xl">Left content</div>
        <NeoDivider v-bind="args" />
        <div class="p-4 bg-gray-100 rounded-xl">Right content</div>
      </div>
    `,
  }),
  args: {
    orientation: 'vertical',
  },
}

export const WithLabel: Story = {
  render: (args) => ({
    components: { NeoDivider },
    setup() {
      return { args }
    },
    template: `
      <div class="p-4">
        <div class="p-4 bg-gray-100 rounded-xl">Content above</div>
        <NeoDivider v-bind="args" />
        <div class="p-4 bg-gray-100 rounded-xl">Content below</div>
      </div>
    `,
  }),
  args: {
    label: 'OR',
  },
}

export const WithSlot: Story = {
  render: (args) => ({
    components: { NeoDivider },
    setup() {
      return { args }
    },
    template: `
      <div class="p-4">
        <div class="p-4 bg-gray-100 rounded-xl">Content above</div>
        <NeoDivider v-bind="args">
          <div class="flex items-center gap-2">
            <span>SECTION BREAK</span>
          </div>
        </NeoDivider>
        <div class="p-4 bg-gray-100 rounded-xl">Content below</div>
      </div>
    `,
  }),
}

export const Tight: Story = {
  render: (args) => ({
    components: { NeoDivider },
    setup() {
      return { args }
    },
    template: `
      <div class="p-4">
        <div class="p-4 bg-gray-100 rounded-xl">Tight spacing</div>
        <NeoDivider v-bind="args" />
        <div class="p-4 bg-gray-100 rounded-xl">Reduced margins</div>
      </div>
    `,
  }),
  args: {
    tight: true,
  },
}
