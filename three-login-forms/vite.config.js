import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './', // Specify the root directory
  build: {
    outDir: 'dist', // Output directory for production build
  },
});
