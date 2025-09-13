<template>
  <fieldset class="space-y-2">
    <NeoLegend v-if="legend">
      {{ legend }}
    </NeoLegend>
    <div
      class="flex"
      :class="[orientation === 'vertical' ? 'flex-col space-y-2' : 'flex-row space-x-4']"
      role="radiogroup"
      :aria-required="required"
    >
      <NeoRadio
        v-for="(option, index) in options"
        :key="index"
        :id="`${name}-${String(option.value)}`"
        :name="name"
        v-model="model"
        :value="option.value"
        :disabled="disabled || option.disabled"
      >
        {{ option.label }}
      </NeoRadio>
    </div>
    <p v-if="helperText" class="mt-1 text-sm text-gray-600">
      {{ helperText }}
    </p>
  </fieldset>
</template>

<script setup lang="ts">
import NeoRadio from '@/components/atoms/NeoRadio/NeoRadio.vue'
import NeoLegend from '@/components/atoms/NeoLegend/NeoLegend.vue'

export type RadioOption<T = string | number | boolean> = {
  label: string
  value: T
  disabled?: boolean
}

export interface NeoRadioGroupProps<T = string | number | boolean> {
  options: RadioOption<T>[]
  name: string
  legend?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  orientation?: 'horizontal' | 'vertical'
}

const { options, name, disabled = false, required = false, orientation = 'vertical', legend = '', helperText = '' } =
  defineProps<NeoRadioGroupProps<string | number | boolean>>()

const model = defineModel<string | number | boolean>()
</script>
