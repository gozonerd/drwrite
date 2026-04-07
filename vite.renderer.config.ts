import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isCoverage = process.env.COVERAGE === 'true';

export default defineConfig({
  plugins: [
    react({
      babel: isCoverage
        ? {
            plugins: [
              [
                'istanbul',
                {
                  include: ['src/**/*.{ts,tsx}'],
                  exclude: ['src/test/**', 'src/**/*.test.*', 'src/**/*.node-test.*'],
                  extension: ['.ts', '.tsx'],
                },
              ],
            ],
          }
        : undefined,
    }),
  ],
});
