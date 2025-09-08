<template>
  <div>
    <div v-if="$slots.caption" class="mb-2">
      <slot name="caption" />
    </div>

    <div v-if="$slots.toolbar" class="mb-2">
      <slot name="toolbar" />
    </div>

    <div class="w-full overflow-x-auto">
      <table
        :role="role ?? 'table'"
        :aria-label="ariaLabel"
        :aria-describedby="ariaDescribedby"
        :aria-labelledby="ariaLabelledby"
        :class="[tableClassComputed, tableClass]"
      >
        <thead v-if="showHeader !== false">
          <tr :class="headerRowClass">
            <template v-for="(col, ci) in columnsNormalized" :key="col.key">
              <th
                scope="col"
                :class="['bg-white text-left align-bottom', headerCellClass(col)]"
                :aria-sort="ariaSortFor(col)"
              >
                <slot
                  v-if="$slots.headerCell"
                  name="headerCell"
                  :column="col"
                  :index="ci"
                  :sorted="isSorted(col)"
                  :sortDirection="currentSortDirection"
                />

                <button
                  v-else
                  type="button"
                  class="focus-visible:outline-primary inline-flex items-center gap-2 rounded-md px-2 py-1 font-bold focus-visible:outline-2"
                  :class="col.sortable ? 'cursor-pointer' : 'cursor-default'"
                  :disabled="!col.sortable"
                  @click="onHeaderClick(col, $event)"
                >
                  <span class="truncate">{{ col.header }}</span>
                  <span v-if="col.sortable" aria-hidden="true" class="inline-block">
                    <svg
                      v-if="isSorted(col) && currentSortDirection === 'asc'"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="currentColor"
                      class="translate-y-[1px]"
                    >
                      <path d="M7 14l5-5 5 5z" />
                    </svg>
                    <svg
                      v-else-if="isSorted(col) && currentSortDirection === 'desc'"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="currentColor"
                      class="-translate-y-[1px]"
                    >
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="currentColor"
                      class="opacity-40"
                    >
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </span>
                </button>
              </th>
            </template>
          </tr>
        </thead>

        <tbody :class="bodyClass">
          <!-- Empty and not loading -->
          <tr v-if="!rowsSorted.length && !loading">
            <td
              :colspan="columnsNormalized.length"
              class="px-3 py-2 text-center text-sm text-black/70"
            >
              <slot name="empty">
                {{ emptyText ?? 'No data available' }}
              </slot>
            </td>
          </tr>

          <!-- Loading -->
          <tr v-else-if="loading">
            <td :colspan="columnsNormalized.length" class="px-3 py-3 text-center">
              <slot name="loading">
                <span class="text-sm text-black/70">Loading…</span>
              </slot>
            </td>
          </tr>

          <!-- Rows -->
          <template v-else>
            <tr
              v-for="(row, ri) in rowsSorted"
              :key="rowKey(row, ri)"
              :class="rowClassComputed(row, ri)"
              :aria-label="rowMeta ? rowMeta(row, ri)?.ariaLabel : undefined"
              :data-selected="isRowSelected(row, ri) || undefined"
              @click="onRowClick(row, ri, $event)"
              @dblclick="onRowDblclick(row, ri, $event)"
              @contextmenu.prevent="onRowContextmenu(row, ri, $event)"
            >
              <template v-for="(col, ci) in columnsNormalized" :key="col.key">
                <td
                  role="cell"
                  :class="cellClassComputed(row, col, ri, ci)"
                  :tabindex="isFocusedCell(ri, ci) ? 0 : -1"
                  @keydown="onCellKeydown(ri, ci, $event)"
                  :ref="(el) => setCellRef(ri, ci, el as HTMLTableCellElement | null)"
                >
                  <!-- Custom row wrapper -->
                  <template v-if="$slots.row && ci === 0">
                    <slot name="row" :row="row" :index="ri" :selected="isRowSelected(row, ri)" />
                  </template>

                  <!-- Custom cell -->
                  <slot
                    v-if="$slots.cell"
                    name="cell"
                    :row="row"
                    :column="col"
                    :value="cellValue(row, col)"
                    :rowIndex="ri"
                    :colIndex="ci"
                  />

                  <!-- Built-in cell -->
                  <template v-else>
                    {{ displayCell(row, col) }}
                  </template>
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Pagination area -->
    <div v-if="$slots.pagination" class="mt-2">
      <slot name="pagination" :page="page" :perPage="perPage" :total="total" :setPage="setPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { tableVariants, type TableVariants } from '.'
