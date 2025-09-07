<template>
  <nav
    class="inline-flex items-center gap-1"
    role="navigation"
    :aria-label="props.ariaLabel || 'Pagination'"
  >
    <component
      :is="slots.first ? 'div' : NeoButton"
      v-if="!props.hideFirstLast"
      :disabled="isFirstDisabled"
      class="min-w-9"
      @click="goTo(1)"
    >
      <slot name="first" :disabled="isFirstDisabled" :go="() => goTo(1)">
        <ChevronsLeft class="h-4 w-4" aria-hidden="true" />
        <span class="sr-only">First</span>
      </slot>
    </component>

    <component
      :is="slots.previous ? 'div' : NeoButton"
      v-if="!props.hidePrevNext"
      :disabled="isPrevDisabled"
      class="min-w-9"
      @click="goTo(props.page - 1)"
    >
      <slot name="previous" :disabled="isPrevDisabled" :go="() => goTo(props.page - 1)">
        <ChevronLeft class="h-4 w-4" aria-hidden="true" />
        <span class="sr-only">Previous</span>
      </slot>
    </component>

    <template v-for="(it, idx) in items" :key="idx">
      <NeoButton
        v-if="typeof it === 'number'"
        class="aspect-square"
        :extend-on-hover="false"
        :aria-current="it === props.page ? 'page' : undefined"
        :disabled="props.disabled"
        size="sm"
        @click="goTo(it)"
      >
        <slot
          name="item"
          :page="it"
          :selected="it === props.page"
          :disabled="props.disabled"
          :go="() => goTo(it)"
        >
          {{ it }}
        </slot>
      </NeoButton>

      <span v-else class="mx-1 px-1 text-sm select-none" aria-hidden="true">
        <slot name="ellipsis">…</slot>
      </span>
    </template>

    <component
      :is="slots.next ? 'div' : NeoButton"
      v-if="!props.hidePrevNext"
      :disabled="isNextDisabled"
      :extend-on-hover="false"
      class="min-w-9"
      @click="goTo(props.page + 1)"
    >
      <slot name="next" :disabled="isNextDisabled" :go="() => goTo(props.page + 1)">
        <ChevronRight class="h-4 w-4" aria-hidden="true" />
        <span class="sr-only">Next</span>
      </slot>
    </component>

    <component
      :is="slots.last ? 'div' : NeoButton"
      v-if="!props.hideFirstLast"
      :disabled="isLastDisabled"
      :extend-on-hover="false"
      class="min-w-9"
      @click="goTo(totalPages)"
    >
      <slot name="last" :disabled="isLastDisabled" :go="() => goTo(totalPages)">
        <ChevronsRight class="h-4 w-4" aria-hidden="true" />
        <span class="sr-only">Last</span>
      </slot>
    </component>
  </nav>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { HTMLAttributes } from 'vue'
import NeoButton from '@/components/atoms/NeoButton/NeoButton.vue'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'

export type NeoSize = 'sm' | 'md' | 'lg'
export interface NeoPaginationProps {
  page: number
  total: number
  perPage: number
  siblingCount?: 0 | 1 | 2 | 3
  boundaryCount?: 0 | 1 | 2
  hidePrevNext?: boolean
  hideFirstLast?: boolean
  disabled?: boolean
  ariaLabel?: string
  role?: string
  class?: HTMLAttributes['class']
  size?: NeoSize
  variant?: 'default' | 'outline'
}

export interface NeoPaginationEmits {
  (e: 'update:page', value: number): void
  (e: 'change', value: number): void
}

const props = withDefaults(defineProps<NeoPaginationProps>(), {
  page: 1,
  total: 0,
  perPage: 10,
  siblingCount: 1,
  boundaryCount: 1,
  hidePrevNext: false,
  hideFirstLast: false,
  disabled: false,
  ariaLabel: 'Pagination',
  role: undefined,
  class: undefined,
  size: undefined,
  variant: 'default',
})

const emit = defineEmits<NeoPaginationEmits>()
const slots = useSlots()

const totalPages = computed(() => {
  const tp = Math.ceil((props.total ?? 0) / (props.perPage || 1))
  return tp > 0 ? tp : 1
})

function goTo(p: number) {
  if (props.disabled) return
  const next = Math.min(Math.max(1, p), totalPages.value)
  if (next !== props.page) {
    emit('update:page', next)
    emit('change', next)
  }
}

const isFirstDisabled = computed(() => props.disabled || props.page <= 1)
const isPrevDisabled = computed(() => props.disabled || props.page <= 1)
const isNextDisabled = computed(() => props.disabled || props.page >= totalPages.value)
const isLastDisabled = computed(() => props.disabled || props.page >= totalPages.value)

type PageItem = number | 'ellipsis'

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

const items = computed<PageItem[]>(() => {
  const siblings = props.siblingCount ?? 1
  const boundaries = props.boundaryCount ?? 1
  const current = Math.min(Math.max(1, props.page), totalPages.value)
  const total = totalPages.value

  const startPages = range(1, Math.min(boundaries, total))
  const endPages = range(Math.max(total - boundaries + 1, 1), total)

  const leftSibling = Math.max(current - siblings, 1)
  const rightSibling = Math.min(current + siblings, total)

  const middleStart = Math.max(leftSibling, boundaries + 1)
  const middleEnd = Math.min(rightSibling, total - boundaries)

  let middle: PageItem[] = []
  if (middleEnd >= middleStart) {
    middle = range(middleStart, middleEnd)
  }

  const items: PageItem[] = []
  items.push(...startPages)

  if (middle.length) {
    if (middleStart > boundaries + 1) items.push('ellipsis')
    items.push(...middle)
    if (middleEnd < total - boundaries) items.push('ellipsis')
  } else {
    if (boundaries + 1 < total - boundaries) items.push('ellipsis')
  }

  endPages.forEach((p) => {
    if (!items.includes(p)) items.push(p)
  })
  return items
})
</script>
