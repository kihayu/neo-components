<template>
  <div class="relative w-fit">
    <motion.button
      data-slot="button"
      @click="onClick"
      :class="cn(buttonVariants({ variant, size }), props.class)"
      :disabled="disabled"
      :initial="motionInitial"
      :while-hover="motionHover"
      :while-press="motionPress"
      :while-focus="motionFocus"
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
import { type HTMLAttributes, type ButtonHTMLAttributes, computed } from 'vue'
import { type PrimitiveProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { type ButtonVariants, buttonVariants } from '.'
import { motion } from 'motion-v'

export interface NeoButtonProps extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  disabled?: ButtonHTMLAttributes['disabled']
  extendedShadow?: boolean
  extendOnHover?: boolean
}

const props = withDefaults(defineProps<NeoButtonProps>(), {
  class: '',
  disabled: false,
  extendedShadow: false,
  extendOnHover: true,
})

const motionInitial = computed(() => {
  return {
    x: props.extendedShadow && !props.disabled ? -4 : 0,
    y: props.extendedShadow && !props.disabled ? -6 : 0,
  }
})

const motionHover = computed(() => {
  return {
    x: props.disabled ? 0 : props.extendOnHover ? -4 : 0,
    y: props.disabled ? 0 : props.extendOnHover ? -6 : 0,
  }
})

const motionPress = computed(() => {
  return {
    x: 0,
    y: 0,
  }
})

const motionFocus = computed(() => {
  return {
    x: props.extendedShadow ? 0 : -4,
    y: props.extendedShadow ? 0 : -6,
  }
})

interface BasicButtonEmits {
  (e: 'click', value: unknown): void
}
const emit = defineEmits<BasicButtonEmits>()
const onClick = () => {
  emit('click', 'onClick')
}
</script>
