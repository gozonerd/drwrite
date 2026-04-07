/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dynamic tokens — resolve via CSS custom properties for light/dark
        'dw-bg-primary': 'var(--dw-bg-primary)',
        'dw-bg-panel': 'var(--dw-bg-panel)',
        'dw-bg-card': 'var(--dw-bg-card)',
        'dw-bg-editor': 'var(--dw-bg-editor)',
        'dw-border': 'var(--dw-border)',
        'dw-border-muted': 'var(--dw-border-muted)',
        'dw-primary': 'var(--dw-primary)',
        'dw-primary-hover': 'var(--dw-primary-hover)',
        'dw-secondary': 'var(--dw-secondary)',
        'dw-text-primary': 'var(--dw-text-primary)',
        'dw-text-secondary': 'var(--dw-text-secondary)',
        'dw-text-muted': 'var(--dw-text-muted)',
        'dw-success': 'var(--dw-success)',
        'dw-warning': 'var(--dw-warning)',
        'dw-error': 'var(--dw-error)',
        'dw-info': 'var(--dw-info)',
        'dw-handle': 'var(--dw-handle)',
        'dw-handle-hover': 'var(--dw-handle-hover)',
        'dw-handle-active': 'var(--dw-handle-active)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