import type { HTMLAttributes } from 'vue'

export type TableSortDirection = 'asc' | 'desc' | null

export interface TableColumn<TData, TValue = unknown> {
  key: string
  header: string
  accessor?: (row: TData) => TValue
  sortable?: boolean
  sortKey?: string
  width?: number | string
  align?: 'start' | 'center' | 'end'
  colSpan?: number
  ariaLabel?: string
  class?: HTMLAttributes['class']
  headerClass?: HTMLAttributes['class']
  cellClass?: HTMLAttributes['class']
}

export interface TableRowMeta {
  disabled?: boolean
  selectable?: boolean
  ariaLabel?: string
  class?: HTMLAttributes['class']
}

export interface NeoTableProps<TData = Record<string, unknown>> {
  data: TData[]
  columns: Array<TableColumn<TData>>
  keyField?: keyof TData | ((row: TData) => string | number)
  page?: number
  perPage?: number
  total?: number
  sortKey?: string | ((a: TData, b: TData) => number)
  sortDirection?: Exclude<TableSortDirection, null>
  selectable?: boolean
  selectionMode?: 'single' | 'multiple'
  selectedKeys?: Array<string | number>
  showHeader?: boolean
  stickyHeader?: boolean
  dense?: boolean
  bordered?: boolean
  striped?: boolean
  loading?: boolean
  emptyText?: string
  rowMeta?: (row: TData, index: number) => TableRowMeta | undefined
  rowClass?: (row: TData, index: number) => HTMLAttributes['class'] | undefined
  cellClass?: (
    row: TData,
    column: TableColumn<TData>,
    rowIndex: number,
    colIndex: number,
  ) => HTMLAttributes['class'] | undefined
  ariaLabel?: string
  ariaDescribedby?: string
  ariaLabelledby?: string
  role?: 'table'
  tableClass?: HTMLAttributes['class']
  headerRowClass?: HTMLAttributes['class']
  bodyClass?: HTMLAttributes['class']
}

export interface NeoTableEmits<TData = Record<string, unknown>> {
  (e: 'update:page', value: number): void
  (e: 'update:perPage', value: number): void
  (e: 'update:sortKey', value: string | ((a: TData, b: TData) => number)): void
  (e: 'update:sortDirection', value: Exclude<TableSortDirection, null>): void
  (e: 'update:selectedKeys', value: Array<string | number>): void
  (e: 'headerClick', col: TableColumn<TData>, ev: MouseEvent): void
  (e: 'rowClick', payload: { row: TData; index: number; ev: MouseEvent }): void
  (e: 'rowDblclick', payload: { row: TData; index: number; ev: MouseEvent }): void
  (e: 'rowContextmenu', payload: { row: TData; index: number; ev: MouseEvent }): void
  (e: 'selectionChange', keys: Array<string | number>): void
  (e: 'keydown', ev: KeyboardEvent): void
}

type Row = Record<string, unknown>

const {
  data: rowsData,
  columns: columnDefs,
  keyField,
  page,
  perPage,
  total,
  sortKey,
  sortDirection,
  selectable,
  selectionMode,
  selectedKeys,
  showHeader,
  stickyHeader,
  dense,
  bordered,
  striped,
  loading,
  emptyText,
  rowMeta,
  rowClass,
  cellClass,
  ariaLabel,
  ariaDescribedby,
  ariaLabelledby,
  role,
  tableClass,
  headerRowClass,
  bodyClass,
} = defineProps<NeoTableProps<Row>>()
const emit = defineEmits<NeoTableEmits<Row>>()

const columnsNormalized = computed<Array<TableColumn<Row>>>(() => {
  const cols = (columnDefs ?? []) as Array<TableColumn<Row>>
  return cols.map((c: TableColumn<Row>) => ({
    ...c,
    sortable: !!c.sortable,
  }))
})

const internalSortKey = ref<string | ((a: Row, b: Row) => number) | undefined>(
  sortKey as string | ((a: Row, b: Row) => number) | undefined,
)
const internalSortDirection = ref<Exclude<TableSortDirection, null> | undefined>(sortDirection)

