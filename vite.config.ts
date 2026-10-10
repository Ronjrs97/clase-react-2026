import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // "@/..." apunta a src/. Es la convención que usa shadcn/ui
    alias: { '@': resolve(import.meta.dirname, './src') },
  },
})
