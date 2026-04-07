import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const isCoverage = process.env.COVERAGE === 'true';

/**
 * Vite plugin to resolve d3/dist/d3.min.js imports.
 * D3's package.json exports map doesn't expose dist/d3.min.js directly,
 * so the default resolver fails in production builds. This plugin
 * intercepts the import and resolves it to the actual file on disk.
 */
function d3RawPlugin(): Plugin {
  return {
    name: 'resolve-d3-raw',
    enforce: 'pre',
    resolveId(source) {
      if (source === 'd3/dist/d3.min.js?raw' || source === 'd3/dist/d3.min.js') {
        return resolve(__dirname, 'node_modules/d3/dist/d3.min.js') +
          (source.endsWith('?raw') ? '?raw' : '');
      }
    },
  };
}

export default defineConfig({
  plugins: [
    d3RawPlugin(),
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
