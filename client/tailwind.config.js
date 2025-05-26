/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}', './node_modules/@angular/material/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
        nunito: ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        border: 'var(--border)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
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
        'fade-in-down': 'fade-in-down 0.3s ease-out ',
        'fade-out-down': 'fade-out-down 0.3s ease-out ',
        'fade-in-up': 'fade-in-up 0.3s ease-out ',
        'fade-out-up': 'fade-out-up 0.3s ease-out ',
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
          display: 'none',
        },
        '.dropdown:hover .dropdown-content': {
          pointerEvents: 'auto',
          display: 'block',
          transform: 'scale(1)',
          animation: theme('animation.fade-in-up'),
          opacity: '1',
          transitionDuration: '0.2s',
          transitionTimingFunction: 'ease-out',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};
