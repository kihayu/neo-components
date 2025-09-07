<template>
  <nav class="w-full" role="navigation" :aria-label="props.ariaLabel || 'Breadcrumb'">
    <ol class="flex flex-wrap items-center gap-1 text-sm" role="list">
      <template v-for="(entry, index) in visible" :key="index">
        <li v-if="entry === 'ellipsis'" class="px-1 select-none" aria-hidden="true">…</li>
        <li v-else class="inline-flex items-center gap-1">
          <template v-if="!entry.current && (entry.href || props.navigateOnClick)">
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
            <slot name="separator">{{ props.separator }}</slot>
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes, Component } from 'vue'

// Local types
export interface NeoBreadcrumbItem {
  key?: string | number
  href?: string
  /** Text label for the item */
  label: string
  /** Optional icon component */
  icon?: Component
  /** Whether this item is the current page */
  current?: boolean
  disabled?: boolean
  /** Target for anchor navigation */
  target?: '_self' | '_blank' | '_parent' | '_top'
  rel?: string
}

export interface NeoBreadcrumbsProps {
  items: NeoBreadcrumbItem[]
  navigateOnClick?: boolean
  separator?: string
  ariaLabel?: string
  role?: string
  class?: HTMLAttributes['class']
  size?: 'sm' | 'md' | 'lg'
}

export interface NeoBreadcrumbsEmits {
  (e: 'navigate', item: NeoBreadcrumbItem, ev: MouseEvent): void
}

const props = withDefaults(defineProps<NeoBreadcrumbsProps>(), {
  items: () => [],
  navigateOnClick: false,
  separator: '/',
  ariaLabel: 'Breadcrumb',
  role: undefined,
  class: undefined,
})

const emit = defineEmits<NeoBreadcrumbsEmits>()

const maxVisible = 4

type Entry = NeoBreadcrumbItem | 'ellipsis'
const visible = computed<Entry[]>(() => {
  const items = props.items ?? []
  if (items.length <= maxVisible) return items

  const first = items[0]
  const lastTwo = items.slice(-2)
  return [first, 'ellipsis', ...lastTwo]
})

function onNavigate(item: NeoBreadcrumbItem, ev: MouseEvent) {
  if (props.navigateOnClick && !item.disabled) {
    emit('navigate', item, ev)
  }
}
</script>
