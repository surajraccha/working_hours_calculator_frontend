import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: 'src/main.tsx', // Your main entry file
      output: {
        // Specify the output directory and other options if needed
      },
      // Exclude the Excel file from the build
      external: ['/work_hours.xlsx'],
    },
  },
});

