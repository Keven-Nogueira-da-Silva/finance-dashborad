import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Define a porta do front como 3000
    proxy: {
      // Quando o React chamar '/api', ele redireciona para o Java
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      // Configuração para o WebSocket do Dashboard não quebrar
      '/ws': {
        target: 'http://localhost:8080',
        ws: true,
      },
    },
  },
})