<template>
  <div class="relative inline-flex h-fit w-fit">
    <motion.div
      :initial="{
        x: 0,
        y: 0,
      }"
      :while-hover="{
        x: dismissible ? -3 : 0,
        y: dismissible ? -4 : 0,
      }"
      class="font-primary relative z-10 flex transform items-center rounded-full border-4 border-black px-4 py-1.5 transition-colors duration-100"
      :class="[typeClasses, sizeClasses, { 'pr-8': dismissible }]"
      role="status"
      :aria-label="ariaLabel"
    >
      <span class="flex items-center gap-1.5">
        <slot name="icon"></slot>
        <slot>{{ label }}</slot>
      </span>
      <motion.button
        v-if="dismissible"
        type="button"
        class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full p-0.5 hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        aria-label="Remove tag"
        @click="onDismiss"
      >
        <X :size="14" />
      </motion.button>
    </motion.div>
    <div class="absolute inset-0 rounded-full bg-black"></div>
  </div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { computed } from 'vue'
import { X } from 'lucide-vue-next'

type TagType = 'primary' | 'error' | 'success' | 'warning' | 'info'
type TagSize = 'sm' | 'md' | 'lg'

export interface NeoTagProps {
  type?: TagType
  size?: TagSize
  label?: string
  dismissible?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<NeoTagProps>(), {
  type: 'primary',
  size: 'md',
  label: '',
  dismissible: false,
  ariaLabel: 'Tag',
})

interface NeoTagEmits {
  (event: 'dismiss'): void
}

const emit = defineEmits<NeoTagEmits>()

const typeClasses = computed(() => {
  const types = {
    primary: 'bg-primary text-white',
    error: 'bg-error text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    info: 'bg-primary-light text-white',
  }
  return types[props.type]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }
  return sizes[props.size]
})

const onDismiss = () => {
  emit('dismiss')
}
</script>
