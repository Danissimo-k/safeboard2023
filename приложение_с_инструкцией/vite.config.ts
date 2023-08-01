import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@models": path.resolve(__dirname, './src/models/'),
      "@utils": path.resolve(__dirname, './src/lib/utils/'),
      "@hooks": path.resolve(__dirname, './src/lib/hooks/'),
      "@features": path.resolve(__dirname, './src/features/'),
      "@services": path.resolve(__dirname, './src/api/services/'),
      "@mappers": path.resolve(__dirname, './src/api/mappers/'),
      "@dtos": path.resolve(__dirname, './src/api/dtos/'),
      "@store": path.resolve(__dirname, './src/store/'),
      "@routes": path.resolve(__dirname, './src/routes/'),
      "@lib": path.resolve(__dirname, '../src/lib/'),
    }
  }
})
