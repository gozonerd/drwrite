import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    alias: {
      'd3/dist/d3.min.js?raw': new URL('./src/test/__mocks__/d3-raw.ts', import.meta.url).pathname,
    },
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/main.ts',
        'src/preload.ts',
        'src/preload.d.ts',
        'src/electron-env.d.ts',
        'src/plantuml-encoder.d.ts',
        'src/vite-env.d.ts',
        'src/renderer.tsx',
        'src/test/**',
        'src/**/*.node-test.*',
      ],
    },
  },
});
