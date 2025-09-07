<template>
  <div class="flex w-full flex-col gap-y-1.5" :class="props.class">
    <!-- Optional label/helper text -->
    <div v-if="props.label" class="font-primary text-sm font-bold text-black">
      <label :for="computedId" class="transition-colors duration-300 ease-in-out">
        {{ props.label }}
      </label>
    </div>

    <!-- Trigger + Dropzone -->
    <div
      ref="dropRef"
      :id="computedId"
      class="relative w-full rounded-xl border-4 border-black bg-white p-4 transition-colors duration-150 ease-in-out"
      :class="[
        'font-secondary',
        'focus-visible:outline-primary focus-visible:outline-2',
        dropzoneClasses,
        { 'cursor-not-allowed opacity-65': props.disabled },
      ]"
      role="button"
      :aria-label="props.ariaLabel"
      :aria-disabled="props.disabled ? 'true' : undefined"
      :aria-describedby="describedbyId"
      tabindex="0"
      @click="onTriggerClick"
      @keydown="onTriggerKeydown"
      @focus="(ev) => emit('focus', ev)"
      @blur="(ev) => emit('blur', ev)"
      @dragover.prevent="onDragOver"
      @dragenter.prevent="onDragEnter"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <slot name="trigger">
        <div class="flex items-center justify-between gap-3">
          <div class="flex min-w-0 flex-col">
            <span class="truncate font-bold">
              {{ triggerText }}
            </span>
            <span v-if="props.helperText" class="text-utility-darker mt-1 text-xs">
              {{ props.helperText }}
            </span>
          </div>
          <NeoButton :disabled="props.disabled"> Browse… </NeoButton>
        </div>
      </slot>

      <!-- Hidden file input -->
      <input
        ref="inputRef"
        class="sr-only"
        type="file"
        :id="computedId + '-input'"
        :name="props.name"
        :accept="props.accept"
        :multiple="!!props.multiple"
        :capture="props.capture"
        :disabled="props.disabled"
        @change="onNativeChange"
      />
    </div>

    <!-- Description slot (below trigger) -->
    <div v-if="$slots.description" :id="descId" class="text-utility-darker text-xs">
      <slot name="description" />
    </div>

    <!-- Previews -->
    <div v-if="files.length" class="mt-2">
      <slot name="previews" :files="files">
        <ul class="space-y-1.5">
          <li
            v-for="(file, idx) in files"
            :key="idx"
            class="flex items-center justify-between rounded-lg border-2 border-dashed border-black/30 px-3 py-1.5"
          >
            <div class="flex min-w-0 items-center gap-2">
              <span class="truncate text-sm font-bold">{{ file.name }}</span>
              <span class="text-utility-darker text-[11px]">({{ formatBytes(file.size) }})</span>
            </div>
          </li>
        </ul>
      </slot>
    </div>

    <!-- Live region for validation errors -->
    <p v-if="lastError" class="text-error text-xs" role="status" aria-live="polite">
      {{ lastError }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import type { HTMLAttributes, InputHTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

// Local types
export type NeoFileInputErrorCode =
  | 'file-too-large'
  | 'file-too-small'
  | 'invalid-type'
  | 'too-many-files'
export interface NeoFileInputError {
  code: NeoFileInputErrorCode
  message: string
  file?: File
}

export interface NeoFileInputProps {
  id?: string
  name?: string
  accept?: InputHTMLAttributes['accept']
  multiple?: boolean
  capture?: InputHTMLAttributes['capture']
  disabled?: InputHTMLAttributes['disabled']
  required?: boolean
  modelValue?: File[]
  maxSize?: number
  minSize?: number
  maxFiles?: number
  ariaLabel?: string
  ariaDescribedby?: string
  role?: string
  class?: HTMLAttributes['class']
  label?: string
  helperText?: string
}

export interface NeoFileInputEmits {
  (e: 'update:modelValue', files: File[]): void
  (e: 'change', files: File[], ev: Event): void
  (e: 'error', error: NeoFileInputError): void
  (e: 'invalid', message: string): void
  (e: 'focus', ev: FocusEvent): void
  (e: 'blur', ev: FocusEvent): void
}

const props = withDefaults(defineProps<NeoFileInputProps>(), {
  id: undefined,
  name: undefined,
  accept: undefined,
  multiple: false,
  capture: undefined,
  disabled: false,
  required: false,
  modelValue: undefined,
  maxSize: undefined,
  minSize: undefined,
  maxFiles: undefined,
  ariaLabel: undefined,
  ariaDescribedby: undefined,
  role: undefined,
  class: undefined,
  label: undefined,
  helperText: undefined,
})

const emit = defineEmits<NeoFileInputEmits>()

/** Internal state */
const inputRef = ref<HTMLInputElement | null>(null)
const dropRef = ref<HTMLElement | null>(null)
const dragging = ref(false)
const files = ref<File[]>(props.modelValue ?? [])
const lastError = ref<string | null>(null)

/** Controlled update helper */
function updateFiles(next: File[], ev?: Event) {
  files.value = next
  emit('update:modelValue', next)
  if (ev) emit('change', next, ev)
}

/** IDs and ARIA */
const uid = `neo-fileinput-${Math.random().toString(36).slice(2, 10)}`
const computedId = computed(() => props.id ?? uid)
const slots = useSlots()

const descId = computed(() => (slots.description ? `${computedId.value}-desc` : undefined))
const describedbyId = computed(() => {
  const ids: string[] = []
  if (props.ariaDescribedby) ids.push(props.ariaDescribedby)
  if (descId.value) ids.push(descId.value)
  return ids.length ? ids.join(' ') : undefined
})

/** Visual classes */
const dropzoneClasses = computed(() =>
  cn(
    'border-dashed',
    dragging.value ? 'bg-black/5' : 'bg-white',
    props.disabled ? '' : 'hover:bg-black/5',
  ),
)

/** Trigger helper text */
const triggerText = computed(() => {
  const base = props.multiple
    ? 'Drag & drop files here or click to upload'
    : 'Drag & drop a file here or click to upload'
  return props.accept ? `${base} (${props.accept})` : base
})

/** Native input trigger */
function onTriggerClick() {
  if (props.disabled) return
  inputRef.value?.click()
}

function onTriggerKeydown(ev: KeyboardEvent) {
  if (props.disabled) return
  if (ev.key === 'Enter' || ev.key === ' ') {
    ev.preventDefault()
    inputRef.value?.click()
  }
}

/** Drag & Drop handlers */
function onDragOver() {
  if (props.disabled) return
  dragging.value = true
}
function onDragEnter() {
  if (props.disabled) return
  dragging.value = true
}
function onDragLeave() {
  dragging.value = false
}
function onDrop(ev: DragEvent) {
  if (props.disabled) return
  dragging.value = false
  const dt = ev.dataTransfer
  if (!dt) return
  const droppedFiles = Array.from(dt.files ?? [])
  handleIncomingFiles(droppedFiles, ev)
}

/** Native input change */
function onNativeChange(ev: Event) {
  if (props.disabled) return
  const target = ev.target as HTMLInputElement
  const picked = Array.from(target.files ?? [])
  handleIncomingFiles(picked, ev)
  // reset native input so that picking same file again still triggers change
  if (target) target.value = ''
}

/** Validation + normalization */
function handleIncomingFiles(incoming: File[], ev?: Event) {
  lastError.value = null
  const { valid, errors } = validateFiles(incoming)
  if (errors.length) {
    // emit first error as invalid, and each file error via 'error'
    lastError.value = errors[0].message
    emit('invalid', errors[0].message)
    for (const err of errors) emit('error', err)
  }
  // For single mode, keep only first valid file
  const next = props.multiple ? valid : valid.slice(0, 1)
  // Apply maxFiles constraint after valid filtering
  let limited = next
  if (props.multiple && props.maxFiles && next.length > props.maxFiles) {
    const err: NeoFileInputError = {
      code: 'too-many-files',
      message: `Too many files. Maximum allowed is ${props.maxFiles}.`,
    }
    emit('error', err)
    emit('invalid', err.message)
    lastError.value = err.message
    limited = next.slice(0, props.maxFiles)
  }
  updateFiles(limited, ev)
}

function validateFiles(candidates: File[]) {
  const errors: NeoFileInputError[] = []
  const valid: File[] = []
  const acceptList = parseAccept(props.accept)

  for (const file of candidates) {
    // size checks
    if (props.maxSize && file.size > props.maxSize) {
      errors.push({ code: 'file-too-large', message: `${file.name} exceeds maximum size`, file })
      continue
    }
    if (props.minSize && file.size < props.minSize) {
      errors.push({ code: 'file-too-small', message: `${file.name} is below minimum size`, file })
      continue
    }
    // type checks
    if (acceptList.length && !matchesAccept(file, acceptList)) {
      errors.push({ code: 'invalid-type', message: `${file.name} is not an accepted type`, file })
      continue
    }
    valid.push(file)
  }

  // maxFiles pre-check when user tries to add more than allowed (for multiple only)
  if (props.multiple && props.maxFiles && valid.length > props.maxFiles) {
    errors.push({
      code: 'too-many-files',
      message: `Too many files. Maximum allowed is ${props.maxFiles}.`,
    })
  }

  return { valid, errors }
}

/** Accept parsing helpers */
type AcceptToken =
  | { kind: 'ext'; value: string } // ".png"
  | { kind: 'mime'; type: string; subtype: string } // "image/png"
  | { kind: 'wildcard'; type: string } // "image/*"

function parseAccept(accept?: string | null): AcceptToken[] {
  if (!accept) return []
  return accept
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((token): AcceptToken | null => {
      if (token.startsWith('.')) return { kind: 'ext', value: token.toLowerCase() }
      const parts = token.split('/')
      if (parts.length === 2) {
        const [type, subtype] = parts
        if (subtype === '*') return { kind: 'wildcard', type: type.toLowerCase() }
        return { kind: 'mime', type: type.toLowerCase(), subtype: subtype.toLowerCase() }
      }
      return null
    })
    .filter((x): x is AcceptToken => !!x)
}

function matchesAccept(file: File, tokens: AcceptToken[]): boolean {
  const lowerName = file.name.toLowerCase()
  const mime = (file.type || '').toLowerCase()
  const [type, subtype] = mime.split('/') as [string | undefined, string | undefined]

  for (const t of tokens) {
    if (t.kind === 'ext') {
      if (lowerName.endsWith(t.value)) return true
    } else if (t.kind === 'mime') {
      if (type === t.type && subtype === t.subtype) return true
    } else if (t.kind === 'wildcard') {
      if (type === t.type) return true
    }
  }
  return false
}

/** Utils */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}
</script>

<style scoped>
/* No motion extras here; use CSS-only transitions, respect reduced motion by default */
</style>
