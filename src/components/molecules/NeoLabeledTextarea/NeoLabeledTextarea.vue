<template>
  <div class="flex w-full flex-col gap-y-1.5">
    <div class="font-primary text-sm font-bold text-black">
      <slot name="label">
        <NeoLabel
          :forId="computedId"
          class="transition-colors duration-300 ease-in-out"
          :class="{ 'cursor-not-allowed opacity-65': disabled, 'text-primary': inFocus }"
        >
          {{ label }}
        </NeoLabel>
      </slot>

      <div
        v-if="$slots.description || description"
        :id="descId"
        class="text-utility-darker mt-1 text-xs"
      >
        <slot name="description">{{ description }}</slot>
      </div>
    </div>

    <NeoTextarea
      v-model="model"
      :id="computedId"
      :name="name"
      :placeholder="placeholder"
      :rows="rows"
      :maxlength="maxlength"
      :disabled="disabled"
      :required="required"
      :invalid="invalid"
      :aria-label="ariaLabel"
      :aria-describedby="computedDescribedby"
      :show-counter="showCounter"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeydown"
      @keyup="onKeyup"
      @input="onInput"
      @change="onChange"
    >
      <template #counter="{ current, max }">
        <slot name="counter" :current="current" :max="max">
          <span class="text-utility-darker mt-0.5 flex justify-end text-[11px]" aria-live="polite">
            {{ current }}<span v-if="max">/{{ max }}</span>
          </span>
        </slot>
      </template>
    </NeoTextarea>

    <div v-if="$slots.helper || helperText" class="text-utility-darker text-xs">
      <slot name="helper">{{ helperText }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import NeoLabel from '@/components/atoms/NeoLabel/NeoLabel.vue'
import NeoTextarea from '@/components/atoms/NeoTextarea/NeoTextarea.vue'

export interface NeoLabeledTextareaProps {
  defaultValue?: string
  id?: string
  name?: string
  label: string
  description?: string
  helperText?: string
  required?: boolean
  disabled?: boolean
  invalid?: boolean
  placeholder?: string
  rows?: number
  maxlength?: number
  showCounter?: boolean
  ariaLabel?: string
  ariaDescribedby?: string
}

export interface NeoLabeledTextareaEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', ev: InputEvent): void
  (e: 'change', ev: Event): void
  (e: 'focus', ev: FocusEvent): void
  (e: 'blur', ev: FocusEvent): void
  (e: 'keydown', ev: KeyboardEvent): void
  (e: 'keyup', ev: KeyboardEvent): void
}

const {
  id,
  defaultValue = '',
  name = undefined,
  label = '',
  description = undefined,
  helperText = undefined,
  required = false,
  disabled = false,
  invalid = false,
  placeholder = '',
  rows = 3,
  maxlength = undefined,
  showCounter = false,
  ariaLabel = undefined,
  ariaDescribedby = undefined,
} = defineProps<NeoLabeledTextareaProps>()

const model = defineModel<string>({ default: '' })

if (defaultValue !== '') {
  model.value = defaultValue
}

const emit = defineEmits<NeoLabeledTextareaEmits>()

const inFocus = ref(false)

const uid = `neo-ltextarea-${Math.random().toString(36).slice(2, 10)}`
const computedId = computed(() => id ?? uid)

const slots = useSlots()
const descId = computed(() =>
  description || !!slots.description ? `${computedId.value}-desc` : undefined,
)

const computedDescribedby = computed(() => {
  const ids: string[] = []
  if (ariaDescribedby) {
    ids.push(ariaDescribedby)
  }

  if (descId.value) {
    ids.push(descId.value)
  }

  return ids.length ? ids.join(' ') : undefined
})

function onFocus(ev: FocusEvent) {
  inFocus.value = true
  emit('focus', ev)
}
function onBlur(ev: FocusEvent) {
  inFocus.value = false
  emit('blur', ev)
}
function onKeydown(ev: KeyboardEvent) {
  emit('keydown', ev)
}
function onKeyup(ev: KeyboardEvent) {
  emit('keyup', ev)
}
function onInput(ev: Event) {
  emit('input', ev as InputEvent)
}
function onChange(ev: Event) {
  emit('change', ev)
}
</script>
