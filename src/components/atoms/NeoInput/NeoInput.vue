<template>
  <motion.input
    :id="id"
    class="font-secondary placeholder:text-utility-darker focus:border-primary disabled:border-utility-dark w-full rounded-xl border-4 bg-white px-3 py-2.5 font-bold transition-all duration-300 ease-in-out placeholder:font-bold focus:outline-none focus-visible:outline-none active:scale-none disabled:placeholder:opacity-65 disabled:hover:cursor-not-allowed"
    type="text"
    v-model="model"
    :while-focus="scaleOnFocus ? { scale: 0.95 } : {}"
    :disabled="disabled"
    :placeholder="placeholder"
    @focus="emit('focus')"
    @blur="emit('blur')"
  />
</template>

<script setup lang="ts">
import { motion } from 'motion-v'

export interface NeoInputProps {
  id: string
  placeholder?: string
  disabled?: boolean
  scaleOnFocus?: boolean
}

const model = defineModel<string>()

interface NeoInputEmits {
  (event: 'focus'): void
  (event: 'blur'): void
}

const emit = defineEmits<NeoInputEmits>()

withDefaults(defineProps<NeoInputProps>(), {
  placeholder: '',
  disabled: false,
  scaleOnFocus: true,
})
</script>
