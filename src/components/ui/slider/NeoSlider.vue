<template>
  <div class="w-full" :class="props.class">
    <SliderRoot
      v-model="model"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :orientation="props.orientation"
      :disabled="props.disabled"
      :name="props.name"
      class="relative flex w-full items-center"
      :class="props.orientation === 'vertical' ? 'h-44 flex-col' : 'h-10'"
      @pointerup="onCommit"
      @touchend="onCommit"
      @keyup.enter.prevent="onCommit"
    >
      <SliderTrack
        class="relative grow overflow-hidden rounded-full border-4 border-black bg-white"
        :class="props.orientation === 'vertical' ? trackV : trackH"
      >
        <SliderRange
          class="bg-primary absolute"
          :class="props.orientation === 'vertical' ? rangeV : rangeH"
        />
      </SliderTrack>
      <SliderThumb
        v-for="(_, i) in model"
        :key="i"
        class="focus-visible:outline-primary block rounded-full border-4 border-black bg-white shadow transition-colors focus-visible:outline-2"
        :class="thumbSize"
        :aria-label="thumbAriaLabel(i)"
        @keydown.enter.prevent="onCommit()"
        @keyup.enter.prevent="onCommit()"
      />
    </SliderRoot>

    <div v-if="props.showValueLabel" class="text-utility-darker mt-2 text-xs font-medium">
      {{ model.join(' – ') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import type { HTMLAttributes } from 'vue'
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from 'reka-ui'
import { cn } from '@/lib/utils'
import type { SliderVariants } from '.'

export type NeoOrientation = 'horizontal' | 'vertical'
export interface NeoSliderProps {
  modelValue: number[]
  min?: number
  max?: number
  step?: number
  orientation?: NeoOrientation
  minStepsBetweenThumbs?: number
  name?: string
  disabled?: boolean
  showValueLabel?: boolean
  ariaLabel?: string
  ariaLabelledby?: string
  ariaDescribedby?: string
  role?: string
  class?: HTMLAttributes['class']
  size?: SliderVariants['size']
}

export interface NeoSliderEmits {
  (e: 'update:modelValue', value: number[]): void
  (e: 'change', value: number[], ev: Event): void
  (e: 'commit', value: number[], ev: Event): void
}

const props = withDefaults(defineProps<NeoSliderProps>(), {
  modelValue: () => [50],
  min: 0,
  max: 100,
  step: 1,
  orientation: 'horizontal',
  minStepsBetweenThumbs: 0,
  name: undefined,
  disabled: false,
  showValueLabel: false,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
  role: undefined,
  class: undefined,
  size: 'md',
})

const model = defineModel<number[]>({ default: [50] })

const emit = defineEmits<NeoSliderEmits>()

/**
 * Emit 'change' continuously as the slider value changes
 */
watch(
  () => model?.value,
  (val) => {
    if (val) {
      emit('change', val, new Event('input'))
    }
  },
  { deep: true },
)

/**
 * Emit 'commit' when interaction ends (mouse/touch/keyboard)
 */
function onCommit() {
  if (model?.value) {
    emit('commit', model.value, new Event('change'))
  }
}

function thumbAriaLabel(i: number) {
  if (props.ariaLabel) return `${props.ariaLabel} thumb ${i + 1}`
  return `Slider thumb ${i + 1}`
}

const trackH = computed(() => cn(props.size === 'sm' ? 'h-3' : props.size === 'lg' ? 'h-5' : 'h-4'))
const trackV = computed(() =>
  cn(props.size === 'sm' ? 'w-3 h-full' : props.size === 'lg' ? 'w-5 h-full' : 'w-4 h-full'),
)
const rangeH = computed(() => 'h-full')
const rangeV = computed(() => 'w-full')
const thumbSize = computed(() => {
  const map: Record<NonNullable<SliderVariants['size']>, string> = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }
  return map[(props.size as NonNullable<SliderVariants['size']>) ?? 'md']
})
</script>
