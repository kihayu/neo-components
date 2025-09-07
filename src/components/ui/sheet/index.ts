import { cva, type VariantProps } from 'class-variance-authority'

export { default as NeoDrawer } from '@/components/ui/sheet/NeoDrawer.vue'
export { default as NeoDrawerTrigger } from '@/components/ui/sheet/NeoDrawerTrigger.vue'
export { default as NeoDrawerContent } from '@/components/ui/sheet/NeoDrawerContent.vue'
export { default as NeoDrawerTitle } from '@/components/ui/sheet/NeoDrawerTitle.vue'
export { default as NeoDrawerDescription } from '@/components/ui/sheet/NeoDrawerDescription.vue'
export { default as NeoDrawerClose } from '@/components/ui/sheet/NeoDrawerClose.vue'

/**
 * Drawer (Sheet) content size variants (width for left/right, height for top/bottom)
 */
export const drawerContentVariants = cva(
  'rounded-none border-4 border-black bg-white shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      size: {
        content: '',
        sm: 'w-64',
        md: 'w-80',
        lg: 'w-96',
        xl: 'w-[32rem]',
      },
      side: {
        left: 'left-0 top-0 h-full',
        right: 'right-0 top-0 h-full',
        top: 'top-0 left-0 w-full',
        bottom: 'bottom-0 left-0 w-full',
      },
    },
    defaultVariants: {
      size: 'md',
      side: 'right',
    },
  },
)

export type DrawerContentVariants = VariantProps<typeof drawerContentVariants>
