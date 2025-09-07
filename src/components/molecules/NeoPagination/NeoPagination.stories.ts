import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NeoPagination, { type NeoPaginationProps } from './NeoPagination.vue'

const meta: Meta<typeof NeoPagination> = {
  title: 'Molecules/NeoPagination',
  component: NeoPagination,
  tags: ['autodocs'],
  argTypes: {
    page: { control: 'number' },
    total: { control: 'number' },
    perPage: { control: 'number' },
    siblingCount: { control: 'select', options: [0, 1, 2, 3] },
    boundaryCount: { control: 'select', options: [0, 1, 2] },
    hidePrevNext: { control: 'boolean' },
    hideFirstLast: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof meta>

const defaultArgs: NeoPaginationProps = {
  page: 1,
  total: 123,
  perPage: 10,
  siblingCount: 1,
  boundaryCount: 1,
  hidePrevNext: false,
  hideFirstLast: false,
  disabled: false,
  ariaLabel: 'Pagination',
}

export const Default: Story = {
  args: { ...defaultArgs },
  render: (args) => ({
    components: { NeoPagination },
    setup() {
      const page = ref(args.page)
      return { args, page }
    },
    template: `
      <div class="space-y-4">
        <NeoPagination v-bind="args" :page="page" @update:page="page = $event" />
        <div>Current page: {{ page }}</div>
      </div>
    `,
  }),
}

export const NoEdges: Story = {
  args: { ...defaultArgs, hideFirstLast: true, hidePrevNext: true },
  render: (args) => ({
    components: { NeoPagination },
    setup() {
      const page = ref(args.page)
      return { args, page }
    },
    template: `
      <div class="space-y-4">
        <NeoPagination v-bind="args" :page="page" @update:page="page = $event" />
        <div>Current page: {{ page }}</div>
      </div>
    `,
  }),
}

export const DenseSiblings: Story = {
  args: { ...defaultArgs, siblingCount: 2, boundaryCount: 2, total: 420, perPage: 10 },
  render: (args) => ({
    components: { NeoPagination },
    setup() {
      const page = ref(args.page)
      return { args, page }
    },
    template: `
      <div class="space-y-4">
        <NeoPagination v-bind="args" :page="page" @update:page="page = $event" />
        <div>Current page: {{ page }}</div>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: { ...defaultArgs, disabled: true },
  render: (args) => ({
    components: { NeoPagination },
    setup() {
      const page = ref(args.page)
      return { args, page }
    },
    template: `
      <div class="space-y-4">
        <NeoPagination v-bind="args" :page="page" @update:page="page = $event" />
        <div>Current page: {{ page }}</div>
      </div>
    `,
  }),
}
