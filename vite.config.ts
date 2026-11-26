import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages 项目站点使用相对路径，避免仓库名变化导致资源 404
  base: './',
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  }
})
