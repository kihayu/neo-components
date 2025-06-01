import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './NeoButton.vue'

export const buttonVariants = cva(
  'font-primary relative z-10 transform rounded-xl border-4 border-black text-white inset-shadow-black transition-colors duration-100 hover:cursor-pointer active:inset-shadow-sm disabled:translate-0 disabled:opacity-65 disabled:hover:cursor-not-allowed disabled:active:inset-shadow-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary hover:bg-primary-dark focus:bg-primary-dark focus:outline-primary focus-visible:outline-primary disabled:hover:bg-primary!',
        error:
          'bg-error hover:bg-error-dark focus:bg-error-dark focus:outline-error focus-visible:outline-error disabled:hover:bg-error!',
        success:
          'bg-success hover:bg-success-dark focus:bg-success-dark focus:outline-success focus-visible:outline-success disabled:hover:bg-success!',
        warning:
          'bg-warning hover:bg-warning-dark focus:bg-warning-dark focus:outline-warning focus-visible:outline-warning disabled:hover:bg-warning!',
      },
      size: {
        default: 'px-4 py-2 text-lg',
        sm: 'px-2 py-1 text-md',
        lg: 'px-6 py-3 text-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
