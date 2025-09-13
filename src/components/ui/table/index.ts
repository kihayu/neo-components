import { cva, type VariantProps } from 'class-variance-authority'
export { default as NeoTable } from './NeoTable.vue'
export type {
  TableSortDirection,
  TableColumn,
  TableRowMeta,
  NeoTableProps,
  NeoTableEmits,
} from './NeoTable.vue'

/**
 * Table style variants: density, borders, striping
 */
export const tableVariants = cva(
  [
    'w-full border-collapse',
    // baseline brutalist borders and typography
    'text-base',
  ].join(' '),
  {
    variants: {
      dense: {
        true: 'text-sm',
        false: 'text-base',
      },
      bordered: {
        true: '[&_th]:border-4 [&_td]:border-4 [&_th]:border-black [&_td]:border-black',
        false: '',
      },
      striped: {
        true: '[&_tbody_tr:nth-child(odd)]:bg-black/5',
        false: '',
      },
      stickyHeader: {
        true: '[&_thead_th]:sticky [&_thead_th]:top-0 [&_thead_th]:bg-white',
        false: '',
      },
    },
    defaultVariants: {
      dense: false,
      bordered: true,
      striped: false,
      stickyHeader: false,
    },
  },
)

export type TableVariants = VariantProps<typeof tableVariants>
