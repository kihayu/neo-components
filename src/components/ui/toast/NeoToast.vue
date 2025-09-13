<template>
  <div
    data-slot="toast"
    :role="role ?? 'status'"
    :aria-label="ariaLabel"
    :class="cn(toastVariants({ variant }), className)"
  >
    <slot name="icon"> </slot>

    <div class="col-start-2 row-span-2 grid gap-1">
      <div class="font-primary line-clamp-2 font-bold">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="text-muted-foreground font-secondary text-sm">
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </div>

    <div class="col-start-3 row-span-2 ml-4 flex items-start gap-2">
      <slot name="action">
        <NeoButton v-if="actionText" :aria-label="actionText" @click="onAction">
          {{ actionText }}
        </NeoButton>
      </slot>
      <slot name="close">
        <NeoButton v-if="closable" aria-label="Dismiss" @click="onDismiss">
          <X />
        </NeoButton>
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
import { X } from 'lucide-vue-next'

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

const {
  id,
  title = '',
  description = '',
  variant = 'default',
  closable = true,
  actionText = undefined,
  ariaLabel = undefined,
  role = 'status',
  class: className = undefined,
} = defineProps<NeoToastProps>()
const emit = defineEmits<NeoToastEmits>()

function onDismiss() {
  emit('dismiss', id)
}

function onAction() {
  emit('action', id)
}
</script>
