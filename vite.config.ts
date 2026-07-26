import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  build: {
    sourcemap: 'hidden',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
          utils: ['clsx', 'tailwind-merge', 'zustand', 'react-router-dom'],
        },
      },
    },
  },
  plugins: [
    react(
      command === 'serve'
        ? {
            babel: {
              plugins: ['react-dev-locator'],
            },
          }
        : undefined
    ),
    tsconfigPaths()
  ],
}))
