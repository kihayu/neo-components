import { cva, type VariantProps } from 'class-variance-authority'

export { default as NeoDialog } from '@/components/ui/dialog/NeoDialog.vue'
export { default as NeoDialogTrigger } from '@/components/ui/dialog/NeoDialogTrigger.vue'
export { default as NeoDialogContent } from '@/components/ui/dialog/NeoDialogContent.vue'
export { default as NeoDialogTitle } from '@/components/ui/dialog/NeoDialogTitle.vue'
export { default as NeoDialogDescription } from '@/components/ui/dialog/NeoDialogDescription.vue'
export { default as NeoDialogClose } from '@/components/ui/dialog/NeoDialogClose.vue'

/**
 * Dialog content size variants
 */
export const dialogContentVariants = cva(
  'rounded-xl border-4 border-black bg-white p-4 shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      size: {
        content: '',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export type DialogContentVariants = VariantProps<typeof dialogContentVariants>
