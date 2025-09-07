import type { Meta, StoryObj } from '@storybook/vue3'
import NeoBadge, { type NeoBadgeProps } from './NeoBadge.vue'

const meta = {
  title: 'Atoms/NeoBadge',
  component: NeoBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'neutral', 'info', 'success', 'warning', 'error', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    pill: { control: 'boolean' },
    dot: { control: 'boolean' },
    asButton: { control: 'boolean' },
  },
} satisfies Meta<typeof NeoBadge>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs: Partial<NeoBadgeProps> = {
  variant: 'default',
  size: 'md',
  pill: false,
  dot: false,
  asButton: false,
  ariaLabel: 'Badge',
}

const renderFunction = (args: Partial<NeoBadgeProps>) => ({
  components: { NeoBadge },
  setup() {
    return { args }
  },
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <NeoBadge v-bind="args">Badge</NeoBadge>
    </div>
  `,
})

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => renderFunction(args),
}

export const WithDot: Story = {
  args: {
    ...defaultArgs,
    dot: true,
  },
  render: (args) => renderFunction(args),
}

export const PillSizes: Story = {
  args: {
    ...defaultArgs,
    pill: true,
  },
  render: () => ({
    components: { NeoBadge },
    template: `
      <div class="flex items-center gap-2">
        <NeoBadge pill size="sm">Small</NeoBadge>
        <NeoBadge pill size="md">Medium</NeoBadge>
        <NeoBadge pill size="lg">Large</NeoBadge>
      </div>
    `,
  }),
}

export const AsButtonInteractive: Story = {
  args: {
    ...defaultArgs,
    asButton: true,
    ariaLabel: 'Interactive badge button',
  },
  render: () => ({
    components: { NeoBadge },
    template: `
      <div class="flex items-center gap-3">
        <NeoBadge asButton variant="default">Click</NeoBadge>
        <NeoBadge asButton variant="success">Success</NeoBadge>
        <NeoBadge asButton variant="warning">Warning</NeoBadge>
        <NeoBadge asButton variant="error">Error</NeoBadge>
      </div>
    `,
  }),
}

export const VariantsGrid: Story = {
  args: {
    ...defaultArgs,
  },
  render: () => ({
    components: { NeoBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <NeoBadge variant="default">Default</NeoBadge>
        <NeoBadge variant="neutral">Neutral</NeoBadge>
        <NeoBadge variant="info">Info</NeoBadge>
        <NeoBadge variant="success">Success</NeoBadge>
        <NeoBadge variant="warning">Warning</NeoBadge>
        <NeoBadge variant="error">Error</NeoBadge>
        <NeoBadge variant="outline">Outline</NeoBadge>
      </div>
    `,
  }),
}
