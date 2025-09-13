<template>
  <div class="flex items-center" :aria-orientation="orientation" role="separator">
    <div v-if="orientation === 'horizontal'" class="relative w-full">
      <div
        class="relative z-10 w-full border-t-4 border-black bg-black"
        :class="{ 'my-6': !tight, 'my-2': tight }"
      ></div>

      <div
        v-if="label"
        class="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 bg-white px-4"
      >
        <span class="font-primary font-medium text-black">{{ label }}</span>
      </div>

      <div
        v-else-if="$slots.default"
        class="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 bg-white px-4"
      >
        <slot />
      </div>
    </div>

    <div v-else class="relative h-full">
      <div
        class="relative z-10 h-full border-l-4 border-black bg-black"
        :class="{ 'mx-6': !tight, 'mx-2': tight }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
type DividerOrientation = 'horizontal' | 'vertical'

export interface NeoDividerProps {
  orientation?: DividerOrientation
  label?: string
  tight?: boolean
}

const { orientation = 'horizontal', label = '', tight = false } = defineProps<NeoDividerProps>()
</script>
