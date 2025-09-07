<template>
  <div
    data-slot="neo-stepper"
    :class="
      cn('w-full', orientation === 'vertical' ? 'flex gap-4' : 'flex flex-col gap-4', props.class)
    "
    :role="props.role ?? 'group'"
    :aria-label="props.ariaLabel ?? 'Progress'"
  >
    <!-- Steps list -->
    <ol
      :class="
        cn(
          'font-primary',
          orientation === 'vertical'
            ? 'flex min-w-56 flex-col gap-3'
            : 'flex w-full items-start gap-3',
        )
      "
      role="list"
      :aria-orientation="orientation"
    >
      <li
        v-for="(step, index) in steps"
        :key="step.key ?? index"
        role="listitem"
        class="flex items-start gap-3"
        :class="orientation === 'vertical' ? 'w-full' : 'min-w-0 flex-1'"
      >
        <!-- Indicator (button or static depending on clickability) -->
        <component
          :is="isStepInteractive(index) ? 'button' : 'div'"
          type="button"
          :disabled="!isStepInteractive(index)"
          :aria-current="index === current ? 'step' : undefined"
          :aria-label="computedAriaLabel(step, index)"
          :class="
            cn(
              'relative z-10 flex shrink-0 items-center justify-center border-4 border-black transition-colors',
              indicatorShapeClass,
              sizeMap.indicator[props.size ?? 'md'],
              indicatorVariantClass(index),
              isStepInteractive(index)
                ? 'focus-visible:outline-primary hover:cursor-pointer focus-visible:outline-2'
                : 'cursor-default',
            )
          "
          @click="onStepClick(index)"
          @keydown="onStepKeydown($event, index)"
        >
          <slot name="indicator" v-bind="{ step, index, current }">
            <span v-if="!step.icon" :class="cn('font-bold', sizeMap.text[props.size ?? 'md'])">
              {{ index + 1 }}
            </span>
            <component v-else :is="step.icon" class="size-4" />
          </slot>
        </component>

        <!-- Connector (for horizontal 'line' style) -->
        <div
          v-if="style === 'line' && orientation === 'horizontal' && index < steps.length - 1"
          class="relative mt-3 hidden grow md:block"
        >
          <div
            class="h-2 w-full rounded-full border-4 border-black"
            :class="index < current ? 'bg-primary' : 'bg-white'"
          />
        </div>

        <!-- Label/Content -->
        <div class="min-w-0">
          <slot name="step" v-bind="{ step, index, current }">
            <div class="flex items-center gap-2">
              <div
                class="rounded-xl border-4 border-black px-3 py-1"
                :class="labelVariantClass(index)"
              >
                <span class="font-semibold">{{ step.label }}</span>
                <span v-if="step.optional" class="text-muted-foreground ml-2 text-xs italic"
                  >(optional)</span
                >
              </div>
            </div>
          </slot>

          <div v-if="index === current" class="mt-2">
            <slot name="content" v-bind="{ step, index }">
              <p v-if="step.description" class="text-muted-foreground text-sm">
                {{ step.description }}
              </p>
            </slot>
          </div>
        </div>
      </li>
    </ol>

    <!-- Vertical connector rail (for 'line' style) -->
    <div
      v-if="style === 'line' && orientation === 'vertical'"
      class="relative hidden flex-1 md:block"
    >
      <div class="relative ml-2 h-full">
        <div
          class="absolute top-2 left-0 h-[calc(100%-1rem)] w-2 rounded-full border-4 border-black bg-white"
        />
        <div
          class="bg-primary absolute top-2 left-0 w-2 rounded-full border-4 border-black"
          :style="{ height: verticalProgressHeight }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import type { HTMLAttributes, Component } from 'vue'

export type NeoOrientation = 'horizontal' | 'vertical'
export type NeoSize = 'sm' | 'md' | 'lg'
export interface NeoStepItem {
  key: string
  label: string
  description?: string
  completed?: boolean
  icon?: Component
  disabled?: boolean
  optional?: boolean
}

export interface NeoStepperProps {
  steps: NeoStepItem[]
  current: number
  orientation?: NeoOrientation
  linear?: boolean
  clickable?: boolean
  ariaLabel?: string
  role?: string
  class?: HTMLAttributes['class']
  size?: NeoSize
  style?: 'line' | 'dot'
}

