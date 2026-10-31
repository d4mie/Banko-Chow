import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Capacitor serves the bundle from the web root, so keep the default base.
  // Override with VITE_BASE when hosting the website under a sub-path.
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    sourcemap: false,
  },
  server: {
    host: true,
    port: 5173,
  },
})
