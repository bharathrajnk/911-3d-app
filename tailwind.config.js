/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Porsche-like geometric sans. Swap for "Porsche Next" if licensed.
        display: ['"Helvetica Neue"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#0a0a0b',
        smoke: '#161618',
        porsche: '#d5001c', // Guards Red accent
      },
      letterSpacing: {
        luxe: '0.22em',
      },
    },
  },
  plugins: [],
};
