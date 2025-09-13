import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { NeoTable } from '.'
type TableColumn<TData, TValue = unknown> = {
  key: string
  header: string
  accessor?: (row: TData) => TValue
  sortable?: boolean
  sortKey?: string
  width?: number | string
  align?: 'start' | 'center' | 'end'
}

type Row = { id: number; name: string; role: string; age: number; active: boolean }

const meta: Meta = {
  title: 'UI/NeoTable',
  component: NeoTable,
  tags: ['autodocs'],
  argTypes: {
    dense: { control: 'boolean' },
    bordered: { control: 'boolean' },
    striped: { control: 'boolean' },
    stickyHeader: { control: 'boolean' },
    selectable: { control: 'boolean' },
    selectionMode: { control: 'select', options: ['single', 'multiple'] },
  },
}
export default meta
type Story = StoryObj<typeof meta>

const sampleData: Row[] = [
  { id: 1, name: 'Alice', role: 'Designer', age: 29, active: true },
  { id: 2, name: 'Bob', role: 'Engineer', age: 34, active: false },
  { id: 3, name: 'Charlie', role: 'PM', age: 31, active: true },
  { id: 4, name: 'Denise', role: 'Engineer', age: 26, active: true },
  { id: 5, name: 'Evan', role: 'Support', age: 41, active: false },
]

const sampleColumns: Array<TableColumn<Row>> = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  {
    key: 'age',
    header: 'Age',
    sortable: true,
    accessor: (r) => r.age,
    align: 'end',
  },
  {
    key: 'active',
    header: 'Status',
    sortable: true,
    accessor: (r) => (r.active ? 'Active' : 'Inactive'),
  },
]

const defaultArgs = {
  data: sampleData,
  columns: sampleColumns,
  keyField: 'id' as keyof Row,
  dense: false,
  bordered: true,
  striped: false,
  stickyHeader: false,
  showHeader: true,
  selectable: false,
  selectionMode: 'multiple',
  loading: false,
} as const

export const Basic: Story = {
  args: { ...defaultArgs },
  render: (args: Record<string, unknown>) => ({
    components: { NeoTable },
    setup() {
      const sortKey = ref<string | undefined>(undefined)
      const sortDirection = ref<'asc' | 'desc' | undefined>(undefined)
      return { args, sortKey, sortDirection }
    },
    template: `
      <NeoTable
        v-bind="args"
        :sort-key="sortKey"
        :sort-direction="sortDirection"
        @update:sortKey="sortKey = $event"
        @update:sortDirection="sortDirection = $event"
      />
    `,
  }),
}

export const Variants: Story = {
  args: { ...defaultArgs, striped: true, dense: true, bordered: true },
  render: (args: Record<string, unknown>) => ({
    components: { NeoTable },
    setup() {
      return { args }
    },
    template: `
      <NeoTable v-bind="args" />
    `,
  }),
}

export const SelectableRows: Story = {
  args: { ...defaultArgs, selectable: true, selectionMode: 'multiple' },
  render: (args: Record<string, unknown>) => ({
    components: { NeoTable },
    setup() {
      const selected = ref<Array<string | number>>([])
      const onSelectionChange = (keys: Array<string | number>) => {
        selected.value = keys
      }
      return { args, selected, onSelectionChange }
    },
    template: `
      <div class="space-y-2">
        <NeoTable
          v-bind="args"
          :selected-keys="selected"
          @update:selectedKeys="selected = $event"
          @selectionChange="onSelectionChange"
        />
        <div class="text-sm">Selected keys: {{ selected.join(', ') || 'none' }}</div>
      </div>
    `,
  }),
}

export const CustomCellsAndHeader: Story = {
  args: { ...defaultArgs },
  render: (args: Record<string, unknown>) => ({
    components: { NeoTable },
    setup() {
      return { args }
    },
    template: `
      <NeoTable v-bind="args">
        <template #headerCell="{ column, sorted, sortDirection }">
          <div class="inline-flex items-center gap-2">
            <span class="uppercase text-xs tracking-wide">{{ column.header }}</span>
            <span v-if="sorted" class="text-[11px] opacity-70">({{ sortDirection }})</span>
          </div>
        </template>

        <template #cell="{ row, column, value }">
          <template v-if="column.key === 'active'">
            <span
              class="inline-block rounded-md border-2 border-black px-2 py-0.5 text-xs font-bold"
              :class="value === 'Active' ? 'bg-primary text-black' : 'bg-white text-black'"
            >
              {{ value }}
            </span>
          </template>
          <template v-else>
            {{ value }}
          </template>
        </template>
      </NeoTable>
    `,
  }),
}
