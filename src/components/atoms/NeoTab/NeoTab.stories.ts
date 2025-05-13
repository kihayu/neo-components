import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NeoTab from './NeoTab.vue'
import NeoIcon from '../NeoIcon/NeoIcon.vue'

import { Plus } from 'lucide-vue-next'

const meta: Meta<typeof NeoTab> = {
  title: 'Atoms/NeoTab',
  component: NeoTab,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'ID for the tab element',
    },
    contentId: {
      control: 'text',
      description: 'ID of the content panel controlled by this tab',
    },
    selected: {
      control: 'boolean',
      description: 'Whether this tab is currently selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether this tab is disabled',
    },
  },
  args: {
    id: 'tab-1',
    contentId: 'panel-1',
    selected: false,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof NeoTab>

export const Default: Story = {
  render: (args) => ({
    components: { NeoTab },
    setup() {
      return { args }
    },
    template: `
      <div class="border-b-4 border-black">
        <NeoTab v-bind="args">Tab 1</NeoTab>
      </div>
    `,
  }),
}

export const Selected: Story = {
  render: (args) => ({
    components: { NeoTab },
    setup() {
      return { args }
    },
    template: `
      <div class="border-b-4 border-black">
        <NeoTab v-bind="args">Selected Tab</NeoTab>
      </div>
    `,
  }),
  args: {
    selected: true,
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { NeoTab },
    setup() {
      return { args }
    },
    template: `
      <div class="border-b-4 border-black">
        <NeoTab v-bind="args">Disabled Tab</NeoTab>
      </div>
    `,
  }),
  args: {
    disabled: true,
  },
}

export const TabGroup: Story = {
  render: (args) => ({
    components: { NeoTab },
    setup() {
      const selectedTabIndex = ref(0)

      const selectTab = (index: number) => {
        selectedTabIndex.value = index
      }

      return { args, selectedTabIndex, selectTab }
    },
    template: `
      <div>
        <div role="tablist" class="flex border-b-4 border-black">
          <NeoTab
            id="tab-1"
            contentId="panel-1"
            :selected="selectedTabIndex === 0"
            @select="selectTab(0)"
          >
            First Tab
          </NeoTab>

          <NeoTab
            id="tab-2"
            contentId="panel-2"
            :selected="selectedTabIndex === 1"
            @select="selectTab(1)"
          >
            Second Tab
          </NeoTab>

          <NeoTab
            id="tab-3"
            contentId="panel-3"
            :selected="selectedTabIndex === 2"
            @select="selectTab(2)"
          >
            Third Tab
          </NeoTab>

          <NeoTab
            id="tab-4"
            contentId="panel-4"
            disabled
            :selected="selectedTabIndex === 3"
            @select="selectTab(3)"
          >
            Disabled Tab
          </NeoTab>
        </div>

        <div class="p-4 border-4 border-t-0 border-black rounded-b-xl">
          <div id="panel-1" role="tabpanel" aria-labelledby="tab-1" v-if="selectedTabIndex === 0">
            <p>Content for the first tab</p>
          </div>

          <div id="panel-2" role="tabpanel" aria-labelledby="tab-2" v-if="selectedTabIndex === 1">
            <p>Content for the second tab</p>
          </div>

          <div id="panel-3" role="tabpanel" aria-labelledby="tab-3" v-if="selectedTabIndex === 2">
            <p>Content for the third tab</p>
          </div>
        </div>
        <div class="mt-8 p-4 bg-gray-100 rounded-xl">
          <p class="text-sm text-gray-700">⚠️ <strong>Note:</strong> For a more feature-rich tab experience with animated selection, please use the <code>NeoTabGroup</code> molecule component.</p>
          <p class="text-sm text-gray-700 mt-2">See: <code>Molecules/NeoTabGroup</code> in Storybook</p>
        </div>
      </div>
    `,
  }),
}

export const WithIcon: Story = {
  render: (args) => ({
    components: { NeoTab, NeoIcon, Plus },
    setup() {
      return { args }
    },
    template: `
      <div class="border-b-4 border-black">
        <NeoTab v-bind="args">
          <span class="flex items-center gap-2">
            <NeoIcon size="sm">
              <Plus />
            </NeoIcon>
            Tab with Icon
          </span>
        </NeoTab>
      </div>
    `,
  }),
}
