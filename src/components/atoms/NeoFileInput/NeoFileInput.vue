<template>
  <div class="flex w-full flex-col gap-y-1.5" :class="className">
    <div v-if="label" class="font-primary text-sm font-bold text-black">
      <label :for="computedId" class="transition-colors duration-300 ease-in-out">
        {{ label }}
      </label>
    </div>

    <div
      ref="dropRef"
      :id="computedId"
      class="relative w-full rounded-xl border-4 border-black bg-white p-4 transition-colors duration-150 ease-in-out"
      :class="[
        'font-secondary',
        'focus-visible:outline-primary focus-visible:outline-2',
        dropzoneClasses,
        { 'cursor-not-allowed opacity-65': disabled },
      ]"
      role="button"
      :aria-label="ariaLabel"
      :aria-disabled="disabled ? 'true' : undefined"
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
            <span v-if="helperText" class="text-utility-darker mt-1 text-xs">
              {{ helperText }}
            </span>
          </div>
          <NeoButton :disabled="disabled"> Browse… </NeoButton>
        </div>
      </slot>

      <input
        ref="inputRef"
        class="sr-only"
        type="file"
        :id="computedId + '-input'"
        :name="name"
        :accept="accept"
        :multiple="!!multiple"
        :capture="capture"
        :disabled="disabled"
        :required="required"
        @change="onNativeChange"
      />
    </div>

    <div v-if="$slots.description" :id="descId" class="text-utility-darker text-xs">
      <slot name="description" />
    </div>

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

    <p v-if="lastError" class="text-error text-xs" role="status" aria-live="polite">
      {{ lastError }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import type { HTMLAttributes, InputHTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

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
  (e: 'change', files: File[], ev: Event): void
  (e: 'error', error: NeoFileInputError): void
  (e: 'invalid', message: string): void
  (e: 'focus', ev: FocusEvent): void
  (e: 'blur', ev: FocusEvent): void
}

const {
  id = undefined,
  name = undefined,
  accept = undefined,
  multiple = false,
  capture = undefined,
  disabled = false,
  required = false,
  maxSize = undefined,
  minSize = undefined,
  maxFiles = undefined,
  ariaLabel = undefined,
  ariaDescribedby = undefined,
  class: className = undefined,
  label = undefined,
  helperText = undefined,
} = defineProps<NeoFileInputProps>()
const emit = defineEmits<NeoFileInputEmits>()

const model = defineModel<File[] | undefined>()

const inputRef = ref<HTMLInputElement | null>(null)
const dropRef = ref<HTMLElement | null>(null)
const dragging = ref(false)
const files = ref<File[]>(model.value ?? [])
const lastError = ref<string | null>(null)

function parseAccept(accept?: string): AcceptToken[] {
  if (!accept) return []
  return accept
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map<AcceptToken>((tok) => {
      if (tok.startsWith('.')) {
        return { kind: 'ext', value: tok.slice(1).toLowerCase() }
      }
      if (tok.includes('/*')) {
        return { kind: 'wildcard', type: tok.split('/')[0].toLowerCase() }
      }
      const [type, subtype] = tok.split('/')
      if (type && subtype) {
        return { kind: 'mime', type: type.toLowerCase(), subtype: subtype.toLowerCase() }
      }
      return { kind: 'wildcard', type: '*' }
    })
}

function matchesAccept(file: File, list: AcceptToken[]): boolean {
  const name = file.name.toLowerCase()
  const ext = name.includes('.') ? name.split('.').pop() || '' : ''
  const [ftype, fsub] = (file.type || '').toLowerCase().split('/')
  return list.some((t) => {
    if (t.kind === 'ext') {
      return ext === t.value
    }
    if (t.kind === 'wildcard') {
      return t.type === '*' || t.type === ftype
    }
    if (t.kind === 'mime') {
      return t.type === ftype && t.subtype === fsub
    }
    return false
  })
}

function updateFiles(next: File[], ev?: Event) {
  files.value = next
  model.value = next
  if (ev) emit('change', next, ev)
}

const uid = `neo-fileinput-${Math.random().toString(36).slice(2, 10)}`
const computedId = computed(() => id ?? uid)
const slots = useSlots()

const descId = computed(() => (slots.description ? `${computedId.value}-desc` : undefined))
const describedbyId = computed(() => {
  const ids: string[] = []
  if (ariaDescribedby) ids.push(ariaDescribedby)
  if (descId.value) ids.push(descId.value)
  return ids.length ? ids.join(' ') : undefined
})

// computedId declared above to ensure it's available to descId

const dropzoneClasses = computed(() =>
  cn(
    'border-dashed',
    dragging.value ? 'bg-black/5' : 'bg-white',
    disabled ? '' : 'hover:bg-black/5',
  ),
)

const triggerText = computed(() => {
  const base = multiple
    ? 'Drag & drop files here or click to upload'
    : 'Drag & drop a file here or click to upload'
  return accept ? `${base} (${accept})` : base
})

function onTriggerClick() {
  if (disabled) {
    return
  }
  inputRef.value?.click()
}

function onTriggerKeydown(ev: KeyboardEvent) {
  if (disabled) {
    return
  }
  if (ev.key === 'Enter' || ev.key === ' ') {
    ev.preventDefault()
    inputRef.value?.click()
  }
}

function onDragOver() {
  if (disabled) {
    return
  }
  dragging.value = true
}
function onDragEnter() {
  if (disabled) {
    return
  }
  dragging.value = true
}
function onDragLeave() {
  dragging.value = false
}
function onDrop(ev: DragEvent) {
  if (disabled) {
    return
  }
  dragging.value = false
  const dt = ev.dataTransfer
  if (!dt) {
    return
  }
  const droppedFiles = Array.from(dt.files ?? [])
  handleIncomingFiles(droppedFiles, ev)
}

function onNativeChange(ev: Event) {
  if (disabled) {
    return
  }
  const target = ev.target as HTMLInputElement
  const picked = Array.from(target.files ?? [])
  handleIncomingFiles(picked, ev)

  if (target) {
    target.value = ''
  }
}

function handleIncomingFiles(incoming: File[], ev?: Event) {
  lastError.value = null
  const { valid, errors } = validateFiles(incoming)
  if (errors.length) {
    lastError.value = errors[0].message
    emit('invalid', errors[0].message)
    for (const err of errors) emit('error', err)
  }

  const next = multiple ? valid : valid.slice(0, 1)

  let limited = next
  if (multiple && maxFiles && next.length > maxFiles) {
    const err: NeoFileInputError = {
      code: 'too-many-files',
      message: `Too many files. Maximum allowed is ${maxFiles}.`,
    }
    emit('error', err)
    emit('invalid', err.message)
    lastError.value = err.message
    limited = next.slice(0, maxFiles)
  }
  updateFiles(limited, ev)
}

function validateFiles(candidates: File[]) {
  const errors: NeoFileInputError[] = []
  const valid: File[] = []
  const acceptList = parseAccept(accept)

  for (const file of candidates) {
    if (maxSize && file.size > maxSize) {
      errors.push({ code: 'file-too-large', message: `${file.name} exceeds maximum size`, file })
      continue
    }
    if (minSize && file.size < minSize) {
      errors.push({ code: 'file-too-small', message: `${file.name} is below minimum size`, file })
      continue
    }

    if (acceptList.length && !matchesAccept(file, acceptList)) {
      errors.push({ code: 'invalid-type', message: `${file.name} is not an accepted type`, file })
      continue
    }
    valid.push(file)
  }

  if (multiple && maxFiles && valid.length > maxFiles) {
    errors.push({
      code: 'too-many-files',
      message: `Too many files. Maximum allowed is ${maxFiles}.`,
    })
  }

  return { valid, errors }
}

type AcceptToken =
  | { kind: 'ext'; value: string }
  | { kind: 'mime'; type: string; subtype: string }
  | { kind: 'wildcard'; type: string }
function formatBytes(bytes: number): string {
  if (bytes === 0) {
    return '0 B'
  }
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}
</script>
