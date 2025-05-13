<template>
  <div
    v-if="show"
    class="font-primary w-full"
    :role="type === 'error' ? 'alert' : 'status'"
    :aria-live="type === 'error' ? 'assertive' : 'polite'"
  >
    <motion.div
      :initial="{
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0.95,
      }"
      :animate="{
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
      }"
      :exit="{
        opacity: 0,
        scale: 0.95,
      }"
      class="flex w-full items-start gap-3 rounded-xl border-4 border-black p-4"
      :class="backgroundClass"
    >
      <div v-if="showIcon" class="flex-shrink-0">
        <component :is="iconComponent" class="h-6 w-6" aria-hidden="true" />
      </div>
      <div class="flex-1">
        <div v-if="title" class="mb-1 font-bold">{{ title }}</div>
        <div class="text-sm">
          <slot>{{ message }}</slot>
        </div>
        <div v-if="$slots.actions" class="mt-3">
          <slot name="actions"></slot>
        </div>
      </div>
      <div v-if="dismissible" class="flex-shrink-0">
        <button
          type="button"
          class="flex rounded-md p-1.5 hover:bg-black/10 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          @click="dismiss"
          aria-label="Dismiss"
        >
          <X class="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { motion } from 'motion-v'
import { AlertCircle, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-vue-next'

type AlertType = 'info' | 'success' | 'warning' | 'error'

export interface NeoAlertProps {
  show: boolean
  type?: AlertType
  title?: string
  message?: string
  dismissible?: boolean
  showIcon?: boolean
  autoClose?: boolean
  autoCloseDelay?: number
}

const props = withDefaults(defineProps<NeoAlertProps>(), {
  show: true,
  type: 'info',
  title: '',
  message: '',
  dismissible: false,
  showIcon: true,
  autoClose: false,
  autoCloseDelay: 5000,
})

interface NeoAlertEmits {
  (event: 'dismiss'): void
  (event: 'close'): void
}

const emit = defineEmits<NeoAlertEmits>()
let autoCloseTimeout: ReturnType<typeof setTimeout> | null = null

const backgroundClass = computed(() => {
  const backgrounds = {
    info: 'bg-blue-50 text-blue-800',
    success: 'bg-green-50 text-green-800',
    warning: 'bg-yellow-50 text-yellow-800',
    error: 'bg-red-50 text-red-800',
  }

  return backgrounds[props.type]
})

const iconComponent = computed(() => {
  const icons = {
    info: AlertCircle,
    success: CheckCircle,
    warning: AlertTriangle,
    error: XCircle,
  }

  return icons[props.type]
})

const dismiss = () => {
  emit('dismiss')
  emit('close')
  if (autoCloseTimeout) {
    clearTimeout(autoCloseTimeout)
  }
}

if (props.autoClose && props.show) {
  autoCloseTimeout = setTimeout(() => {
    dismiss()
  }, props.autoCloseDelay)
}
</script>
