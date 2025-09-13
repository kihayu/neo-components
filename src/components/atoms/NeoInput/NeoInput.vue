<template>
  <motion.input
    :id="id"
    class="font-secondary placeholder:text-utility-darker focus-visible:outline-primary w-full rounded-xl border-4 border-black bg-white px-3 py-2.5 font-bold transition-all duration-300 ease-in-out placeholder:font-bold focus-visible:outline-2 active:scale-none disabled:placeholder:opacity-65 disabled:hover:cursor-not-allowed"
    :type="type"
    :value="model"
    :while-focus="scaleOnFocus ? { scale: 0.95 } : {}"
    :disabled="disabled"
    :placeholder="placeholder"
    @input="onInput"
    @focus="emit('focus')"
    @blur="emit('blur')"
  />
</template>

<script setup lang="ts">
import { motion } from 'motion-v'

type HTMLInputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

export interface NeoInputProps {
  id: string
  placeholder?: string
  disabled?: boolean
  scaleOnFocus?: boolean
  type?: HTMLInputType
}

const {
  id,
  placeholder = '',
  disabled = false,
  scaleOnFocus = true,
  type = 'text',
} = defineProps<NeoInputProps>()

const model = defineModel<string>()

interface NeoInputEmits {
  (event: 'focus'): void
  (event: 'blur'): void
}

const emit = defineEmits<NeoInputEmits>()

function onInput(ev: Event) {
  const target = ev.target as HTMLInputElement | null
  model.value = target?.value ?? ''
}
</script>
