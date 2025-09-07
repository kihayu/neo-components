<template>
  <!-- Toast Viewport -->
  <div :class="cn('pointer-events-none fixed z-[60] space-y-2 p-4', containerClasses, props.class)">
    <NeoToast
      v-for="t in visibleToasts"
      :key="t.id"
      v-bind="t"
      class="pointer-events-auto"
      @dismiss="onDismiss"
      @action="onAction"
    />
  </div>

  <!-- Live region for screen readers (polite by default) -->
  <div class="sr-only" aria-live="polite" aria-atomic="true">
    <template v-for="sr in politeQueue" :key="sr.key">
      {{ sr.text }}
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, toRefs, defineExpose } from 'vue'
import { cn } from '@/lib/utils'
import NeoToast from '@/components/ui/toast/NeoToast.vue'
import type { HTMLAttributes } from 'vue'

export interface NeoToastProviderProps {
  max?: number
  duration?: number
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
  class?: HTMLAttributes['class']
}

// Local toast props shape (mirrors NeoToastProps)
export interface ToastProps {
  id: string | number
  title?: string
  description?: string
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error'
  duration?: number
  closable?: boolean
  actionText?: string
  ariaLabel?: string
  role?: 'status' | 'alert'
  class?: HTMLAttributes['class']
}

type ToastInput = Omit<ToastProps, 'id'> & { id?: string | number }

/**
 * Provider props (queue settings, position)
 */
const props = withDefaults(defineProps<NeoToastProviderProps>(), {
  max: 3,
  duration: 4000,
  position: 'top-right',
  class: undefined,
})

/**
 * Internal state: visible toasts and queued toasts beyond max
 */
const state = reactive<{
  visibleToasts: ToastProps[]
  queue: ToastProps[]
  timers: Map<string | number, number>
  counter: number
  politeQueue: { key: string; text: string }[]
}>({
  visibleToasts: [],
  queue: [],
  timers: new Map<string | number, number>(),
  counter: 0,
  politeQueue: [],
})

const { visibleToasts, politeQueue } = toRefs(state)

/**
 * Position classes
 */
const containerClasses = computed(() => {
  const map: Record<Required<NeoToastProviderProps>['position'], string> = {
    'top-left': 'left-0 top-0',
    'top-center': 'left-1/2 top-0 -translate-x-1/2',
    'top-right': 'right-0 top-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-0 right-0',
  }
  return map[(props.position as Required<NeoToastProviderProps>['position']) ?? 'top-right']
})

/**
 * Helpers
 */
function nextId(): number {
  state.counter += 1
  return state.counter
}

function scheduleDismiss(id: string | number, ms?: number) {
  const timeout = window.setTimeout(() => {
    removeToast(id)
  }, ms ?? props.duration)
  state.timers.set(id, timeout)
}

function clearTimer(id: string | number) {
  const t = state.timers.get(id)
  if (t) {
    window.clearTimeout(t)
    state.timers.delete(id)
  }
}

function removeToast(id: string | number) {
  // remove from visible
  const idx = state.visibleToasts.findIndex((t) => t.id === id)
  if (idx !== -1) {
    state.visibleToasts.splice(idx, 1)
  }
  clearTimer(id)
  // promote next from queue
  if (state.queue.length > 0 && state.visibleToasts.length < (props.max ?? 3)) {
    const next = state.queue.shift()!
    state.visibleToasts.push(next)
    scheduleDismiss(next.id, next.duration ?? props.duration)
    // Add polite live text
    enqueuePolite(next)
  }
}

function enqueuePolite(t: ToastProps) {
  const text = [t.title, t.description].filter(Boolean).join(' – ')
  if (!text) return
  const key = `${t.id}`
  state.politeQueue.push({ key, text })
  // Keep live region small
  if (state.politeQueue.length > 5) state.politeQueue.shift()
}

/**
 * Public API: push toasts
 */
function push(toast: ToastInput): string | number {
  const id = toast.id ?? nextId()
  const entry: ToastProps = {
    id,
    title: toast.title ?? '',
    description: toast.description ?? '',
    variant: toast.variant ?? 'default',
    duration: toast.duration ?? props.duration,
    closable: toast.closable ?? true,
    actionText: toast.actionText,
    ariaLabel: toast.ariaLabel,
    role: toast.role ?? 'status',
    class: toast.class,
  }

  if (state.visibleToasts.length < (props.max ?? 3)) {
    state.visibleToasts.push(entry)
    scheduleDismiss(id, entry.duration)
    enqueuePolite(entry)
  } else {
    state.queue.push(entry)
  }
  return id
}

function dismiss(id: string | number) {
  removeToast(id)
}

/**
 * Handlers from child items
 */
function onDismiss(id: string | number) {
  dismiss(id)
}

function onAction(id: string | number) {
  // For now just dismiss; external listeners can react via events on NeoToast
  dismiss(id)
}

/**
 * Expose imperative API for consumers (e.g., stories)
 */
defineExpose({
  push,
  dismiss,
})

/**
 * SR-only queue for polite announcements
 * (already exposed via toRefs above)
 */
</script>
