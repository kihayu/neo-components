import type { Meta, StoryObj } from '@storybook/vue3'
import NeoBreadcrumbs from './NeoBreadcrumbs.vue'
import type { NeoBreadcrumbsProps } from './NeoBreadcrumbs.vue'
import type { Component } from 'vue'

interface Item {
  key?: string | number
  href?: string
  label: string
  icon?: Component
  current?: boolean
  disabled?: boolean
  target?: '_self' | '_blank' | '_parent' | '_top'
  rel?: string
}

const meta: Meta<typeof NeoBreadcrumbs> = {
  title: 'Molecules/NeoBreadcrumbs',
  component: NeoBreadcrumbs,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

const items: Item[] = [
  { label: 'Home', href: '#' },
  { label: 'Library', href: '#' },
  { label: 'Category', href: '#' },
  { label: 'Subcategory', href: '#' },
  { label: 'Current Page', current: true },
]

export const Default: Story = {
  args: {
    items,
    ariaLabel: 'Breadcrumb',
    separator: '/',
  } as NeoBreadcrumbsProps,
  render: (args) => ({
    components: { NeoBreadcrumbs },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-xl">
        <NeoBreadcrumbs v-bind="args" />
      </div>
    `,
  }),
}
