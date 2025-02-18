import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

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
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/components'),
      },
      { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
      { find: '@assets', replacement: path.resolve(__dirname, './src/assets') },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
      {
        find: '@context',
        replacement: path.resolve(__dirname, './src/context'),
      },
      {
        find: '@features',
        replacement: path.resolve(__dirname, './src/features'),
      },
      {
        find: '@typings',
        replacement: path.resolve(__dirname, './src/typings'),
      },
      {
        find: '@reducers',
        replacement: path.resolve(__dirname, './src/reducers'),
      },
      {
        find: '@services',
        replacement: path.resolve(__dirname, './src/services'),
      },
    ],
  },
});
