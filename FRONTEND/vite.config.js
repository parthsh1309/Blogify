
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    process.env: {
      DATABASE_BASE_URL: process.env.DATABASE_BASE_URL,
      RTE_API_KEY: process.env.RTE_API_KEY,
    }
  }
});