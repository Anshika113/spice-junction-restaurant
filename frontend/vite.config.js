import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Only used when VITE_USE_API=true. Harmless otherwise.
    proxy: { '/api': { target: 'http://localhost:8000', changeOrigin: true } },
  },
  build: { outDir: 'dist', assetsInlineLimit: 4096 },
})
