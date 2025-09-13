<template>
  <div class="relative w-fit">
    <motion.label
      class="flex items-center"
      :class="{ 'cursor-not-allowed': disabled, 'cursor-pointer': !disabled }"
    >
      <motion.div
        :while-hover="{
          scale: disabled || isChecked ? 1 : 1.15,
        }"
        :while-press="{
          scale: 1.0,
        }"
        class="relative mr-2"
      >
        <motion.input
          type="radio"
          :id="id"
          :name="name"
          :value="value"
          :checked="isChecked"
          :disabled="disabled"
          class="peer sr-only"
          :aria-checked="isChecked"
          @change="onInput"
        />
        <div
          class="relative z-10 h-7 w-7 transform rounded-full border-4 border-black bg-white transition-colors duration-100 peer-focus-visible:outline-4 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black"
          :class="{
            'border-utility-light cursor-not-allowed': disabled,
            'border-primary': isChecked,
          }"
        ></div>
        <motion.div
          :initial="{ opacity: 0, scale: 0.5 }"
          :animate="{
            opacity: isChecked ? 1 : 0,
            scale: isChecked ? 1 : 0.5,
          }"
          :transition="{ duration: 0.15 }"
          class="bg-primary absolute top-1/2 left-1/2 z-20 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          :class="{ 'bg-utility-light': disabled }"
        ></motion.div>
      </motion.div>
      <span class="font-primary" :class="{ 'text-gray-500': disabled }">
        <slot />
      </span>
    </motion.label>
  </div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { computed } from 'vue'

export interface NeoRadioProps<T = string | number | boolean> {
  id: string
  value: T
  name: string
  disabled?: boolean
}

const { id = '', name = '', disabled = false, value } = defineProps<
  NeoRadioProps<string | number | boolean>
>()

const model = defineModel<string | number | boolean>()

const isChecked = computed(() => model.value === value)

const onInput = () => {
  if (!disabled) {
    model.value = value as string | number | boolean
  }
}
</script>
