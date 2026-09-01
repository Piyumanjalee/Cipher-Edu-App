import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/caesar': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/vigenere': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/atbash': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/base64': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/railfence': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
})
