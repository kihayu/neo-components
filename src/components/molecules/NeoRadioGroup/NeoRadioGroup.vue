<template>
  <fieldset class="space-y-2">
    <legend v-if="label" class="font-primary mb-2 font-semibold">
      {{ label }}
    </legend>
    <div 
      class="flex" 
      :class="[
        orientation === 'vertical' ? 'flex-col space-y-2' : 'flex-row space-x-4',
      ]"
      role="radiogroup"
      :aria-labelledby="labelId"
      :aria-required="required"
    >
      <NeoRadio 
        v-for="(option, index) in options" 
        :key="index"
        :id="`${name}-${String(option.value)}`"
        :name="name"
        :model-value="modelValue"
        :value="option.value"
        :disabled="disabled || option.disabled"
        @update:model-value="(value) => updateValue(value)"
      >
        {{ option.label }}
      </NeoRadio>
    </div>
    <p 
      v-if="helperText" 
      class="text-sm text-gray-600 mt-1"
    >
      {{ helperText }}
    </p>
  </fieldset>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import NeoRadio from '@/components/atoms/NeoRadio/NeoRadio.vue'

export type RadioOption<T = string | number | boolean> = {
  label: string
  value: T
  disabled?: boolean
}

export interface NeoRadioGroupProps<T = string | number | boolean> {
  modelValue: T
  options: RadioOption<T>[]
  name: string
  label?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  orientation?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<NeoRadioGroupProps<string | number | boolean>>(), {
  disabled: false,
  required: false,
  orientation: 'vertical',
  label: '',
  helperText: '',
})

interface NeoRadioGroupEmits<T = string | number | boolean> {
  (e: 'update:modelValue', value: T): void
}

const emit = defineEmits<NeoRadioGroupEmits<string | number | boolean>>()

const labelId = computed(() => `${props.name}-label`)

const updateValue = <T extends string | number | boolean>(value: T) => {
  emit('update:modelValue', value)
}
</script>
