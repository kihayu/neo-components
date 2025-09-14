<template>
  <div
    class="flex"
    :class="{
      'flex-row items-center gap-x-3': layout === 'horizontal',
      'flex-col gap-y-1.5': layout === 'vertical',
    }"
  >
    <NeoLabel
      :forId="id"
      class="transition-colors duration-300 ease-in-out"
      :class="{ 'cursor-not-allowed opacity-65': disabled, 'text-primary': inFocus }"
    >
      <slot />
    </NeoLabel>
    <NeoInput
      :id="id"
      :placeholder="placeholder"
      :disabled="disabled"
      :scaleOnFocus="false"
      :type="type"
      v-model="model"
      @blur="inFocus = false"
      @focus="inFocus = true"
      @input="emit('input', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import NeoLabel from '@/components/atoms/NeoLabel/NeoLabel.vue'
import NeoInput from '@/components/atoms/NeoInput/NeoInput.vue'
import { ref } from 'vue'
import type { HTMLInputType } from '@/components/atoms/NeoInput/types'

const model = defineModel<string>()
type Layout = 'vertical' | 'horizontal'

export interface NeoLabeledInputProps {
  id: string
  placeholder?: string
  disabled?: boolean
  layout?: Layout
  type?: HTMLInputType
}

const {
  id = '',
  placeholder = '',
  disabled = false,
  layout = 'vertical',
  type = 'text',
} = defineProps<NeoLabeledInputProps>()

const inFocus = ref(false)

interface NeoLabeledInputEmits {
  (event: 'input', value: string): void
}

const emit = defineEmits<NeoLabeledInputEmits>()
</script>
