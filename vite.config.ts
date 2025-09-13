import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'NeoComponents',
      formats: ['es', 'cjs'],
      fileName: (format) => `neo-components.${format === 'es' ? 'es' : 'cjs'}.js`,
    },
    rollupOptions: {
      // Do not bundle peer deps
      external: ['vue', 'reka-ui', 'lucide-vue-next'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
})
