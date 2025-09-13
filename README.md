# ▨▨▨ NEO COMPONENTS ▨▨▨

> **BRUTALIST COMPONENT LIBRARY FOR VUE 3**

```diff
+ TYPESCRIPT-FIRST • TAILWIND CSS • ACCESSIBLE • ATOMIC DESIGN
```

## Overview

A Vue 3 component library featuring uncompromising brutalist aesthetics with strict TypeScript typing and atomic design principles. Bold. Raw. Functional.

## ▨▨▨ TECH STACK ▨▨▨

```diff
+ [ VUE 3 ]           Modern, Progressive JavaScript Framework with Composition API
+ [ VITE ]            Next Generation Frontend Tooling
+ [ TAILWINDCSS ]     Utility-First CSS Framework
+ [ LUCIDE ]          Beautiful & Consistent Icons
+ [ VITEST ]          Next Generation Testing Framework
+ [ STORYBOOK ]       Frontend Workshop for UI Development
+ [ MOTION ]          Animation Library for smooth transitions
```

## ▣▣▣ Preview ▣▣▣

The public storybook instance of the component library can be found [here](https://neo-sb.keanuhie.com/).

## ▣▣▣ GETTING STARTED ▣▣▣

```
┌───────────────────┐
│   PREREQUISITES   │
└───────────────────┘

! BUN PACKAGE MANAGER // REQUIRED
```

```
┌───────────────────┐
│   INSTALLATION    │
└───────────────────┘

1. Clone the repository

> git clone git@github.com:kihayu/neo-components.git
> cd neo-components

2. Install dependencies

> bun install --frozen-lockfile
```

## ▣▣▣ USAGE AS A LIBRARY ▣▣▣

You can consume `neo-components` directly in any Vue 3 app.

### 1) Install

Install the package and peer dependencies:

```bash
npm install neo-components vue lucide-vue-next reka-ui
# or
pnpm add neo-components vue lucide-vue-next reka-ui
# or
bun add neo-components vue lucide-vue-next reka-ui
```

### 2) Import global styles once

Import the built CSS in your app entry (e.g., `src/main.ts`):

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// Import Neo Components styles
import 'neo-components/dist/neo-components.css'

createApp(App).mount('#app')
```

### 3) Use components and types

```vue
<script setup lang="ts">
import { NeoButton, NeoTable, type TableVariants, type NeoButtonProps } from 'neo-components'

type User = { id: number; name: string; role: string }
const users: User[] = [
  { id: 1, name: 'Alice', role: 'Designer' },
  { id: 2, name: 'Bob', role: 'Engineer' },
]
</script>

<template>
  <NeoButton>Click me</NeoButton>
  <NeoTable :data="users" :columns="[{ key: 'name', header: 'Name' }, { key: 'role', header: 'Role' }]" />
  
</template>
```

Notes:

- All `.vue` components are exported from the package root. You can import atoms, molecules, and UI primitives directly: `import { NeoButton, NeoDialog } from 'neo-components'`.
- TypeScript interfaces for Props/Emits are re-exported for most components, e.g. `NeoButtonProps`, `NeoPaginationEmits`, etc.
- CVA variant types are available from the respective UI groups (e.g., `TableVariants`, `DialogContentVariants`).
- The library is tree-shakable; CSS is marked as a side effect so styles are preserved by bundlers.

### ▣ Global Plugin Registration (optional)

If you prefer to register all components globally, use the provided plugin:

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { NeoComponentsPlugin } from 'neo-components'
import 'neo-components/dist/neo-components.css'

createApp(App).use(NeoComponentsPlugin).mount('#app')
```

This registers every component with names like `NeoButton`, `NeoTable`, etc.

Alternatively, you can programmatically register them on an existing app instance:

```ts
import { registerNeoComponents } from 'neo-components'
registerNeoComponents(app)
```

```
┌───────────────────┐
│   DEVELOPMENT     │
└───────────────────┘

Start the development server:

> bun run storybook
```

```
┌───────────────────────────────────┐
│   PRODUCTION BUILD                │
└───────────────────────────────────┘

> bun run storybook-build
```

```
┌───────────────────┐
│   LINTING         │
└───────────────────┘

> bun lint
```

## ▣▣▣ LICENSE ▣▣▣

```
╔═══════════════════════════════════════════════╗
║  MIT LICENSE                                  ║
║  Copyright © 2025                             ║
║  Permission is hereby granted, free of charge ║
╚═══════════════════════════════════════════════╝
```

See the [LICENSE](LICENSE) file for full details.

## ▣▣▣ ACCESSIBILITY ▣▣▣

This project includes a structured accessibility knowledge base aligned to WCAG 2.1 Level AA.

- Central framework: [WCAG_Assessment_Framework.md](accessibility/WCAG_Assessment_Framework.md)
- Structure:
  - [checklists/](accessibility/checklists/)
  - [audit-templates/](accessibility/audit-templates/)
  - [mappings/](accessibility/mappings/)
    - [Components_to_WCAG.md](accessibility/mappings/Components_to_WCAG.md)
  - [references/](accessibility/references/)
  - [inventory/](accessibility/inventory/)
    - [Component_Inventory.md](accessibility/inventory/Component_Inventory.md) (if present)
    - [Component_Categories.csv](accessibility/inventory/Component_Categories.csv) (if present)

Refer to the framework for scope, workflow, and governance details.
