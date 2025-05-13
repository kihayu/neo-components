import type { Meta, StoryObj } from '@storybook/vue3'
import NeoIcon from './NeoIcon.vue'

import {
  Check,
  AlertCircle,
  AlertTriangle,
  Info,
  Heart,
  Plus,
  Settings,
  User,
  Home,
} from 'lucide-vue-next'

const meta: Meta<typeof NeoIcon> = {
  title: 'Atoms/NeoIcon',
  component: NeoIcon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of the icon',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'error', 'success', 'warning', 'black', 'white', 'inherit'],
      description: 'Color of the icon',
    },
    rotate: {
      control: { type: 'range', min: 0, max: 360, step: 45 },
      description: 'Rotation of the icon in degrees',
    },
    ariaHidden: {
      control: 'boolean',
      description: 'Whether the icon should be hidden from screen readers',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the icon (when not hidden)',
    },
  },
  args: {
    size: 'md',
    color: 'black',
    rotate: 0,
    ariaHidden: true,
    ariaLabel: 'Icon',
  },
}

export default meta
type Story = StoryObj<typeof NeoIcon>

export const Default: Story = {
  render: (args) => ({
    components: { NeoIcon, Check },
    setup() {
      return { args }
    },
    template: `
      <NeoIcon v-bind="args">
        <Check />
      </NeoIcon>
    `,
  }),
}

export const SizeVariants: Story = {
  render: (args) => ({
    components: { NeoIcon, Check },
    setup() {
      return { args }
    },
    template: `
      <div class="flex items-end space-x-4">
        <NeoIcon size="xs" color="primary">
          <Check />
        </NeoIcon>
        <NeoIcon size="sm" color="primary">
          <Check />
        </NeoIcon>
        <NeoIcon size="md" color="primary">
          <Check />
        </NeoIcon>
        <NeoIcon size="lg" color="primary">
          <Check />
        </NeoIcon>
        <NeoIcon size="xl" color="primary">
          <Check />
        </NeoIcon>
        <NeoIcon size="2xl" color="primary">
          <Check />
        </NeoIcon>
      </div>
    `,
  }),
}

export const ColorVariants: Story = {
  render: (args) => ({
    components: { NeoIcon, Check },
    setup() {
      return { args }
    },
    template: `
      <div class="flex space-x-4">
        <NeoIcon size="lg" color="primary">
          <Check />
        </NeoIcon>
        <NeoIcon size="lg" color="error">
          <Check />
        </NeoIcon>
        <NeoIcon size="lg" color="success">
          <Check />
        </NeoIcon>
        <NeoIcon size="lg" color="warning">
          <Check />
        </NeoIcon>
        <NeoIcon size="lg" color="black">
          <Check />
        </NeoIcon>
      </div>
    `,
  }),
}

export const Rotated: Story = {
  render: (args) => ({
    components: { NeoIcon, Plus },
    setup() {
      return { args }
    },
    template: `
      <div class="flex space-x-4">
        <NeoIcon size="lg" color="primary" :rotate="0">
          <Plus />
        </NeoIcon>
        <NeoIcon size="lg" color="primary" :rotate="45">
          <Plus />
        </NeoIcon>
        <NeoIcon size="lg" color="primary" :rotate="90">
          <Plus />
        </NeoIcon>
      </div>
    `,
  }),
}

export const DifferentIcons: Story = {
  render: (args) => ({
    components: { NeoIcon, Check, AlertCircle, AlertTriangle, Info, Heart, Settings, User, Home },
    setup() {
      return { args }
    },
    template: `
      <div class="flex flex-wrap gap-4">
        <NeoIcon size="lg" color="primary">
          <Check />
        </NeoIcon>
        <NeoIcon size="lg" color="error">
          <AlertCircle />
        </NeoIcon>
        <NeoIcon size="lg" color="warning">
          <AlertTriangle />
        </NeoIcon>
        <NeoIcon size="lg" color="primary">
          <Info />
        </NeoIcon>
        <NeoIcon size="lg" color="error">
          <Heart />
        </NeoIcon>
        <NeoIcon size="lg" color="success">
          <Settings />
        </NeoIcon>
        <NeoIcon size="lg" color="black">
          <User />
        </NeoIcon>
        <NeoIcon size="lg" color="primary">
          <Home />
        </NeoIcon>
      </div>
    `,
  }),
}
