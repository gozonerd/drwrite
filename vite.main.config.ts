import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      // Only externalize modules with native .node binaries that Rollup can't bundle.
      // simple-git and chokidar are pure JS and should be bundled by Vite.
      external: ['better-sqlite3', 'electron-updater'],
    },
  },
});
