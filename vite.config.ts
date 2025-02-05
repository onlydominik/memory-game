import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) return 'firebase';
            return 'vendor';
          }
          if (id.includes('/auth/')) return 'auth';
          if (id.includes('/components/')) return 'components';
        },
      },
    },
  },
});
