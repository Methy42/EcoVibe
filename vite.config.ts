import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/socket.io': {
        target: "http://localhost:3000",
        changeOrigin: true,
        ws: true
      }
    }
  },
  plugins: [vue()],
})
