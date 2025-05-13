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
      role="group"
      :aria-labelledby="labelId"
      :aria-required="required"
    >
      <NeoCheckbox 
        v-for="option in options" 
        :key="option.value"
        :id="`${name}-${option.value}`"
        :model-value="isSelected(option.value)"
        :disabled="disabled || option.disabled"
        @update:model-value="updateValue(option.value, $event)"
      >
        {{ option.label }}
      </NeoCheckbox>
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
import NeoCheckbox from '@/components/atoms/NeoCheckbox/NeoCheckbox.vue'

export type CheckboxOption<T = string | number> = {
  label: string
  value: T
  disabled?: boolean
}

export interface NeoCheckboxGroupProps<T = string | number> {
  modelValue: T[]
  options: CheckboxOption<T>[]
  name: string
  label?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  orientation?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<NeoCheckboxGroupProps<string | number>>(), {
  disabled: false,
  required: false,
  orientation: 'vertical',
  label: '',
  helperText: '',
})

interface NeoCheckboxGroupEmits<T = string | number> {
  (e: 'update:modelValue', value: T[]): void
}

const emit = defineEmits<NeoCheckboxGroupEmits<string | number>>()

const labelId = computed(() => `${props.name}-label`)

const isSelected = <T extends string | number>(value: T): boolean => {
  return props.modelValue.includes(value)
}

const updateValue = <T extends string | number>(value: T, checked: boolean) => {
  const newValue = [...props.modelValue]
  
  if (checked && !newValue.includes(value)) {
    newValue.push(value)
  } else if (!checked) {
    const index = newValue.indexOf(value)
    if (index !== -1) {
      newValue.splice(index, 1)
    }
  }
  
  emit('update:modelValue', newValue)
}
</script>
