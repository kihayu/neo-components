<template>
  <div class="relative w-fit">
    <label
      class="flex items-center gap-x-2"
      :class="{ 'cursor-not-allowed opacity-65': disabled, 'cursor-pointer': !disabled }"
    >
      <div class="relative">
        <input
          type="checkbox"
          :id="id"
          class="peer sr-only"
          :checked="modelValue"
          :disabled="disabled"
          :aria-checked="modelValue"
          :aria-label="ariaLabel"
          @change="onInput"
        />
        <div
          class="relative z-10 flex h-7 w-14 flex-row overflow-hidden rounded-full border-4 border-black px-0.5 transition-colors duration-200 peer-focus-visible:outline-4 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black"
          :class="{ 'bg-primary justify-end': modelValue, 'justify-start bg-white': !modelValue }"
        >
          <motion.div
            :data-state="modelValue"
            layout
            :transition="{
              type: 'spring',
              visualDuration: 0.2,
              bounce: 0.2,
            }"
            class="absolute h-4 w-4 translate-y-1/8 rounded-full border-4 border-black bg-white"
          ></motion.div>
        </div>
        <div class="absolute inset-0 rounded-full bg-black peer-disabled:opacity-0"></div>
      </div>
      <span :class="{ 'text-gray-500': disabled }" class="font-primary leading-none">
        <slot />
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'

export interface NeoToggleProps {
  id: string
  modelValue: boolean
  disabled?: boolean
  ariaLabel?: string
}

const {
  id = '',
  modelValue = false,
  disabled = false,
  ariaLabel = 'Toggle switch',
} = defineProps<NeoToggleProps>()

interface NeoToggleEmits {
  (event: 'update:modelValue', value: boolean): void
}

const emit = defineEmits<NeoToggleEmits>()

const onInput = (event: Event) => {
  if (!disabled) {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.checked)
  }
}
</script>