watch(
  () => sortKey,
  (v) => {
    internalSortKey.value = v as string | ((a: Row, b: Row) => number) | undefined
  },
)
watch(
  () => sortDirection,
  (v) => {
    internalSortDirection.value = v
  },
)

const currentSortKey = computed(() => internalSortKey.value)
const currentSortDirection = computed<Exclude<TableSortDirection, null> | undefined>(
  () => internalSortDirection.value,
)

function isSorted(col: TableColumn<Row>) {
  const ck = currentSortKey.value
  if (!ck) return false
  if (typeof ck === 'function') return true
  const keyForCol = col.sortKey ?? col.key
  return ck === keyForCol
}

function ariaSortFor(col: TableColumn<Row>) {
  if (!isSorted(col)) return 'none'
  return currentSortDirection.value === 'asc' ? 'ascending' : 'descending'
}

function toggleDirection(dir: Exclude<TableSortDirection, null>) {
  return dir === 'asc' ? 'desc' : 'asc'
}

function onHeaderClick(col: TableColumn<Row>, ev: MouseEvent) {
  emit('headerClick', col, ev)
  if (!col.sortable) return

  let nextKey: NonNullable<typeof internalSortKey.value>
  if (typeof currentSortKey.value === 'function') {
    nextKey = (col.sortKey ?? col.key) as NonNullable<typeof internalSortKey.value>
  } else {
    const keyForCol = col.sortKey ?? col.key
    nextKey = keyForCol as NonNullable<typeof internalSortKey.value>
  }

  let nextDir: Exclude<TableSortDirection, null>
  if (!isSorted(col) || !currentSortDirection.value) nextDir = 'asc'
  else nextDir = toggleDirection(currentSortDirection.value)

  internalSortKey.value = nextKey
  internalSortDirection.value = nextDir

  emit('update:sortKey', nextKey)
  emit('update:sortDirection', nextDir)
}

function rowKey(row: Row, index: number) {
  const kf = keyField
  if (typeof kf === 'function') return (kf as (row: Row) => string | number)(row)
  if (typeof kf === 'string') {
    const key = row[kf as keyof Row]
    return typeof key === 'string' || typeof key === 'number' ? key : index
  }
  return index
}

const rowsSorted = computed<Row[]>(() => {
  const dataArr = (rowsData ?? []) as Row[]
  const ck = currentSortKey.value
  const dir = currentSortDirection.value
  if (!ck || !dir) return dataArr

  if (typeof ck === 'function') {
    const sorted = [...dataArr].sort(ck)
    return dir === 'asc' ? sorted : sorted.reverse()
  }

  const col = columnsNormalized.value.find((c) => (c.sortKey ?? c.key) === ck)
  const getVal = (row: Row): unknown => {
    if (col?.accessor) return col.accessor(row as Row)
    if (typeof ck === 'string')
      return (row[ck as keyof Row] ?? row[col?.key as keyof Row]) as unknown
    return row[col?.key as keyof Row] as unknown
  }
  const sorted = [...dataArr].sort((a, b) => {
    const va = getVal(a)
    const vb = getVal(b)
    if (va == null && vb == null) return 0
    if (va == null) return -1
    if (vb == null) return 1
    if (typeof va === 'number' && typeof vb === 'number') return va - vb
    return String(va).localeCompare(String(vb))
  })
  return dir === 'asc' ? sorted : sorted.reverse()
})

const tableClassComputed = computed(() =>
  tableVariants({
    dense: (dense as NonNullable<TableVariants['dense']>) ?? false,
    bordered: (bordered as NonNullable<TableVariants['bordered']>) ?? true,
    striped: (striped as NonNullable<TableVariants['striped']>) ?? false,
    stickyHeader: (stickyHeader as NonNullable<TableVariants['stickyHeader']>) ?? false,
  }),
)

function cellValue(row: Row, col: TableColumn<Row>): unknown {
  return col.accessor ? col.accessor(row as Row) : (row[col.key as keyof Row] as unknown)
}
function displayCell(row: Row, col: TableColumn<Row>) {
  const v = cellValue(row, col)
  return v == null ? '' : (v as unknown as string | number | boolean)
}

