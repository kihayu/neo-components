<template>
  <DialogPortal>
    <DialogOverlay
      data-slot="drawer-overlay"
      class="data-[state=open]:animate-in data-[state=closed]:animate-out fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
    />
    <DialogContent
      data-slot="drawer-content"
      v-bind="forwarded"
      :class="
        cn(
          'fixed z-50',
          sidePositionClass,
          drawerContentVariants({ size: props.size, side: props.side }),
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
import { drawerContentVariants, type DrawerContentVariants } from '.'

const props = defineProps<
  DialogContentProps & {
    class?: HTMLAttributes['class']
    size?: DrawerContentVariants['size']
    side?: DrawerContentVariants['side']
  }
>()
const delegated = reactiveOmit(props, 'class', 'size', 'side')
const forwarded = useForwardProps(delegated)

const sidePositionClass = computed(() => {
  const s = (props.side as NonNullable<DrawerContentVariants['side']>) ?? 'right'
  switch (s) {
    case 'left':
      return 'left-0 top-0 h-full'
    case 'right':
      return 'right-0 top-0 h-full'
    case 'top':
      return 'top-0 left-0 w-full'
    case 'bottom':
      return 'bottom-0 left-0 w-full'
    default:
      return 'right-0 top-0 h-full'
  }
})
</script>
