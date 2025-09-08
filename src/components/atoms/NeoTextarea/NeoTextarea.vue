<template>
  <div class="flex w-full flex-col gap-y-1.5">
    <div v-if="$slots.label || label" class="font-primary text-sm font-bold text-black">
      <slot name="label">
        <label :for="computedId" class="transition-colors duration-300 ease-in-out">{{
          label
        }}</label>
      </slot>
    </div>

    <div class="relative">
      <textarea
        ref="textareaRef"
        :id="computedId"
        class="font-secondary placeholder:text-utility-darker focus-visible:outline-primary w-full rounded-xl border-4 bg-white px-3 py-2.5 font-bold transition-all duration-300 ease-in-out placeholder:font-bold focus-visible:outline-2 disabled:placeholder:opacity-65 disabled:hover:cursor-not-allowed"
        :class="textareaClasses"
        v-model="model"
        :name="name"
        :placeholder="placeholder"
        :rows="rowsComputed"
        :minlength="minlength"
        :maxlength="maxlength"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :aria-invalid="invalid || undefined"
        :aria-label="ariaLabel"
        :aria-labelledby="ariaLabelledby"
        :aria-describedby="computedDescribedby"
        :role="role"
        :style="resizeStyle"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
        @keyup="onKeyup"
        @input="onInput"
        @change="onChange"
      ></textarea>
    </div>

    <div v-if="$slots.description || helperText" :id="descId" class="text-utility-darker text-xs">
      <slot name="description">{{ helperText }}</slot>
    </div>

    <div
      v-if="showCounter"
      class="text-utility-darker mt-0.5 flex justify-end text-[11px]"
      aria-live="polite"
    >
      <slot name="counter" :current="currentLength" :max="maxlength">
        <span
          >{{ currentLength }}<span v-if="maxlength">/{{ maxlength }}</span></span
        >
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch, useSlots } from 'vue'
import type { CSSProperties, TextareaHTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

export type NeoSize = 'sm' | 'md' | 'lg'

export interface NeoTextareaProps {
  modelValue: string
  id?: string
  name?: string
  placeholder?: string
  rows?: number
  minlength?: number
  maxlength?: number

  autosize?: boolean

  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  disabled?: TextareaHTMLAttributes['disabled']
  readonly?: boolean
  required?: boolean

  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: NeoSize
  invalid?: boolean

  ariaLabel?: string
  ariaDescribedby?: string
  ariaLabelledby?: string
  role?: string

  label?: string
  helperText?: string

  showCounter?: boolean
}

export interface NeoTextareaEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', ev: InputEvent): void
  (e: 'change', ev: Event): void
  (e: 'focus', ev: FocusEvent): void
  (e: 'blur', ev: FocusEvent): void
  (e: 'keydown', ev: KeyboardEvent): void
  (e: 'keyup', ev: KeyboardEvent): void
}

const {
  id = undefined,
  name = undefined,
  placeholder = '',
  rows = 3,
  autosize = false,
  resize = 'vertical',
  disabled = false,
  readonly = false,
  required = false,
  variant = 'default',
  size = 'md',
  invalid = false,
  ariaLabel = undefined,
  ariaDescribedby = undefined,
  ariaLabelledby = undefined,
  role = undefined,
  label = undefined,
  helperText = undefined,
  showCounter = false,
} = defineProps<NeoTextareaProps>()

const model = defineModel<string>()

const emit = defineEmits<NeoTextareaEmits>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const uid = `neo-textarea-${Math.random().toString(36).slice(2, 10)}`
const computedId = computed(() => id ?? uid)

const slots = useSlots()

const descId = computed(() =>
  helperText || !!slots.description ? `${computedId.value}-desc` : undefined,
)

const computedDescribedby = computed(() => {
  const ids: string[] = []
  if (ariaDescribedby) ids.push(ariaDescribedby)
  if (descId.value) ids.push(descId.value)
  return ids.length ? ids.join(' ') : undefined
})

const sizeClasses = computed(() => {
  const map = {
    sm: 'text-sm py-2',
    md: 'text-base py-2.5',
    lg: 'text-lg py-3',
  } as const
  return map[size ?? 'md']
})

const variantClasses = computed(() => {
  const base = 'border-black'
  const map = {
    default: base,
    success: 'border-success',
    warning: 'border-warning',
    error: 'border-error',
  } as const
  return map[variant ?? 'default']
})

const invalidClasses = computed(() => (invalid ? 'outline-2 outline-error' : ''))

const textareaClasses = computed(() =>
  cn(sizeClasses.value, variantClasses.value, invalidClasses.value),
)

const rowsComputed = computed(() => rows ?? 3)

const resizeStyle = computed<CSSProperties>(() => {
  const map = {
    none: 'none',
    vertical: 'vertical',
    horizontal: 'horizontal',
    both: 'both',
  } as const
  return { resize: map[resize ?? 'vertical'] }
})

const currentLength = computed(() => model?.value?.length ?? 0)

function adjustHeight() {
  if (!autosize) return
  const el = textareaRef.value
  if (!el) return

  el.style.height = 'auto'
  el.style.overflowY = 'hidden'
  el.style.height = `${el.scrollHeight}px`
}

function onInput(ev: Event) {
  emit('input', ev as InputEvent)
  nextTick(adjustHeight)
}

function onChange(ev: Event) {
  emit('change', ev)
}

function onFocus(ev: FocusEvent) {
  emit('focus', ev)
}

function onBlur(ev: FocusEvent) {
  emit('blur', ev)
}

function onKeydown(ev: KeyboardEvent) {
  emit('keydown', ev)
}

function onKeyup(ev: KeyboardEvent) {
  emit('keyup', ev)
}

onMounted(() => nextTick(adjustHeight))
watch(
  () => model?.value,
  () => nextTick(adjustHeight),
)
watch(
  () => rows,
  () => nextTick(adjustHeight),
)
</script>

<style scoped>
/* Respect prefers-reduced-motion for any transitions (textareas use only CSS transitions, no shimmer). */
@media (prefers-reduced-motion: reduce) {
  textarea {
    transition: none !important;
  }
}
</style>
