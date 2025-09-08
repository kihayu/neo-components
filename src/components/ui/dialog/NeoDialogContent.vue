<template>
  <DialogPortal>
    <DialogOverlay
      data-slot="dialog-overlay"
      class="data-[state=open]:animate-in data-[state=closed]:animate-out fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
    />
    <DialogContent
      data-slot="dialog-content"
      v-bind="forwarded"
      :class="
        cn(
          'fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
          dialogContentVariants({ size: props.size }),
          contentWidth,
          props.class,
        )
      "
    >
      <slot />
    </DialogContent>
  </DialogPortal>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import {
  DialogPortal,
  DialogOverlay,
  DialogContent,
  type DialogContentProps,
  useForwardProps,
} from 'reka-ui'
import { cn } from '@/lib/utils'
import { dialogContentVariants, type DialogContentVariants } from '.'

const props = defineProps<
  DialogContentProps & { class?: HTMLAttributes['class']; size?: DialogContentVariants['size'] }
>()
const delegated = reactiveOmit(props, 'class', 'size')
const forwarded = useForwardProps(delegated)

const contentWidth = computed(() => {
  const sizes = {
    content: 'w-[28rem]',
    sm: 'w-[20rem]',
    md: 'w-[28rem]',
    lg: 'w-[36rem]',
    xl: 'w-[44rem]',
  }
  return sizes[props.size ?? 'md']
})
</script>
