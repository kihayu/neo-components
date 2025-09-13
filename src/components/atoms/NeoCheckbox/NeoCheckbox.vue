<template>
  <div class="relative w-fit">
    <motion.label
      class="flex cursor-pointer items-center"
      :class="{ 'cursor-not-allowed opacity-65': disabled }"
    >
      <motion.div
        class="relative mr-2"
        :while-hover="{
          scale: disabled ? 1 : 1.15,
        }"
        :while-press="{
          scale: 1.0,
        }"
      >
        <input
          type="checkbox"
          :id="id"
          class="peer sr-only"
          :checked="model"
          :disabled="disabled"
          :aria-checked="model"
          @change="onInput"
        />
        <motion.div
          class="peer-checked:bg-primary relative z-10 h-7 w-7 transform rounded-md border-4 border-black bg-white transition-colors duration-100 peer-focus-visible:outline-4 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black"
        ></motion.div>
        <motion.div
          :initial="{ opacity: 0 }"
          :animate="{ opacity: model ? 1 : 0 }"
          class="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        >
          <Check :size="16" class="text-white" />
        </motion.div>
      </motion.div>
      <span class="font-primary" :class="{ 'text-gray-500': disabled }">
        <slot />
      </span>
    </motion.label>
  </div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { Check } from 'lucide-vue-next'

export interface NeoCheckboxProps {
  id: string
  disabled?: boolean
}

const { id = '', disabled = false } = defineProps<NeoCheckboxProps>()

const model = defineModel<boolean>({ default: false })

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  model.value = target.checked
}
</script>