export interface NeoStepperEmits {
  (e: 'update:current', index: number): void
  (e: 'stepClick', index: number): void
  (e: 'complete', index: number): void
}

const props = withDefaults(defineProps<NeoStepperProps>(), {
  steps: () => [] as NeoStepItem[],
  current: 0,
  orientation: 'horizontal',
  linear: true,
  clickable: true,
  ariaLabel: undefined,
  role: undefined,
  class: undefined,
  size: 'md',
  style: 'line',
})

const emit = defineEmits<NeoStepperEmits>()

/** Derived helpers */
const steps = computed(() => props.steps ?? [])
const current = computed(() => Math.min(Math.max(0, props.current), steps.value.length - 1))
const orientation = computed(() => props.orientation ?? 'horizontal')
const style = computed(() => (props.style as NonNullable<'line' | 'dot'>) ?? 'line')

/** Sizes mapping */
const sizeMap = {
  indicator: {
    sm: 'size-7 rounded-xl',
    md: 'size-9 rounded-xl',
    lg: 'size-11 rounded-2xl',
  },
  text: {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  },
} as const

/** Indicator shape for 'dot' style vs 'line' style */
const indicatorShapeClass = computed(() => {
  return style.value === 'dot' ? 'rounded-full' : 'rounded-xl bg-white'
})

/** Active/completed/upcoming variant classes for indicator */
function indicatorVariantClass(index: number) {
  const isActive = index === current.value
  const isCompleted = (steps.value[index]?.completed ?? false) || index < current.value
  if (isActive) return 'bg-primary text-black'
  if (isCompleted) return 'bg-primary/70'
  return 'bg-white'
}

/** Label chip variant */
function labelVariantClass(index: number) {
  const isActive = index === current.value
  const isCompleted = (steps.value[index]?.completed ?? false) || index < current.value
  if (isActive) return 'bg-primary'
  if (isCompleted) return 'bg-primary/20'
  return 'bg-white'
}

/** Whether a step can be interacted with (click) */
function isStepInteractive(index: number): boolean {
  if (!props.clickable) return false
  if (!props.linear) return !steps.value[index]?.disabled
  // linear: allow going backwards anytime; forward only up to current+1 if previous are completed
  if (index <= current.value) return !steps.value[index]?.disabled
  return index === current.value + 1 && !steps.value[index]?.disabled
}

/** Announceable label */
function computedAriaLabel(step: NeoStepItem, index: number): string {
  const base = step.label ?? `Step ${index + 1}`
  const state =
    index === current.value ? 'current' : index < current.value ? 'completed' : 'upcoming'
  return `${base} (${state})`
}

/** Vertical progress height approximation */
const verticalProgressHeight = computed(() => {
  const n = steps.value.length
  if (n <= 1) return '0%'
  const ratio = current.value / (n - 1)
  return `${Math.max(0, Math.min(1, ratio)) * 100}%`
})

/** Navigation and emits */
function setCurrent(next: number) {
  const bounded = Math.min(Math.max(0, next), steps.value.length - 1)
  if (bounded !== props.current) {
    emit('update:current', bounded)
    if (bounded === steps.value.length - 1) {
      emit('complete', bounded)
    }
  }
}

function onStepClick(index: number) {
  if (!isStepInteractive(index)) return
  emit('stepClick', index)
  setCurrent(index)
}

function onStepKeydown(e: KeyboardEvent, index: number) {
  const horzPrev = ['ArrowLeft']
  const horzNext = ['ArrowRight']
  const vertPrev = ['ArrowUp']
  const vertNext = ['ArrowDown']
  const prevKeys = orientation.value === 'vertical' ? vertPrev : horzPrev
  const nextKeys = orientation.value === 'vertical' ? vertNext : horzNext

  if (prevKeys.includes(e.key)) {
    e.preventDefault()
    const target = Math.max(0, index - 1)
    if (isStepInteractive(target)) setCurrent(target)
  } else if (nextKeys.includes(e.key)) {
    e.preventDefault()
    const target = Math.min(steps.value.length - 1, index + 1)
    if (isStepInteractive(target)) setCurrent(target)
  } else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    onStepClick(index)
  }
}
</script>
