/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*.{ts,tsx}', './components/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}', './context/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'], serif: ['"Playfair Display"', 'serif'] },
      colors: {
        ivory: '#FFF9F0',
        blush: '#F5DFE3',
        rose: '#C58D98',
        maroon: { DEFAULT: '#7E2349', dark: '#5E1A37' },
        cokelat: '#735344',
      },
      animation: { 'fade-in': 'fadeIn 0.5s ease-out forwards' },
      keyframes: { fadeIn: { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } } },
    },
  },
  plugins: [],
};
