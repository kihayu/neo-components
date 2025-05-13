<template>
  <div class="relative inline-block">
    <motion.div
      :initial="{
        x: 0,
        y: 0,
      }"
      :while-press="{
        x: 0,
        y: 0,
      }"
      :while-hover="hoverAttributes"
      class="font-primary relative z-10 flex transform items-center justify-center overflow-hidden border-4 border-black inset-shadow-2xs inset-shadow-black transition-colors duration-100"
      :class="[
        sizeClasses,
        roundedClasses,
        backgroundClass,
        { 'cursor-pointer active:inset-shadow-sm': interactive },
      ]"
      :tabindex="interactive ? 0 : undefined"
      :role="interactive ? 'button' : 'img'"
      :aria-label="ariaLabel"
      @click="interactive ? $emit('click') : undefined"
      @keydown.enter="interactive ? $emit('click') : undefined"
      @keydown.space="interactive ? $emit('click') : undefined"
    >
      <img
        v-if="src && !error"
        :src="src"
        :alt="alt"
        @error="handleError"
        class="h-full w-full object-cover"
      />
      <span v-else-if="initials" class="leading-none text-white">{{ initials }}</span>
      <slot v-else>
        <User class="text-white" :size="24" />
      </slot>
    </motion.div>
    <div class="absolute inset-0 bg-black" :class="[roundedClasses]"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { motion } from 'motion-v'
import { User } from 'lucide-vue-next'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type AvatarShape = 'circle' | 'square' | 'rounded'
type AvatarColor = 'primary' | 'error' | 'success' | 'warning' | 'info' | 'gray'

export interface NeoAvatarProps {
  size?: AvatarSize
  shape?: AvatarShape
  color?: AvatarColor
  src?: string
  alt?: string
  initials?: string
  interactive?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<NeoAvatarProps>(), {
  size: 'md',
  shape: 'circle',
  color: 'primary',
  src: '',
  alt: 'User avatar',
  initials: '',
  interactive: false,
  ariaLabel: 'User avatar',
})

defineEmits<{
  (e: 'click'): void
}>()

const error = ref(false)

const handleError = () => {
  error.value = true
}

const sizeClasses = computed(() => {
  const sizes = {
    xs: 'h-8 w-8 text-xs',
    sm: 'h-10 w-10 text-sm',
    md: 'h-12 w-12 text-base',
    lg: 'h-16 w-16 text-lg',
    xl: 'h-20 w-20 text-xl',
  }
  return sizes[props.size]
})

const roundedClasses = computed(() => {
  const shapes = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-xl',
  }
  return shapes[props.shape]
})

const backgroundClass = computed(() => {
  const colors = {
    primary: 'bg-primary',
    error: 'bg-error',
    success: 'bg-success',
    warning: 'bg-warning',
    info: 'bg-primary-light',
    gray: 'bg-gray-500',
  }
  return colors[props.color]
})

const hoverAttributes = computed(() => {
  if (!props.interactive) {
    return {}
  }

  let x = 0
  let y = 0

  switch (props.size) {
    case 'xs':
      x = 2
      y = 3
      break
    case 'sm':
      x = 3
      y = 4
      break
    case 'md':
      x = 4
      y = 4
      break
    case 'lg':
      x = 5
      y = 6
      break
    case 'xl':
      x = 6
      y = 8
      break
    default:
      break
  }

  return {
    x: -x,
    y: -y,
  }
})
</script>
