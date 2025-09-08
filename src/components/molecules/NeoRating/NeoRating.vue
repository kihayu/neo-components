<template>
  <div
    data-slot="neo-rating"
    :class="cn('inline-flex items-center gap-1')"
    role="radiogroup"
    :aria-label="ariaLabel ?? 'Rating'"
  >
    <button
      v-for="i in formatedMax"
      :key="i"
      type="button"
      role="radio"
      :aria-checked="ariaChecked(i)"
      :tabindex="tabIndexFor(i)"
      :disabled="disabled || readonly"
      @click="onItemClick(i, $event)"
      @mousemove="onItemMouseMove(i, $event)"
      @mouseenter="onItemMouseEnter(i, $event)"
      @mouseleave="onItemMouseLeave"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="(e) => onKeydown(e, i)"
      @keyup="onKeyup"
      :aria-label="itemAriaLabel(i)"
      :class="
        cn(
          'group relative inline-flex items-center justify-center rounded-md border-4 border-black bg-white',
          'focus-visible:outline-primary focus-visible:outline-2',
          size === 'sm' ? 'p-1' : size === 'lg' ? 'p-2' : 'p-1.5',
          disabled || readonly ? 'cursor-default opacity-65' : 'cursor-pointer',
        )
      "
    >
      <span class="sr-only">{{ itemAriaLabel(i) }}</span>

      <template v-if="isHalf(i)">
        <slot name="iconHalf" :index="i">
          <StarHalf class="text-primary size-5 md:size-6" />
        </slot>
      </template>
      <template v-else-if="isFull(i)">
        <slot name="iconFull" :index="i">
          <Star class="text-primary fill-primary size-5 md:size-6" />
        </slot>
      </template>
      <template v-else>
        <slot name="iconEmpty" :index="i">
          <Star class="text-utility-dark size-5 md:size-6" />
        </slot>
      </template>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import { Star, StarHalf } from 'lucide-vue-next'
import type { HTMLAttributes } from 'vue'

export type NeoSize = 'sm' | 'md' | 'lg'
export interface NeoRatingProps {
  defaultValue?: number
  max?: number
  allowHalf?: boolean
  allowClear?: boolean
  disabled?: boolean
  readonly?: boolean
  getItemAriaLabel?: (index: number, max: number) => string
  size?: NeoSize
  variant?: 'default' | 'outline'
  ariaLabel?: string
  role?: string
  class?: HTMLAttributes['class']
}

export interface NeoRatingEmits {
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
  (e: 'hoverChange', value: number | null): void
}

const {
  defaultValue = 0,
  max = 5,
  allowHalf = false,
  allowClear = false,
  disabled = false,
  readonly = false,
  getItemAriaLabel = (index: number, max: number) => `Rate ${index} of ${max}`,
  ariaLabel = undefined,
} = defineProps<NeoRatingProps>()

const model = defineModel<number>()
if (model.value == null) {
  model.value = defaultValue
}
const emit = defineEmits<NeoRatingEmits>()

const formatedMax = computed(() => Math.max(1, max))
const hoverValue = ref<number | null>(null)

const displayValue = computed(() => hoverValue.value ?? model?.value ?? 0)

function clampValue(v: number) {
  const step = allowHalf ? 0.5 : 1
  const rounded = Math.round(v / step) * step
  return Math.max(0, Math.min(formatedMax.value, rounded))
}

function isFull(i: number) {
  return displayValue.value >= i
}

function isHalf(i: number) {
  if (!allowHalf) {
    return false
  }

  const floor = Math.floor(displayValue.value)
  return floor + 0.5 === displayValue.value && i === floor + 1
}

function itemAriaLabel(i: number) {
  return getItemAriaLabel?.(i, formatedMax.value) ?? `Rate ${i} of ${formatedMax.value}`
}

function ariaChecked(i: number) {
  const current = Math.ceil(displayValue.value)
  return current === i
}

function tabIndexFor(i: number) {
  const current = Math.ceil(displayValue.value || 1)
  return current === i ? 0 : -1
}

function setValue(v: number, from: 'click' | 'keyboard') {
  const next = clampValue(v)
  if (allowClear && next === model.value && from === 'click') {
    model.value = 0

    hoverValue.value = null
    emit('change', 0)
    return
  }
  if (next !== model.value) {
    model.value = next
    emit('change', next)
  }

  if (from === 'click' || from === 'keyboard') {
    hoverValue.value = null
  }
}

function onItemClick(i: number, ev: MouseEvent) {
  if (disabled || readonly) {
    return
  }

  let next = i
  if (allowHalf) {
    const target = ev.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const isLeftHalf = ev.clientX - rect.left < rect.width / 2
    next = isLeftHalf ? i - 0.5 : i
  }
  setValue(next, 'click')
}

function onItemMouseMove(i: number, ev: MouseEvent) {
  if (!allowHalf) {
    return
  }

  if (disabled || readonly) {
    return
  }

  const target = ev.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const isLeftHalf = ev.clientX - rect.left < rect.width / 2
  hoverValue.value = isLeftHalf ? i - 0.5 : i
  emit('hoverChange', hoverValue.value)
}

function onItemMouseEnter(i: number, ev: MouseEvent) {
  if (disabled || readonly) {
    return
  }

  if (!allowHalf) {
    hoverValue.value = i
    emit('hoverChange', hoverValue.value)
    return
  }
  onItemMouseMove(i, ev)
}

function onItemMouseLeave() {
  if (disabled || readonly) {
    return
  }

  hoverValue.value = null
  emit('hoverChange', null)
}

function onFocus() {}

function onBlur() {}

function onKeydown(e: KeyboardEvent, i: number) {
  if (disabled || readonly) {
    return
  }

  const step = allowHalf ? 0.5 : 1
  const current = model.value ?? 0
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
    e.preventDefault()
    setValue(current + step, 'keyboard')
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
    e.preventDefault()
    setValue(current - step, 'keyboard')
  } else if (e.key === 'Home') {
    e.preventDefault()
    setValue(0, 'keyboard')
  } else if (e.key === 'End') {
    e.preventDefault()
    setValue(formatedMax.value, 'keyboard')
  } else if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault()
    setValue(i, 'keyboard')
  }
}

function onKeyup() {}
</script>
