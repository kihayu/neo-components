<template>
  <DialogDescription
    data-slot="dialog-description"
    v-bind="delegated"
    :class="cn('text-muted-foreground font-secondary text-sm', props.class)"
  >
    <slot />
  </DialogDescription>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DialogDescription, type DialogDescriptionProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>()
const delegated = reactiveOmit(props, 'class')
</script>
