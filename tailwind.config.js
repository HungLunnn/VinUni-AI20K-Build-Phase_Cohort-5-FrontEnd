/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['"Be Vietnam Pro"', 'Inter', 'system-ui', 'sans-serif'] },
      colors: {
        navy: { 900: '#0F1B33', 800: '#16264A', 700: '#1E3563' },
        brand: { DEFAULT: '#1F5FE0', dark: '#1749B3', soft: '#EAF1FF' },
      },
    },
  },
  plugins: [],
}
