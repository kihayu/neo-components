<template>
  <div
    data-slot="alert-title"
    :class="cn('font-primary col-start-2 line-clamp-1 font-bold tracking-tight', props.class)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>
