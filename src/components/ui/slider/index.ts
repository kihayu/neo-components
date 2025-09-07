import { cva, type VariantProps } from 'class-variance-authority'
export { default as NeoSlider } from '@/components/ui/slider/NeoSlider.vue'

export const sliderVariants = cva('relative flex select-none touch-none items-center', {
  variants: {
    size: {
      sm: 'h-8',
      md: 'h-10',
      lg: 'h-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type SliderVariants = VariantProps<typeof sliderVariants>
