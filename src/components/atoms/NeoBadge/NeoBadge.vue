<template>
  <component
    :is="asButton ? 'button' : 'span'"
    :type="asButton ? 'button' : undefined"
    class="font-primary relative inline-flex w-fit items-center gap-1.5 border-4 border-black bg-white font-bold transition-colors duration-100"
    :class="rootClasses"
    :aria-label="ariaLabel"
    :role="role"
    :disabled="asButton ? disabled : undefined"
    @click="onClick"
    @focus="onFocus"
    @blur="onBlur"
    @keydown="onKeydown"
    @keyup="onKeyup"
  >
    <span
      v-if="dot"
      :class="['relative inline-flex items-center justify-center', dotWrapperClasses]"
      aria-hidden="true"
    >
      <span class="h-2 w-2 rounded-full border-2 border-black" :class="dotColorClasses"></span>
    </span>
    <span
      v-else-if="$slots.leading || leadingIcon"
      class="inline-flex items-center"
      aria-hidden="true"
    >
      <component v-if="leadingIcon" :is="leadingIcon" />
      <slot v-else name="leading" />
    </span>

    <span class="inline-flex items-center">
      <slot />
    </span>

    <span
      v-if="$slots.trailing || trailingIcon"
      class="inline-flex items-center"
      aria-hidden="true"
    >
      <component v-if="trailingIcon" :is="trailingIcon" />
      <slot v-else name="trailing" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes, ButtonHTMLAttributes, Component } from 'vue'
import { cn } from '@/lib/utils'

export type NeoSize = 'sm' | 'md' | 'lg'
export interface NeoBadgeProps {
  variant?: 'default' | 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'outline'
  size?: NeoSize
  pill?: boolean
  dot?: boolean
  ariaLabel?: string
  role?: string
  class?: HTMLAttributes['class']
  leadingIcon?: Component
  trailingIcon?: Component
  asButton?: boolean
  disabled?: ButtonHTMLAttributes['disabled']
}

export interface NeoBadgeEmits {
  (e: 'click', ev: MouseEvent): void
  (e: 'focus', ev: FocusEvent): void
  (e: 'blur', ev: FocusEvent): void
  (e: 'keydown', ev: KeyboardEvent): void
  (e: 'keyup', ev: KeyboardEvent): void
}

const {
  variant = 'default',
  size = 'md',
  pill = false,
  dot = false,
  ariaLabel = undefined,
  role = undefined,
  class: className = undefined,
  leadingIcon = undefined,
  trailingIcon = undefined,
  asButton = false,
  disabled = false,
} = defineProps<NeoBadgeProps>()

const emit = defineEmits<NeoBadgeEmits>()

const sizeClasses = computed(() => {
  const map = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1',
  } as const
  return map[size ?? 'md']
})

const variantClasses = computed(() => {
  const baseText = 'text-black'
  const map = {
    default: `bg-primary ${baseText}`,
    neutral: `bg-utility-dark ${baseText}`,
    info: `bg-primary-light ${baseText}`,
    success: `bg-success ${baseText}`,
    warning: `bg-warning ${baseText}`,
    error: `bg-error ${baseText}`,
    outline: 'bg-white text-black',
  } as const
  return map[variant ?? 'default']
})

const shapeClasses = computed(() => (pill ? 'rounded-full' : 'rounded-lg'))

const interactiveClasses = computed(() =>
  asButton
    ? cn(
        'focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-60 disabled:cursor-not-allowed',
      )
    : '',
)

const rootClasses = computed(() =>
  cn(
    sizeClasses.value,
    variantClasses.value,
    shapeClasses.value,
    interactiveClasses.value,
    className,
  ),
)

const dotWrapperClasses = computed(() => (size === 'sm' ? 'pl-0.5 pr-0' : 'pl-0.5 pr-0'))
const dotColorClasses = computed(() => {
  const map = {
    default: 'bg-primary',
    neutral: 'bg-utility-dark',
    info: 'bg-primary-light',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    outline: 'bg-black',
  } as const
  return map[variant ?? 'default']
})

function onClick(ev: MouseEvent) {
  emit('click', ev)
}
function onFocus(ev: FocusEvent) {
  emit('focus', ev)
}
function onBlur(ev: FocusEvent) {
  emit('blur', ev)
}
function onKeydown(ev: KeyboardEvent) {
  emit('keydown', ev)
}
function onKeyup(ev: KeyboardEvent) {
  emit('keyup', ev)
}
</script>

<style scoped>
/* Respect reduced motion implicitly via no animations here */
</style>
