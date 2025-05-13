<template>
  <div class="relative w-fit">
    <motion.label
      class="flex items-center"
      :class="{ 'cursor-not-allowed opacity-65': disabled, 'cursor-pointer': !disabled }"
    >
      <div class="relative">
        <motion.input
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
          class="relative z-10 h-12 w-20 overflow-hidden rounded-full border-4 border-black transition-colors duration-200 peer-focus-visible:outline-4 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black"
          :class="[modelValue ? 'bg-primary' : 'bg-white']"
        >
          <div
            class="absolute h-8 w-8 rounded-full border-4 border-black bg-white transition-all duration-300 ease-in-out"
            :style="{
              top: '50%',
              transform: 'translateY(-50%)',
              left: modelValue ? 'calc(100% - 36px)' : '4px',
            }"
          ></div>
        </div>
        <div class="absolute inset-0 rounded-full bg-black peer-disabled:opacity-0"></div>
      </div>
      <span :class="{ 'text-gray-500': disabled }" class="ml-2">
        <slot />
      </span>
    </motion.label>
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

const props = withDefaults(defineProps<NeoToggleProps>(), {
  id: '',
  modelValue: false,
  disabled: false,
  ariaLabel: 'Toggle switch',
})

interface NeoToggleEmits {
  (event: 'update:modelValue', value: boolean): void
}

const emit = defineEmits<NeoToggleEmits>()

const onInput = (event: Event) => {
  if (!props.disabled) {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.checked)
  }
}
</script>
