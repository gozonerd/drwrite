import '@testing-library/jest-dom/vitest';

// Mock window.matchMedia for dark mode detection in Zustand store
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addListener: () => { /* noop */ },
    removeListener: () => { /* noop */ },
    addEventListener: () => { /* noop */ },
    removeEventListener: () => { /* noop */ },
    dispatchEvent: () => false,
  }),
});

// Mock the drwrite preload API
Object.defineProperty(window, 'drwrite', {
  writable: true,
  value: {
    openFile: async () => ({ canceled: true }),
    saveFile: async () => ({ success: true }),
    saveFileAs: async () => ({ canceled: true }),
    exportPdf: async () => ({ canceled: true }),
    exportHtml: async () => ({ canceled: true }),
    previewHtml: async () => ({ success: true }),
    getRecentFiles: async () => [],
    openRecentFile: async () => ({ canceled: true }),
    clearRecentFiles: async () => ({ success: true }),
    getGitStatus: async () => ({ isRepo: false }),
    watchFile: async () => ({ success: true }),
    unwatchFile: async () => ({ success: true }),
    onFileChanged: () => () => { /* noop */ },
    readDirectory: async () => ({ entries: [] }),
  },
});

// Mock localStorage
const store: Record<string, string> = {};
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
  },
});