function headerCellClass(col: TableColumn<Row>) {
  return [col.headerClass, 'px-2 py-2 font-extrabold'].filter(Boolean)
}
function cellClassComputed(row: Row, col: TableColumn<Row>, ri: number, ci: number) {
  const align =
    col.align === 'end' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
  const extra = cellClass?.(row, col, ri, ci) ?? col.cellClass ?? align
  return [
    'px-2 py-1.5 align-top focus-visible:outline-2 focus-visible:outline-primary',
    extra,
  ].filter(Boolean)
}
function rowClassComputed(row: Row, ri: number) {
  return rowClass?.(row, ri) ?? rowMeta?.(row, ri)?.class
}

const internalSelected = ref<Set<string | number>>(new Set(selectedKeys ?? []))
watch(
  () => selectedKeys,
  (ks) => {
    if (ks) internalSelected.value = new Set(ks)
  },
)
function isRowSelected(row: Row, ri: number) {
  const key = rowKey(row, ri)
  return internalSelected.value.has(key)
}
function setSelectedKeys(next: Array<string | number>) {
  internalSelected.value = new Set(next)
  emit('update:selectedKeys', next)
  emit('selectionChange', next)
}
function toggleRowSelection(row: Row, ri: number) {
  if (!selectable) return
  const key = rowKey(row, ri)
  const next = new Set(internalSelected.value)
  if (selectionMode === 'single') {
    if (next.has(key)) next.clear()
    else {
      next.clear()
      next.add(key)
    }
  } else {
    if (next.has(key)) next.delete(key)
    else next.add(key)
  }
  setSelectedKeys(Array.from(next))
}

function onRowClick(row: Row, ri: number, ev: MouseEvent) {
  toggleRowSelection(row, ri)
  emit('rowClick', { row, index: ri, ev })
}
function onRowDblclick(row: Row, ri: number, ev: MouseEvent) {
  emit('rowDblclick', { row, index: ri, ev })
}
function onRowContextmenu(row: Row, ri: number, ev: MouseEvent) {
  emit('rowContextmenu', { row, index: ri, ev })
}

const focused = reactive({ r: 0, c: 0 })
const cellRefs = ref<Array<Array<HTMLTableCellElement | null>>>([])

function ensureMatrix(rows: number, cols: number) {
  if (!cellRefs.value.length) {
    cellRefs.value = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null))
  }
}
watch(
  () => [rowsSorted.value.length, columnsNormalized.value.length],
  ([r, c]) => {
    ensureMatrix(r, c)
  },
  { immediate: true },
)

function setCellRef(ri: number, ci: number, el: HTMLTableCellElement | null) {
  if (!cellRefs.value[ri]) cellRefs.value[ri] = []
  cellRefs.value[ri][ci] = el
}

function isFocusedCell(ri: number, ci: number) {
  return focused.r === ri && focused.c === ci
}

function moveFocus(r: number, c: number) {
  const rows = rowsSorted.value.length
  const cols = columnsNormalized.value.length
  const nr = Math.max(0, Math.min(rows - 1, r))
  const nc = Math.max(0, Math.min(cols - 1, c))
  focused.r = nr
  focused.c = nc
  const el = cellRefs.value[nr]?.[nc]
  el?.focus()
}

function onCellKeydown(ri: number, ci: number, ev: KeyboardEvent) {
  emit('keydown', ev)
  switch (ev.key) {
    case 'ArrowRight':
      ev.preventDefault()
      moveFocus(ri, ci + 1)
      break
    case 'ArrowLeft':
      ev.preventDefault()
      moveFocus(ri, ci - 1)
      break
    case 'ArrowDown':
      ev.preventDefault()
      moveFocus(ri + 1, ci)
      break
    case 'ArrowUp':
      ev.preventDefault()
      moveFocus(ri - 1, ci)
      break
    case 'Home':
      ev.preventDefault()
      moveFocus(ri, 0)
      break
    case 'End':
      ev.preventDefault()
      moveFocus(ri, columnsNormalized.value.length - 1)
      break
    case 'Enter':
    case ' ':
      ev.preventDefault()
      toggleRowSelection(rowsSorted.value[ri], ri)
      break
  }
}

function setPage(p: number) {
  emit('update:page', p)
}
</script>
