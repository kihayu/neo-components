<template>
  <div class="w-full">
    <div class="mb-1 flex justify-between" v-if="showLabels || showValue">
      <label v-if="showLabels" :for="id" class="font-primary text-sm">{{ label }}</label>
      <span v-if="showValue" class="font-primary text-sm">{{ value }}%</span>
    </div>
    <div class="relative h-fit">
      <div
        :id="id"
        class="relative z-10 h-6 w-full rounded-full border-4 border-black bg-white"
        role="progressbar"
        :aria-valuenow="value"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-label="ariaLabel || label"
      >
        <div
          class="h-full rounded-full transition-all duration-300 ease-out"
          :class="[colorClass]"
          :style="{ width: `${value}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ProgressBarColor = 'primary' | 'error' | 'success' | 'warning' | 'info'

export interface NeoProgressBarProps {
  id: string
  value: number
  label?: string
  color?: ProgressBarColor
  showLabels?: boolean
  showValue?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<NeoProgressBarProps>(), {
  id: 'neo-progress',
  value: 0,
  label: 'Progress',
  color: 'primary',
  showLabels: true,
  showValue: true,
  ariaLabel: '',
})

const colorClass = computed(() => {
  const colors = {
    primary: 'bg-primary',
    error: 'bg-error',
    success: 'bg-success',
    warning: 'bg-warning',
    info: 'bg-primary-light',
  }

  return colors[props.color]
})
</script>
