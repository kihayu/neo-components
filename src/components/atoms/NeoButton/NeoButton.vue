<template>
  <div class="relative w-fit">
    <motion.button
      :initial="{
        x: extendedShadow && !disabled ? -distanceToExpand : 0,
        y: extendedShadow && !disabled ? -distanceToExpand : 0,
      }"
      :while-hover="{
        x: disabled ? 0 : extendOnHover ? -distanceToExpand : 0,
        y: disabled ? 0 : extendOnHover ? -distanceToExpand : 0,
      }"
      :while-press="{
        x: 0,
        y: 0,
      }"
      :while-focus="{
        x: extendedShadow ? 0 : extendOnHover ? -distanceToExpand : 0,
        y: extendedShadow ? 0 : extendOnHover ? -distanceToExpand : 0,
      }"
      :disabled="disabled"
      aria-label="Button"
      :class="buttonClasses({ size, type })"
    >
      <slot />
    </motion.button>
    <motion.div
      class="absolute inset-0 rounded-xl bg-black"
      :class="{ 'opacity-0': disabled }"
    ></motion.div>
  </div>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { motion } from 'motion-v'
import { computed } from 'vue'

type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonType = 'primary' | 'error' | 'success' | 'warning'

export interface NeoButtonProps {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
  extendedShadow?: boolean
  extendOnHover?: boolean
}

const {
  size = 'md',
  type = 'primary',
  disabled = false,
  extendedShadow = false,
  extendOnHover = true,
} = defineProps<NeoButtonProps>()

const buttonClasses = cva(
  'font-primary relative z-10 transform rounded-xl border-4 border-black text-white inset-shadow-black transition-colors duration-100 hover:cursor-pointer active:inset-shadow-sm disabled:translate-0 disabled:opacity-65 disabled:hover:cursor-not-allowed disabled:active:inset-shadow-none',
  {
    variants: {
      size: {
        sm: 'px-2 py-1 text-sm',
        md: 'px-4 py-2 text-lg',
        lg: 'px-6 py-3 text-xl',
      },
      type: {
        primary:
          'bg-primary hover:bg-primary-dark focus:bg-primary-dark focus:outline-primary focus-visible:outline-primary disabled:hover:bg-primary!',
        error:
          'bg-error hover:bg-error-dark focus:bg-error-dark focus:outline-error focus-visible:outline-error disabled:hover:bg-error!',
        success:
          'bg-success hover:bg-success-dark focus:bg-success-dark focus:outline-success focus-visible:outline-success disabled:hover:bg-success!',
        warning:
          'bg-warning hover:bg-warning-dark focus:bg-warning-dark focus:outline-warning focus-visible:outline-warning disabled:hover:bg-warning!',
      },
    },
  },
)

const distanceToExpand = computed(() => {
  switch (size) {
    case 'sm':
      return 4
    case 'md':
      return 6
    case 'lg':
      return 8
    default:
      return 6
  }
})
</script>
