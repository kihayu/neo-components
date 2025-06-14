<template>
  <div class="relative w-fit">
    <motion.button
      :initial="{
        x: extendedShadow && !disabled ? -4 : 0,
        y: extendedShadow && !disabled ? -6 : 0,
      }"
      :while-hover="{
        x: disabled ? 0 : extendOnHover ? -4 : 0,
        y: disabled ? 0 : extendOnHover ? -6 : 0,
      }"
      :while-press="{
        x: 0,
        y: 0,
      }"
      :while-focus="{
        x: extendedShadow ? 0 : -4,
        y: extendedShadow ? 0 : -6,
      }"
      :disabled="disabled"
      class="font-primary relative z-10 transform rounded-xl border-4 border-black text-white inset-shadow-black transition-colors duration-100 hover:cursor-pointer active:inset-shadow-sm disabled:translate-0 disabled:opacity-65 disabled:hover:cursor-not-allowed disabled:active:inset-shadow-none"
      aria-label="Button"
      :class="buttonClasses"
      @click="onClick"
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
import { motion } from 'motion-v'
import { computed } from 'vue'

type ButtonSize = 'medium' | 'large'
type ButtonType = 'primary' | 'error' | 'success' | 'warning'

export interface NeoButtonProps {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
  extendedShadow?: boolean
  extendOnHover?: boolean
}

const props = withDefaults(defineProps<NeoButtonProps>(), {
  size: 'medium',
  type: 'primary',
  disabled: false,
  extendedShadow: false,
  extendOnHover: true,
})

const buttonClasses = computed(() => {
  const buttonClass = []
  if (props.size === 'medium') {
    buttonClass.push('px-4 py-2 text-lg')
  } else if (props.size === 'large') {
    buttonClass.push('px-6 py-3 text-xl')
  }

  const buttonTypeClasses = {
    primary:
      'bg-primary hover:bg-primary-dark focus:bg-primary-dark focus:outline-primary focus-visible:outline-primary disabled:hover:bg-primary!',
    error:
      'bg-error hover:bg-error-dark focus:bg-error-dark focus:outline-error focus-visible:outline-error disabled:hover:bg-error!',
    success:
      'bg-success hover:bg-success-dark focus:bg-success-dark focus:outline-success focus-visible:outline-success disabled:hover:bg-success!',
    warning:
      'bg-warning hover:bg-warning-dark focus:bg-warning-dark focus:outline-warning focus-visible:outline-warning disabled:hover:bg-warning!',
  }

  buttonClass.push(buttonTypeClasses[props.type])
  return buttonClass.join(' ')
})

interface BasicButtonEmits {
  (e: 'click', value: unknown): void
}

const emit = defineEmits<BasicButtonEmits>()
const onClick = () => {
  emit('click', 'onClick')
}
</script>
