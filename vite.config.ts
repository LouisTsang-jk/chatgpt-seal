import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  base: './',
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
  },
  build: {
    rollupOptions: {
      // input: {
      //   popup: 'index.html',
      //   content: 'src/content.ts'
      // },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'content') {
            return 'content.js'
          }
          return '[name].js'
        }
      }
    }
  }
})
