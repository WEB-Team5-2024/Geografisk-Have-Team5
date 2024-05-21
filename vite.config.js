import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';
import { strict } from 'node:assert';

// Load environment variables from .env file
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'process.env': process.env
  },
  preview:{
    port: 5173,
    strictPort: true
  },
  server:{
    port: 5173,
    strictPort: true,
    //host: true,
    //origin:"http://0.0.0.0:5173" 
  }
});
