/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dw-bg-primary': '#0d1117',
        'dw-bg-panel': '#161b22',
        'dw-bg-card': '#1c2128',
        'dw-bg-editor': '#0f1318',
        'dw-border': '#30363d',
        'dw-border-muted': '#21262d',
        'dw-primary': '#4ec9b0',
        'dw-primary-hover': '#5fd9c0',
        'dw-secondary': '#7b8daa',
        'dw-text-primary': '#e6edf3',
        'dw-text-secondary': '#8b949e',
        'dw-text-muted': '#636c76',
        'dw-success': '#3fb950',
        'dw-warning': '#d29922',
        'dw-error': '#f85149',
        'dw-info': '#58a6ff',
        'dw-handle': '#30363d',
        'dw-handle-hover': '#4ec9b0',
        'dw-handle-active': '#5fd9c0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
