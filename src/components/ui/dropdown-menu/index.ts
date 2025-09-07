import { cva, type VariantProps } from 'class-variance-authority'
export { default as NeoDropdownMenu } from '@/components/ui/dropdown-menu/NeoDropdownMenu.vue'

/**
 * DropdownMenu content sizing variants
 */
export const dropdownMenuContentVariants = cva(
  [
    'z-50 min-w-[12rem] overflow-hidden rounded-xl border-4 border-black bg-white p-1 shadow-lg',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'p-1 text-sm',
        md: 'p-1.5 text-base',
        lg: 'p-2 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export type DropdownMenuContentVariants = VariantProps<typeof dropdownMenuContentVariants>
