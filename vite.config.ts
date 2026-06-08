import { defineConfig } from 'vite'
import '@slidev/cli'

export default defineConfig({
  optimizeDeps: {
    include: [
      'chroma-js',
      'vis-network',
      'vis-data',
    ],
  },
  slidev: {
    markdown: {
      markdownItSetup(md) {
      },
    },
  },
})
