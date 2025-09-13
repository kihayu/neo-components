import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NeoFileInput, { type NeoFileInputProps } from './NeoFileInput.vue'
import NeoButton from '@/components/atoms/NeoButton/NeoButton.vue'

const meta = {
  title: 'Atoms/NeoFileInput',
  component: NeoFileInput,
  tags: ['autodocs'],
  argTypes: {
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    maxFiles: { control: 'number' },
    maxSize: { control: 'number' },
    minSize: { control: 'number' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof NeoFileInput>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  id: 'neo-fileinput',
  label: 'Upload files',
  helperText: 'Drag & drop or click Browse…',
  accept: '',
  multiple: false,
  disabled: false,
} as Partial<NeoFileInputProps>

const renderWithModel = (args: Partial<NeoFileInputProps>) => ({
  components: { NeoFileInput },
  setup() {
    const files = ref<File[]>([])
    return { args, files }
  },
  template: `
    <div class="max-w-xl space-y-3">
      <NeoFileInput v-bind="args" v-model="files" />
      <div class="text-utility-darker text-[11px]">
        Selected: {{ files.length }} file(s)
      </div>
    </div>
  `,
})

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => renderWithModel(args),
}

export const MultipleWithLimit: Story = {
  args: {
    ...defaultArgs,
    multiple: true,
    maxFiles: 3,
  },
  render: (args) => renderWithModel(args),
}

export const ImagesOnlyWithSizeLimit: Story = {
  args: {
    ...defaultArgs,
    accept: 'image/*',
    multiple: true,
    maxSize: 500_000, // ~500 KB
  },
  render: (args) => renderWithModel(args),
}

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true,
  },
  render: (args) => renderWithModel(args),
}

export const CustomTriggerSlot: Story = {
  args: {
    ...defaultArgs,
    label: undefined,
    helperText: undefined,
    multiple: true,
    accept: '.pdf,.docx',
  },
  render: (args) => ({
    components: { NeoFileInput, NeoButton },
    setup() {
      const files = ref<File[]>([])
      return { args, files }
    },
    template: `
      <div class="max-w-xl space-y-3">
        <NeoFileInput v-bind="args" v-model="files">
          <template #trigger>
            <div class="flex items-center justify-between gap-3">
              <div class="flex min-w-0 flex-col">
                <span class="truncate font-bold">Upload documents (PDF or DOCX)</span>
                <span class="text-utility-darker mt-1 text-xs">
                  Choose up to 5 files. Drag & drop supported.
                </span>
              </div>
              <NeoButton>
                Select Files
              </NeoButton>
            </div>
          </template>
        </NeoFileInput>
        <div class="text-utility-darker text-[11px]">
          Selected: {{ files.length }} file(s)
        </div>
      </div>
    `,
  }),
}

export const CustomPreviewsSlot: Story = {
  args: {
    ...defaultArgs,
    multiple: true,
  },
  render: (args) => ({
    components: { NeoFileInput },
    setup() {
      const files = ref<File[]>([])
      return { args, files }
    },
    template: `
      <div class="max-w-xl space-y-3">
        <NeoFileInput v-bind="args" v-model="files">
          <template #previews="{ files }">
            <div class="mt-2 grid grid-cols-1 gap-2">
              <div
                v-for="(f, i) in files"
                :key="i"
                class="flex items-center justify-between rounded-lg border-2 border-dashed border-black/30 px-3 py-1.5"
              >
                <div class="min-w-0">
                  <div class="truncate text-sm font-bold">{{ f.name }}</div>
                  <div class="text-utility-darker text-[11px]">{{ (f.size/1024).toFixed(1) }} KB</div>
                </div>
              </div>
            </div>
          </template>
        </NeoFileInput>
        <div class="text-utility-darker text-[11px]">
          Selected: {{ files.length }} file(s)
        </div>
      </div>
    `,
  }),
}
