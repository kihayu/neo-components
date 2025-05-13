import type { Meta, StoryObj } from '@storybook/vue3'
import NeoAvatar from './NeoAvatar.vue'

const meta: Meta<typeof NeoAvatar> = {
  title: 'Atoms/NeoAvatar',
  component: NeoAvatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar',
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square', 'rounded'],
      description: 'Shape of the avatar',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'error', 'success', 'warning', 'info', 'gray'],
      description: 'Background color of the avatar when no image is provided',
    },
    src: {
      control: 'text',
      description: 'Source URL for the avatar image',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the avatar image for accessibility',
    },
    initials: {
      control: 'text',
      description: 'Initials to display when no image is provided',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the avatar is clickable',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the avatar',
    },
  },
  args: {
    size: 'md',
    shape: 'circle',
    color: 'primary',
    src: '',
    alt: 'User avatar',
    initials: '',
    interactive: false,
    ariaLabel: 'User avatar',
  },
}

export default meta
type Story = StoryObj<typeof NeoAvatar>

export const Default: Story = {
  render: (args) => ({
    components: { NeoAvatar },
    setup() {
      return { args }
    },
    template: `<NeoAvatar v-bind="args" />`,
  }),
}

export const WithImage: Story = {
  render: (args) => ({
    components: { NeoAvatar },
    setup() {
      return { args }
    },
    template: `<NeoAvatar v-bind="args" />`,
  }),
  args: {
    src: 'https://i.pravatar.cc/300',
  },
}

export const WithInitials: Story = {
  render: (args) => ({
    components: { NeoAvatar },
    setup() {
      return { args }
    },
    template: `<NeoAvatar v-bind="args" />`,
  }),
  args: {
    initials: 'JD',
  },
}

export const SizeVariants: Story = {
  render: (args) => ({
    components: { NeoAvatar },
    setup() {
      return { args }
    },
    template: `
      <div class="flex items-end space-x-4">
        <NeoAvatar size="xs" initials="XS" />
        <NeoAvatar size="sm" initials="SM" />
        <NeoAvatar size="md" initials="MD" />
        <NeoAvatar size="lg" initials="LG" />
        <NeoAvatar size="xl" initials="XL" />
      </div>
    `,
  }),
}

export const ShapeVariants: Story = {
  render: (args) => ({
    components: { NeoAvatar },
    setup() {
      return { args }
    },
    template: `
      <div class="flex space-x-4">
        <NeoAvatar shape="circle" initials="CI" />
        <NeoAvatar shape="square" initials="SQ" />
        <NeoAvatar shape="rounded" initials="RO" />
      </div>
    `,
  }),
}

export const ColorVariants: Story = {
  render: (args) => ({
    components: { NeoAvatar },
    setup() {
      return { args }
    },
    template: `
      <div class="flex space-x-4">
        <NeoAvatar color="primary" initials="PR" />
        <NeoAvatar color="error" initials="ER" />
        <NeoAvatar color="success" initials="SU" />
        <NeoAvatar color="warning" initials="WA" />
        <NeoAvatar color="info" initials="IN" />
        <NeoAvatar color="gray" initials="GR" />
      </div>
    `,
  }),
}

export const Interactive: Story = {
  render: (args) => ({
    components: { NeoAvatar },
    setup() {
      const handleClick = () => {
        // alert('Avatar clicked!')
        console.log('Avatar clicked!')
      }

      return { args, handleClick }
    },
    template: `
      <NeoAvatar
        v-bind="args"
        interactive
        aria-label="Click me"
        @click="handleClick"
      />
    `,
  }),
  args: {
    interactive: true,
    initials: 'CL',
  },
}
