<template>
  <AccordionItem data-slot="accordion-item" v-bind="forwardedProps" :class="props.class">
    <slot />
  </AccordionItem>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionItem, type AccordionItemProps, useForwardProps } from 'reka-ui'

const props = defineProps<AccordionItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>
