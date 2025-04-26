import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // optional: you can change this
  },
  build: {
    outDir: 'dist',
  },
});



// Zs9ZGNbrMmboEHvS