import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [react()],
    // Use relative paths in production, absolute in development
    base: isProduction ? './' : '/',
    build: {
      cssCodeSplit: false,
      outDir: 'dist',
      assetsDir: '.',
      rollupOptions: {
        output: {
          entryFileNames: 'index.js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name][extname]'
        }
      }
    }
  }
})
