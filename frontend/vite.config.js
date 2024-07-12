import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    proxy : {
      '/api' : {
        target : "https://rentify-gz9s.onrender.com",
        secure : false,
        changeOrigin: true,
      },
    },
  },
  
})
