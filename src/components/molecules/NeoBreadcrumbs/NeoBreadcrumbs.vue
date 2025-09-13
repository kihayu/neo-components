<template>
  <nav class="w-full" role="navigation" :aria-label="ariaLabel || 'Breadcrumb'">
    <ol class="flex flex-wrap items-center gap-1 text-sm" role="list">
      <template v-for="(entry, index) in visible" :key="index">
        <li v-if="entry === 'ellipsis'" class="px-1 select-none" aria-hidden="true">…</li>
        <li v-else class="inline-flex items-center gap-1">
          <template v-if="!entry.current && (entry.href || navigateOnClick)">
            <a
              v-if="entry.href"
              class="focus-visible:outline-primary rounded-sm hover:underline focus-visible:outline-2"
              :href="entry.href"
              :aria-disabled="entry.disabled || undefined"
              :target="entry.target"
              :rel="entry.rel"
            >
              <slot name="icon" :item="entry">
                <component
                  v-if="entry.icon"
                  :is="entry.icon"
                  class="mr-1 inline-block h-4 w-4"
                  aria-hidden="true"
                />
              </slot>
              {{ entry.label }}
            </a>
            <button
              v-else
              type="button"
              class="focus-visible:outline-primary rounded-sm hover:underline focus-visible:outline-2"
              :disabled="entry.disabled"
              @click="onNavigate(entry, $event)"
            >
              <slot name="icon" :item="entry">
                <component
                  v-if="entry.icon"
                  :is="entry.icon"
                  class="mr-1 inline-block h-4 w-4"
                  aria-hidden="true"
                />
              </slot>
              {{ entry.label }}
            </button>
          </template>
          <span v-else class="font-semibold" aria-current="page">
            <slot name="icon" :item="entry">
              <component
                v-if="entry.icon"
                :is="entry.icon"
                class="mr-1 inline-block h-4 w-4"
                aria-hidden="true"
              />
            </slot>
            {{ entry.label }}
          </span>

          <span
            v-if="index < visible.length - 1"
            class="text-utility-darker px-1"
            aria-hidden="true"
          >
            <slot name="separator">{{ separator }}</slot>
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

export interface NeoBreadcrumbItem {
  key?: string | number
  href?: string

  label: string

  icon?: Component

  current?: boolean
  disabled?: boolean

  target?: '_self' | '_blank' | '_parent' | '_top'
  rel?: string
}

export interface NeoBreadcrumbsProps {
  items: NeoBreadcrumbItem[]
  navigateOnClick?: boolean
  separator?: string
  ariaLabel?: string
}

export interface NeoBreadcrumbsEmits {
  (e: 'navigate', item: NeoBreadcrumbItem, ev: MouseEvent): void
}

const {
  items = [] as NeoBreadcrumbItem[],
  navigateOnClick = false,
  separator = '/',
  ariaLabel = 'Breadcrumb',
} = defineProps<NeoBreadcrumbsProps>()

const emit = defineEmits<NeoBreadcrumbsEmits>()

const maxVisible = 4

type Entry = NeoBreadcrumbItem | 'ellipsis'
const visible = computed<Entry[]>(() => {
  if (items.length <= maxVisible) return items

  const first = items[0]
  const lastTwo = items.slice(-2)
  return [first, 'ellipsis', ...lastTwo]
})

function onNavigate(item: NeoBreadcrumbItem, ev: MouseEvent) {
  if (navigateOnClick && !item.disabled) {
    emit('navigate', item, ev)
  }
}
</script>
