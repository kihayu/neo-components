<template>
  <div
    data-slot="neo-stepper"
    :class="cn('w-full', orientation === 'vertical' ? 'flex gap-4' : 'flex flex-col gap-4')"
    :role="role ?? 'group'"
    :aria-label="ariaLabel ?? 'Progress'"
  >
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
        <component
          :is="isStepInteractive(index) ? 'button' : 'div'"
          type="button"
          :disabled="!isStepInteractive(index)"
          :aria-current="index === currentStep ? 'step' : undefined"
          :aria-label="computedAriaLabel(step, index)"
          :class="
            cn(
              'relative z-10 flex shrink-0 items-center justify-center border-4 border-black transition-colors',
              indicatorShapeClass,
              sizeMap.indicator[size ?? 'md'],
              indicatorVariantClass(index),
              isStepInteractive(index)
                ? 'focus-visible:outline-primary hover:cursor-pointer focus-visible:outline-2'
                : 'cursor-default',
            )
          "
          @click="onStepClick(index)"
          @keydown="onStepKeydown($event, index)"
        >
          <slot name="indicator" v-bind="{ step, index, currentStep }">
            <span v-if="!step.icon" :class="cn('font-bold', sizeMap.text[size ?? 'md'])">
              {{ index + 1 }}
            </span>
            <component v-else :is="step.icon" class="size-4" />
          </slot>
        </component>

        <div
          v-if="style === 'line' && orientation === 'horizontal' && index < steps.length - 1"
          class="relative mt-3 hidden grow md:block"
        >
          <div
            class="h-2 w-full rounded-full border-4 border-black"
            :class="index < currentStep ? 'bg-primary' : 'bg-white'"
          />
        </div>

        <div class="min-w-0">
          <slot name="step" v-bind="{ step, index, currentStep }">
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

          <div v-if="index === currentStep" class="mt-2">
            <slot name="content" v-bind="{ step, index }">
              <p v-if="step.description" class="text-muted-foreground text-sm">
                {{ step.description }}
              </p>
            </slot>
          </div>
        </div>
      </li>
    </ol>

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

const {
  steps = [] as NeoStepItem[],
  current = 0,
  orientation = 'horizontal',
  linear = true,
  clickable = true,
  style = 'line',
} = defineProps<NeoStepperProps>()
const emit = defineEmits<NeoStepperEmits>()

const currentStep = computed(() => Math.min(Math.max(0, current), steps.length - 1))

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

const indicatorShapeClass = computed(() => {
  return style === 'dot' ? 'rounded-full' : 'rounded-xl bg-white'
})

function indicatorVariantClass(index: number) {
  const isActive = index === currentStep.value
  const isCompleted = (steps[index]?.completed ?? false) || index < currentStep.value
  if (isActive) return 'bg-primary text-black'
  if (isCompleted) return 'bg-primary/70'
  return 'bg-white'
}

function labelVariantClass(index: number) {
  const isActive = index === currentStep.value
  const isCompleted = (steps[index]?.completed ?? false) || index < currentStep.value
  if (isActive) return 'bg-primary'
  if (isCompleted) return 'bg-primary/20'
  return 'bg-white'
}

function isStepInteractive(index: number): boolean {
  if (!clickable) return false
  if (!linear) return !steps[index]?.disabled

  if (index <= currentStep.value) return !steps[index]?.disabled
  return index === currentStep.value + 1 && !steps[index]?.disabled
}

function computedAriaLabel(step: NeoStepItem, index: number): string {
  const base = step.label ?? `Step ${index + 1}`
  const state =
    index === currentStep.value ? 'current' : index < currentStep.value ? 'completed' : 'upcoming'
  return `${base} (${state})`
}

const verticalProgressHeight = computed(() => {
  const n = steps.length
  if (n <= 1) return '0%'
  const ratio = currentStep.value / (n - 1)
  return `${Math.max(0, Math.min(1, ratio)) * 100}%`
})

function setCurrent(next: number) {
  const bounded = Math.min(Math.max(0, next), steps.length - 1)
  if (bounded !== currentStep.value) {
    emit('update:current', bounded)
    if (bounded === steps.length - 1) {
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
  const prevKeys = orientation === 'vertical' ? vertPrev : horzPrev
  const nextKeys = orientation === 'vertical' ? vertNext : horzNext

  if (prevKeys.includes(e.key)) {
    e.preventDefault()
    const target = Math.max(0, index - 1)
    if (isStepInteractive(target)) setCurrent(target)
  } else if (nextKeys.includes(e.key)) {
    e.preventDefault()
    const target = Math.min(steps.length - 1, index + 1)
    if (isStepInteractive(target)) setCurrent(target)
  } else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    onStepClick(index)
  }
}
</script>
