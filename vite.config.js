import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
   

  ],  base: "/",
  server: {
    host: "0.0.0.0",   // expose to network
    port: 5173, //5173        // force fixed port
  },
})
