<template>
  <AccordionContent
    data-slot="accordion-content"
    v-bind="delegatedProps"
    class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down transform overflow-hidden rounded-b-xl border-4 border-t-0 border-black px-4"
  >
    <div :class="cn('py-3', props.class)">
      <slot />
    </div>
  </AccordionContent>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionContent, type AccordionContentProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionContentProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>
