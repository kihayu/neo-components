import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Visual variants for toast items
 */
export const toastVariants = cva(
  'rounded-xl border-4 border-black bg-white p-4 shadow-lg outline-none grid grid-cols-[0_1fr_auto] grid-rows-[auto_auto] gap-x-3 gap-y-1 has-[svg]:grid-cols-[auto_1fr_auto]',
  {
    variants: {
      variant: {
        default: '',
        info: '',
        success: '',
        warning: '',
        error: '',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export type NeoToastVariants = VariantProps<typeof toastVariants>
