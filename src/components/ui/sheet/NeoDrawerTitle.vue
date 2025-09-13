<template>
  <DialogTitle
    data-slot="drawer-title"
    v-bind="delegated"
    :class="cn('font-primary mb-1 line-clamp-2 text-lg font-bold tracking-tight', props.class)"
  >
    <slot />
  </DialogTitle>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DialogTitle, type DialogTitleProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>()
const delegated = reactiveOmit(props, 'class')
</script>
