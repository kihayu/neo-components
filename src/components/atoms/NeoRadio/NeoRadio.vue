<template>
  <div class="relative w-fit">
    <motion.label
      class="flex cursor-pointer items-center"
      :class="{ 'cursor-not-allowed opacity-65': disabled }"
    >
      <div class="relative mr-2">
        <motion.input
          type="radio"
          :id="id"
          :name="name"
          :value="value"
          :checked="modelValue === value"
          :disabled="disabled"
          class="peer sr-only"
          :aria-checked="modelValue === value"
          @change="onInput"
        />
        <motion.div
          :while-hover="{
            scale: disabled ? 1 : 1.15,
          }"
          :while-press="{
            scale: 1.0,
          }"
          class="relative z-10 h-6 w-6 transform rounded-full border-4 border-black bg-white transition-colors duration-100 peer-focus-visible:outline-4 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black"
        ></motion.div>
        <motion.div
          :initial="{ opacity: 0, scale: 0.5 }"
          :animate="{
            opacity: modelValue === value ? 1 : 0,
            scale: modelValue === value ? 1 : 0.5,
          }"
          :transition="{ duration: 0.15 }"
          class="bg-primary absolute top-1/2 left-1/2 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        ></motion.div>
      </div>
      <span :class="{ 'text-gray-500': disabled }">
        <slot />
      </span>
    </motion.label>
  </div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'

export interface NeoRadioProps<T = string | number | boolean> {
  id: string
  modelValue: T
  value: T
  name: string
  disabled?: boolean
}

const props = withDefaults(defineProps<NeoRadioProps<string | number | boolean>>(), {
  id: '',
  name: '',
  disabled: false,
})

interface NeoRadioEmits<T = string | number | boolean> {
  (event: 'update:modelValue', value: T): void
}

const emit = defineEmits<NeoRadioEmits<string | number | boolean>>()

const onInput = () => {
  if (!props.disabled) {
    emit('update:modelValue', props.value)
  }
}
</script>
