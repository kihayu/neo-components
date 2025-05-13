<template>
  <div class="inline-flex items-center justify-center" :aria-label="ariaLabel" role="status">
    <div class="relative">
      <svg
        :width="spinnerSize"
        :height="spinnerSize"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        class="relative z-10"
      >
        <circle stroke="#eee" fill="none" stroke-width="3" cx="19" cy="19" r="15" />
        <path
          :class="animationClass"
          fill="none"
          stroke="#000"
          stroke-width="3"
          stroke-linecap="round"
          d="M 19,4 a 15,15 0 0,1 0,30"
        />
      </svg>
    </div>

    <span v-if="label" class="font-primary ml-3 font-medium text-black">{{ label }}</span>
    <span v-if="$slots.default" class="font-primary ml-3 font-medium text-black">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type SpinnerSize = 'sm' | 'md' | 'lg'

export interface NeoSpinnerProps {
  size?: SpinnerSize
  label?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<NeoSpinnerProps>(), {
  size: 'md',
  label: '',
  ariaLabel: 'Loading',
})

const spinnerSize = computed(() => {
  const sizes = {
    sm: '24',
    md: '32',
    lg: '48',
  }

  return sizes[props.size]
})

const animationClass = computed(() => {
  return 'neo-spinner-animation'
})
</script>

<style>
.neo-spinner-animation {
  transform-origin: center;
  animation: neo-spin 1.5s ease-in-out infinite;
}

@keyframes neo-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
