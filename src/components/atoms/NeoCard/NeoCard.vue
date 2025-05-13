<template>
  <div class="relative" aria-label="Card" role="region">
    <motion.div
      class="relative flex h-full w-full transform flex-col rounded-xl border-4 border-black bg-white"
      :class="{ '-translate-x-1 -translate-y-1.5': shadow }"
    >
      <div v-if="dismissible" class="absolute top-2 right-2 z-20">
        <button
          type="button"
          class="flex rounded-md p-1.5 hover:bg-black/10 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          @click="emit('close')"
          aria-label="Dismiss"
        >
          <X class="h-5 w-5" />
        </button>
      </div>
      <div
        v-if="$slots.header"
        class="font-primary flex h-auto items-center border-b-4 px-2 py-4 leading-none"
      >
        <slot name="header" />
      </div>
      <div class="flex flex-1 px-2 py-4">
        <slot />
      </div>
      <div v-if="$slots.footer" class="font-primary flex h-12 items-center border-t-4 px-2 py-4">
        <slot name="footer" />
      </div>
    </motion.div>
    <motion.div
      v-if="shadow"
      class="absolute inset-0 rounded-xl bg-black"
      data-testid="card-shadow"
    ></motion.div>
  </div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { X } from 'lucide-vue-next'

export interface NeoCardProps {
  shadow?: boolean
  dismissible?: boolean
}

withDefaults(defineProps<NeoCardProps>(), {
  shadow: false,
  dismissible: false,
})

interface NeoCardEmits {
  (event: 'close'): void
}

const emit = defineEmits<NeoCardEmits>()
</script>
