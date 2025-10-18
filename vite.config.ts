import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/InvestCraft/', // <-- IMPORTANT (must match your repo name exactly, case-sensitive)
  plugins: [react()],
});