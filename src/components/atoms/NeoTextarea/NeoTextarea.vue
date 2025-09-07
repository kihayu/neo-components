<template>
  <div class="flex w-full flex-col gap-y-1.5" :class="props.class">
    <div v-if="$slots.label || props.label" class="font-primary text-sm font-bold text-black">
      <slot name="label">
        <label :for="computedId" class="transition-colors duration-300 ease-in-out">{{
          props.label
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
        :name="props.name"
        :placeholder="props.placeholder"
        :rows="rowsComputed"
        :minlength="props.minlength"
        :maxlength="props.maxlength"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :required="props.required"
        :aria-invalid="props.invalid || undefined"
        :aria-label="props.ariaLabel"
        :aria-labelledby="props.ariaLabelledby"
        :aria-describedby="computedDescribedby"
        :role="props.role"
        :style="resizeStyle"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
        @keyup="onKeyup"
        @input="onInput"
        @change="onChange"
      ></textarea>
    </div>

    <div
      v-if="$slots.description || props.helperText"
      :id="descId"
      class="text-utility-darker text-xs"
    >
      <slot name="description">{{ props.helperText }}</slot>
    </div>

    <div
      v-if="props.showCounter"
      class="text-utility-darker mt-0.5 flex justify-end text-[11px]"
      aria-live="polite"
    >
      <slot name="counter" :current="currentLength" :max="props.maxlength">
        <span
          >{{ currentLength }}<span v-if="props.maxlength">/{{ props.maxlength }}</span></span
        >
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch, useSlots } from 'vue'
import type { CSSProperties, HTMLAttributes, TextareaHTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

// Local interfaces for NeoTextarea
export type NeoSize = 'sm' | 'md' | 'lg'

export interface NeoTextareaProps {
  modelValue: string
  id?: string
  name?: string
  placeholder?: string
  rows?: number
  minlength?: number
  maxlength?: number
  /** Auto-grow height with content, if true rows acts as minRows */
  autosize?: boolean
  /** Restrict user resizing behavior */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  disabled?: TextareaHTMLAttributes['disabled']
  readonly?: boolean
  required?: boolean
  /** Visual/semantic state */
  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: NeoSize
  invalid?: boolean
  /** Accessibility helpers */
  ariaLabel?: string
  ariaDescribedby?: string
  ariaLabelledby?: string
  role?: string
  class?: HTMLAttributes['class']
  /** Helper/content text near control */
  label?: string
  helperText?: string
  /** Show live character counter */
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

const props = withDefaults(defineProps<NeoTextareaProps>(), {
  modelValue: '',
  placeholder: '',
  rows: 3,
  autosize: false,
  resize: 'vertical',
  disabled: false,
  readonly: false,
  required: false,
  variant: 'default',
  size: 'md',
  invalid: false,
  ariaLabel: undefined,
  ariaDescribedby: undefined,
  ariaLabelledby: undefined,
  role: undefined,
  class: undefined,
  label: undefined,
  helperText: undefined,
  showCounter: false,
})

const model = defineModel<string>()

const emit = defineEmits<NeoTextareaEmits>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const uid = `neo-textarea-${Math.random().toString(36).slice(2, 10)}`
const computedId = computed(() => props.id ?? uid)

const slots = useSlots()

const descId = computed(() =>
  props.helperText || !!slots.description ? `${computedId.value}-desc` : undefined,
)

const computedDescribedby = computed(() => {
  const ids: string[] = []
  if (props.ariaDescribedby) ids.push(props.ariaDescribedby)
  if (descId.value) ids.push(descId.value)
  return ids.length ? ids.join(' ') : undefined
})

const sizeClasses = computed(() => {
  const map = {
    sm: 'text-sm py-2',
    md: 'text-base py-2.5',
    lg: 'text-lg py-3',
  } as const
  return map[props.size ?? 'md']
})

const variantClasses = computed(() => {
  const base = 'border-black'
  const map = {
    default: base,
    success: 'border-success',
    warning: 'border-warning',
    error: 'border-error',
  } as const
  return map[props.variant ?? 'default']
})

const invalidClasses = computed(() => (props.invalid ? 'outline-2 outline-error' : ''))

const textareaClasses = computed(() =>
  cn(sizeClasses.value, variantClasses.value, invalidClasses.value),
)

const rowsComputed = computed(() => props.rows ?? 3)

const resizeStyle = computed<CSSProperties>(() => {
  // Tailwind resize utilities do not accept dynamic strings; apply inline style for precision.
  const map = {
    none: 'none',
    vertical: 'vertical',
    horizontal: 'horizontal',
    both: 'both',
  } as const
  return { resize: map[props.resize ?? 'vertical'] }
})

const currentLength = computed(() => model?.value?.length ?? 0)

function adjustHeight() {
  if (!props.autosize) return
  const el = textareaRef.value
  if (!el) return
  // Reset height to compute scrollHeight accurately, then set to content height.
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
  () => props.rows,
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
