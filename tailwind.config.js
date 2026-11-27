/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './data/**/*.js',
    './lib/**/*.js',
  ],
  // The site already ships a hand-built design system in globals.css.
  // Preflight would reset its typography and spacing, so we only emit utilities.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        obsidian: '#0b0d12',
        panel: '#131722',
        card: '#181d2a',
        hairline: '#283044',
        mint: '#34d399',
        emerald: { DEFAULT: '#10b981' },
        alabaster: '#faf9f6',
        ink: '#111318',
        muted: '#525866',
        'muted-2': '#7b8394',
        line: '#e4e2dc',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      boxShadow: {
        lift: '0 24px 60px -40px rgba(11, 13, 18, 0.45)',
        glow: '0 30px 80px -40px rgba(16, 185, 129, 0.55)',
      },
    },
  },
  plugins: [],
};
