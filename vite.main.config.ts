import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      // Native Node modules must be externalized — Rollup can't bundle .node binaries
      external: ['better-sqlite3', 'simple-git', 'chokidar'],
    },
  },
});
