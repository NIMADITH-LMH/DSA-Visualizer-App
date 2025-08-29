import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Enable hot module replacement
    hmr: {
      overlay: true,
    },
    // Watch for changes in these file types
    watch: {
      usePolling: true,
      interval: 1000,
    },
    // Open browser automatically
    open: true,
    // Auto-restart when config changes
    restart: true,
  },
})
