<template>
  <div
    data-slot="toast"
    :role="props.role ?? 'status'"
    :aria-label="props.ariaLabel"
    :class="cn(toastVariants({ variant: props.variant }), props.class)"
  >
    <!-- Icon -->
    <slot name="icon">
      <!-- no default icon -->
    </slot>

    <!-- Content -->
    <div class="col-start-2 row-span-2 grid gap-1">
      <div class="font-primary line-clamp-2 font-bold">
        <slot name="title">
          {{ props.title }}
        </slot>
      </div>
      <div class="text-muted-foreground font-secondary text-sm">
        <slot name="description">
          {{ props.description }}
        </slot>
      </div>
    </div>

    <!-- Actions -->
    <div class="col-start-3 row-span-2 ml-4 flex items-start gap-2">
      <slot name="action">
        <NeoButton v-if="props.actionText" :aria-label="props.actionText" @click="onAction">
          {{ props.actionText }}
        </NeoButton>
      </slot>
      <slot name="close">
        <NeoButton v-if="props.closable" aria-label="Dismiss" @click="onDismiss"> × </NeoButton>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import { toastVariants } from '.'
import type { HTMLAttributes } from 'vue'
import type { NeoToastVariants } from '.'
import NeoButton from '@/components/atoms/NeoButton/NeoButton.vue'

export interface NeoToastProps {
  id: string | number
  title?: string
  description?: string
  variant?: NeoToastVariants['variant']
  duration?: number
  closable?: boolean
  actionText?: string
  ariaLabel?: string
  role?: 'status' | 'alert'
  class?: HTMLAttributes['class']
}

export interface NeoToastEmits {
  (e: 'dismiss', id: string | number): void
  (e: 'action', id: string | number): void
}

const props = withDefaults(defineProps<NeoToastProps>(), {
  id: () => Math.random().toString(36).slice(2),
  title: '',
  description: '',
  variant: 'default',
  duration: undefined,
  closable: true,
  actionText: undefined,
  ariaLabel: undefined,
  role: 'status',
  class: undefined,
})

const emit = defineEmits<NeoToastEmits>()

function onDismiss() {
  emit('dismiss', props.id)
}

function onAction() {
  emit('action', props.id)
}
</script>
