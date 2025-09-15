import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild',
    sourcemap: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  esbuild: {
    keepNames: true,
  },
})
