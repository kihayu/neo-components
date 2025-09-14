<template>
  <div
    ref="triggerRef"
    @click="togglePopover"
    @keydown.enter="togglePopover"
    @keydown.space="togglePopover"
    @pointerdown.capture="onInternalPointerDown"
    @mousedown.capture="onInternalPointerDown"
    :tabindex="disabled ? undefined : 0"
    role="button"
    :aria-expanded="open"
    :aria-controls="popoverId"
    :aria-disabled="disabled ? 'true' : undefined"
  >
    <slot name="trigger"></slot>
  </div>

  <Teleport :to="teleportTo" :disabled="teleportDisabled">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-show="open"
        ref="popoverRef"
        :id="popoverId"
        class="fixed z-[70] min-w-[200px] rounded-xl border-4 border-black bg-white p-4 text-black"
        :class="positionClass"
        :style="{ top: `${popoverTop}px`, left: `${popoverLeft}px` }"
        :role="role"
        aria-modal="true"
        :aria-labelledby="`${popoverId}-title`"
        :aria-describedby="`${popoverId}-desc`"
        @click.capture.stop
        @click.stop
        @pointerdown.capture="onInternalPointerDown"
        @pointerdown.stop
        @mousedown.capture="onInternalPointerDown"
      >
        <div class="relative z-10" :id="`${popoverId}-desc`" @click="handleClickInSlot">
          <div v-if="$slots.header" class="font-primary">
            <slot name="header" />
          </div>
          <div v-if="$slots.default" class="font-secondary">
            <slot />
          </div>
        </div>

        <NeoButton v-if="dismissible" @click="closePopover" aria-label="Close popover">
          <X :size="16" aria-hidden="true" />
        </NeoButton>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { X } from 'lucide-vue-next'

type PopoverPosition = 'top' | 'right' | 'bottom' | 'left'
type PopoverRole = 'dialog' | 'menu' | 'listbox' | 'tooltip'

export interface NeoPopoverProps {
  position?: PopoverPosition
  dismissible?: boolean
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
  closeOnClickInSlot?: boolean
  offsetDistance?: number
  role?: PopoverRole
  id?: string
  disabled?: boolean
  teleportDisabled?: boolean
  teleportTo?: string | HTMLElement
}

const {
  position = 'bottom',
  dismissible = false,
  closeOnClickOutside = true,
  closeOnEsc = true,
  closeOnClickInSlot = false,
  offsetDistance = 8,
  role = 'dialog',
  id = '',
  disabled = false,
  teleportDisabled = false,
  teleportTo = 'body',
} = defineProps<NeoPopoverProps>()

const model = defineModel<boolean>({ default: false })

const triggerRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)
const open = ref(model.value)
const popoverTop = ref(0)
const popoverLeft = ref(0)
const popoverId = computed(() => id || `popover-${Math.random().toString(36).slice(2, 11)}`)

// Track whether the current pointer interaction started inside the popover or trigger
let pointerDownStartedInside = false

const onInternalPointerDown = (): void => {
  pointerDownStartedInside = true
}

const positionClass = computed(() => {
  const baseClass = {
    top: 'origin-bottom',
    right: 'origin-left',
    bottom: 'origin-top',
    left: 'origin-right',
  }[position]
  return baseClass
})

const togglePopover = () => {
  if (disabled) return
  open.value = !open.value
}

const closePopover = () => {
  open.value = false
}

const updatePosition = async () => {
  await nextTick()

  if (!triggerRef.value || !popoverRef.value || !open.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const popoverRect = popoverRef.value.getBoundingClientRect()

  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const gap = offsetDistance

  let top = 0
  let left = 0

  switch (position) {
    case 'top':
      top = triggerRect.top - popoverRect.height - gap * 1.5
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2
      left = triggerRect.right + gap
      break
    case 'bottom':
      top = triggerRect.bottom + gap
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2
      left = triggerRect.left - popoverRect.width - gap * 2.35
      break
    default:
      top = triggerRect.bottom + gap
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2
      break
  }

  const padding = 10

  if (left < padding) {
    left = padding
  } else if (left + popoverRect.width > windowWidth - padding) {
    left = windowWidth - popoverRect.width - padding
  }

  if (top < padding) {
    top = padding
  } else if (top + popoverRect.height > windowHeight - padding) {
    top = windowHeight - popoverRect.height - padding
  }

  popoverTop.value = top
  popoverLeft.value = left
}

const handleClickOutside = (event: MouseEvent) => {
  if (!open.value || !closeOnClickOutside) return

  // If the pointer interaction started inside the popover/trigger, skip closing on this click
  if (pointerDownStartedInside) {
    pointerDownStartedInside = false
    return
  }

  const target = event.target as HTMLElement
  const path = (event.composedPath ? event.composedPath() : []) as EventTarget[]

  const isInPopover = () => {
    if (!popoverRef.value) {
      return false
    }
    if (popoverRef.value.contains(target)) {
      return true
    }
    return path.includes(popoverRef.value)
  }

  const isInTrigger = () => {
    if (!triggerRef.value) {
      return false
    }
    if (triggerRef.value.contains(target)) {
      return true
    }
    return path.includes(triggerRef.value)
  }

  if (!isInPopover() && !isInTrigger()) {
    closePopover()
  }
}

const handleEscKey = (event: KeyboardEvent) => {
  if (open.value && closeOnEsc && event.key === 'Escape') {
    closePopover()
  }
}

const handleClickInSlot = () => {
  if (closeOnClickInSlot) {
    closePopover()
  }
}

watch(model, (newValue) => {
  open.value = newValue
  if (newValue) {
    nextTick(() => {
      updatePosition()
    })
  }
})

watch(open, (newValue) => {
  model.value = newValue
  if (newValue) {
    nextTick(() => {
      updatePosition()
    })
  }
})

const setupResizeObserver = () => {
  if (!popoverRef.value) return

  const resizeObserver = new ResizeObserver(() => {
    if (open.value) updatePosition()
  })

  resizeObserver.observe(popoverRef.value)

  onUnmounted(() => {
    resizeObserver.disconnect()
  })
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscKey)
  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition, true)

  const observer = new MutationObserver(() => {
    if (open.value) updatePosition()
  })

  watch(open, (newValue) => {
    if (newValue && popoverRef.value) {
      observer.observe(popoverRef.value, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
      })
      setupResizeObserver()
    } else {
      observer.disconnect()
    }
  })

  onUnmounted(() => {
    observer.disconnect()
  })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscKey)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)
})
</script>
