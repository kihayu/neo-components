import type { App, Component } from 'vue'
import * as components from './components'

function isVueComponent(val: unknown): val is Component {
  if (typeof val === 'function') return true
  if (typeof val === 'object' && val !== null) {
    const obj = val as Record<string, unknown>
    return 'render' in obj || 'setup' in obj
  }
  return false
}

export function registerNeoComponents(app: App): void {
  for (const [name, comp] of Object.entries(components)) {
    if (name.startsWith('Neo') && isVueComponent(comp)) {
      app.component(name, comp)
    }
  }
}

const NeoComponentsPlugin = {
  install(app: App): void {
    registerNeoComponents(app)
  },
}

export default NeoComponentsPlugin
