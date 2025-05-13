import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NeoTabGroup from './NeoTabGroup.vue'
import NeoTab from '@/components/atoms/NeoTab/NeoTab.vue'
import NeoIcon from '@/components/atoms/NeoIcon/NeoIcon.vue'

import { Home, Users, Settings } from 'lucide-vue-next'

const meta: Meta<typeof NeoTabGroup> = {
  title: 'Molecules/NeoTabGroup',
  component: NeoTabGroup,
  tags: ['autodocs'],
  argTypes: {
    selectedTabIndex: {
      control: { type: 'number' },
      description: 'Index of the currently selected tab',
    },
  },
  args: {
    selectedTabIndex: 0,
  },
}

export default meta
type Story = StoryObj<typeof NeoTabGroup>

export const Default: Story = {
  render: (args) => ({
    components: { NeoTabGroup, NeoTab },
    setup() {
      const selectedTabIndex = ref(args.selectedTabIndex)

      return {
        args,
        selectedTabIndex,
        updateSelectedTab: (index: number) => {
          selectedTabIndex.value = index
        },
      }
    },
    template: `
      <NeoTabGroup
        :selectedTabIndex="selectedTabIndex"
        @update:selectedTabIndex="updateSelectedTab"
      >
        <NeoTab
          id="tab-1"
          contentId="panel-1"
          :selected="selectedTabIndex === 0"
          @select="updateSelectedTab(0)"
        >
          Dashboard
        </NeoTab>

        <NeoTab
          id="tab-2"
          contentId="panel-2"
          :selected="selectedTabIndex === 1"
          @select="updateSelectedTab(1)"
        >
          Projects
        </NeoTab>

        <NeoTab
          id="tab-3"
          contentId="panel-3"
          :selected="selectedTabIndex === 2"
          @select="updateSelectedTab(2)"
        >
          Team
        </NeoTab>

        <NeoTab
          id="tab-4"
          contentId="panel-4"
          disabled
          :selected="selectedTabIndex === 3"
          @select="updateSelectedTab(3)"
        >
          Disabled
        </NeoTab>

        <template #panels>
          <div id="panel-1" role="tabpanel" aria-labelledby="tab-1" v-if="selectedTabIndex === 0">
            <h3 class="font-primary text-lg font-medium mb-2">Dashboard Panel</h3>
            <p>This is the dashboard panel content. The selection indicator slides smoothly between tabs.</p>
          </div>

          <div id="panel-2" role="tabpanel" aria-labelledby="tab-2" v-if="selectedTabIndex === 1">
            <h3 class="font-primary text-lg font-medium mb-2">Projects Panel</h3>
            <p>View your current projects and their status.</p>
          </div>

          <div id="panel-3" role="tabpanel" aria-labelledby="tab-3" v-if="selectedTabIndex === 2">
            <h3 class="font-primary text-lg font-medium mb-2">Team Panel</h3>
            <p>Manage your team members and assign responsibilities.</p>
          </div>
        </template>
      </NeoTabGroup>
    `,
  }),
}

export const WithIcons: Story = {
  render: (args) => ({
    components: { NeoTabGroup, NeoTab, NeoIcon, Home, Users, Settings },
    setup() {
      const selectedTabIndex = ref(args.selectedTabIndex)

      return {
        args,
        selectedTabIndex,
        updateSelectedTab: (index: number) => {
          selectedTabIndex.value = index
        },
      }
    },
    template: `
      <NeoTabGroup
        :selectedTabIndex="selectedTabIndex"
        @update:selectedTabIndex="updateSelectedTab"
      >
        <NeoTab
          id="tab-home"
          contentId="panel-home"
          :selected="selectedTabIndex === 0"
          @select="updateSelectedTab(0)"
        >
          <div class="flex items-center gap-2">
            <NeoIcon size="sm">
              <Home />
            </NeoIcon>
            Home
          </div>
        </NeoTab>

        <NeoTab
          id="tab-users"
          contentId="panel-users"
          :selected="selectedTabIndex === 1"
          @select="updateSelectedTab(1)"
        >
          <div class="flex items-center gap-2">
            <NeoIcon size="sm">
              <Users />
            </NeoIcon>
            Users
          </div>
        </NeoTab>

        <NeoTab
          id="tab-settings"
          contentId="panel-settings"
          :selected="selectedTabIndex === 2"
          @select="updateSelectedTab(2)"
        >
          <div class="flex items-center gap-2">
            <NeoIcon size="sm">
              <Settings />
            </NeoIcon>
            Settings
          </div>
        </NeoTab>

        <template #panels>
          <div id="panel-home" role="tabpanel" aria-labelledby="tab-home" v-if="selectedTabIndex === 0">
            <h3 class="font-primary text-lg font-medium mb-2">Home Dashboard</h3>
            <p>Welcome to your dashboard. The selection indicator animates between tabs with icons.</p>
          </div>

          <div id="panel-users" role="tabpanel" aria-labelledby="tab-users" v-if="selectedTabIndex === 1">
            <h3 class="font-primary text-lg font-medium mb-2">User Management</h3>
            <p>Manage your users and their permissions.</p>
          </div>

          <div id="panel-settings" role="tabpanel" aria-labelledby="tab-settings" v-if="selectedTabIndex === 2">
            <h3 class="font-primary text-lg font-medium mb-2">Settings</h3>
            <p>Configure your application settings and preferences.</p>
          </div>
        </template>
      </NeoTabGroup>
    `,
  }),
}
