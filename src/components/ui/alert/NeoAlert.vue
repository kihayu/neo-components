<template>
  <div
    data-slot="alert"
    :class="
      cn(
        'grid w-full grid-cols-[0_1fr] grid-rows-2 items-start gap-x-0 gap-y-1 rounded-xl border-4 border-black p-4 has-[svg]:grid-cols-[auto_1fr] has-[svg]:gap-x-3 [&>svg]:size-6',
        alertVariants({ variant: props.variant }),
        props.class,
      )
    "
    role="alert"
  >
    <slot name="icon">
      <AlertCircle v-if="variant === 'info'" />
      <CheckCircle v-else-if="variant === 'success'" />
      <AlertTriangle v-else-if="variant === 'warning'" />
      <XCircle v-else-if="variant === 'error'" />
    </slot>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { type AlertVariants, alertVariants } from '.'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle, AlertTriangle, XCircle } from 'lucide-vue-next'

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant?: AlertVariants['variant']
}>()
</script>

<style></style>
