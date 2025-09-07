<template>
  <DialogRoot data-slot="dialog" v-bind="forwarded">
    <NeoDialogTrigger>
      <slot name="trigger" />
    </NeoDialogTrigger>

    <NeoDialogContent :size="size">
      <div class="flex items-start justify-between gap-4">
        <div>
          <NeoDialogTitle>
            <slot name="title" />
          </NeoDialogTitle>
          <NeoDialogDescription>
            <slot name="description" />
          </NeoDialogDescription>
        </div>
        <NeoDialogClose>
          <slot name="close">
            <NeoButton :extend-on-hover="false" size="sm" z-index="-1">
              <X />
            </NeoButton>
          </slot>
        </NeoDialogClose>
      </div>

      <div class="mt-4 space-y-2">
        <slot />
      </div>
    </NeoDialogContent>
  </DialogRoot>
</template>

<script setup lang="ts">
import {
  DialogRoot,
  type DialogRootProps,
  type DialogRootEmits,
  useForwardPropsEmits,
} from 'reka-ui'
import NeoDialogTrigger from '@/components/ui/dialog/NeoDialogTrigger.vue'
import NeoDialogContent from '@/components/ui/dialog/NeoDialogContent.vue'
import NeoDialogTitle from '@/components/ui/dialog/NeoDialogTitle.vue'
import NeoDialogDescription from '@/components/ui/dialog/NeoDialogDescription.vue'
import NeoDialogClose from '@/components/ui/dialog/NeoDialogClose.vue'
import NeoButton from '@/components/atoms/NeoButton/NeoButton.vue'
import { X } from 'lucide-vue-next'
import type { DialogContentVariants } from '.'

const {
  open,
  defaultOpen,
  modal,
  size = 'md',
} = defineProps<DialogRootProps & { size?: DialogContentVariants['size'] }>()
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits({ open, defaultOpen, modal }, emits)
</script>
