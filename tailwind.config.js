/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#161616',
        ivory: '#f7efe6',
        concrete: '#7b766d',
        stone: '#d9cfbf',
        champagne: '#7b8d6d',
        graphite: '#262421',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(22, 22, 22, 0.12)',
        glow: '0 0 0 1px rgba(123, 141, 109, 0.28), 0 20px 70px rgba(123, 141, 109, 0.18)',
      },
    },
  },
  plugins: [],
}
