<template>
  <label class="font-primary min-w-fit text-lg" :for="forId">
    <slot />
  </label>
</template>

<script setup lang="ts">
export interface NeoLabelProps {
  forId: string
}

defineProps<NeoLabelProps>()
</script>
