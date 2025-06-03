import { cva, type VariantProps } from 'class-variance-authority'

export { default as NeoAlert } from './NeoAlert.vue'
export { default as NeoAlertDescription } from './NeoAlertDescription.vue'
export { default as NeoAlertTitle } from './NeoAlertTitle.vue'

export const alertVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-card text-card-foreground',
      info: 'bg-blue-50 text-blue-800',
      success: 'bg-green-50 text-green-800',
      warning: 'bg-yellow-50 text-yellow-800',
      error: 'bg-red-50 text-red-800',
      destructive:
        'text-destructive bg-card [&>*>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type AlertVariants = VariantProps<typeof alertVariants>
