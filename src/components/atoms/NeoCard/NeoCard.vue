<template>
  <div class="relative" aria-label="Card" role="region">
    <motion.div
      class="relative z-10 flex h-full w-full transform flex-col rounded-xl border-4 border-black bg-white"
      :class="{ '-translate-x-1 -translate-y-1.5': shadow }"
    >
      <div v-if="$slots.header" class="font-primary flex h-12 items-center border-b-4 px-2 py-4">
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

export interface NeoCardProps {
  shadow?: boolean
}

withDefaults(defineProps<NeoCardProps>(), {
  shadow: true,
})
</script>
