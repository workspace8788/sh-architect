import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/sh-architect/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion', 'gsap'],
          router: ['react-router-dom'],
          email: ['@emailjs/browser'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
