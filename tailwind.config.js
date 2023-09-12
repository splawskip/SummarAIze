/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        pulse: {
          '0%': { transform: 'scale(1) rotate(45deg)', opacity: '1' },
          '50%': { transform: 'scale(1.3) rotate(45deg)', opacity: '1' },
          '100%:': { transform: 'scale(1) rotate(45deg)', opacity: '1' },
        },
        gradientBackgroundFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%:': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        'heart-beat': 'pulse 0.7s linear infinite',
        'background-dance': 'gradientBackgroundFlow 5s ease alternate infinite',
      },
    },
  },
  plugins: [],
};
