import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      // Only externalize modules with native .node binaries that Rollup can't bundle.
      // All pure-JS modules (electron-updater, simple-git, chokidar) are bundled by Vite.
      external: ['better-sqlite3'],
    },
  },
});
