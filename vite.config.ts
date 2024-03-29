import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
	  '@components': path.resolve(__dirname, './src/components'),
	  '@pages': path.resolve(__dirname, './src/pages'),
	  '@media': path.resolve(__dirname, './src/media'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
