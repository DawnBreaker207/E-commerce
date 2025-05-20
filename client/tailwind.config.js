/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  darkMode: 'media',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
        nunito: ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        primary: '#E11D48',
        'primary-foreground': '#FFFFFF',
        destructive: '#CC0033',
        'destructive-foreground': '#FAFAFA',
        muted: '#CFD9E5',
        'muted-foreground': '#64748B',
        card: '#F1F5F9',
        'card-foreground': '#000000',
        border: '#E2E8F0',
        background: '#FFFFFF',
        foreground: '#0C1420',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out-down': {
          from: { opacity: '1', transform: 'translateY(0)' },
          to: { opacity: '0', transform: 'translateY(10px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out-up': {
          from: { opacity: '1', transform: 'translateY(0)' },
          to: { opacity: '0', transform: 'translateY(10px)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'fade-out-down': 'fade-out-down 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-out-up': 'fade-out-up 0.3s ease-out',
      },
      boxShadow: {
        custom: '0px 0px 50px 0px rgb(82 63 105 / 15%)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      const newUtilities = {
        '.dropdown-content': {
          pointerEvents: 'none',
          transform: 'scale(0.95)',
          opacity: '0',
          transition: 'all 0.1s ease-in',
        },
        '.dropdown:hover .dropdown-content': {
          pointerEvents: 'auto',
          display: 'block',
          transform: 'scale(1)',
          animation: `${theme('animation.fade-in-up')}`,
          opacity: '1',
          transitionDuration: '0.2s',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};
