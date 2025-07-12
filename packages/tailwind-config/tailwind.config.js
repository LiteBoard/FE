const { fontFamily } = require('@LiteBoard/fonts');

const colors = {
  neutral: {
    white: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F2F4F6',
    200: '#E5E8EB',
    300: '#D1D5DB',
    400: '#B0B8C1',
    500: '#8B95A1',
    600: '#6B7684',
    700: '#4E5968',
    800: '#333D48',
    900: '#191F28',
  },
  coolGray: {
    50: '#F3F6FC',
    100: '#E7EBF5',
  },
  blue: {
    50: '#E8F3FF',
    100: '#C9E2FF',
    200: '#90C2FF',
    300: '#64A8FF',
    400: '#4593FC',
    500: '#3182F6',
    600: '#2272EB',
    700: '#1B64DA',
    800: '#1957C2',
    900: '#194AA6',
  },
  red: {
    50: '#FFEEEE',
    100: '#FFD4D6',
    200: '#FEAFB4',
    300: '#FB8890',
    400: '#F66570',
    500: '#F04452',
    600: '#E42939',
    700: '#D22030',
    800: '#BC1B2A',
    900: '#A51926',
  },
  green: {
    50: '#F0FAF6',
    100: '#AEEFD5',
    200: '#76E4B8',
    300: '#3FD599',
    400: '#15C47E',
    500: '#03B26C',
    600: '#02A262',
    700: '#029359',
    800: '#028450',
    900: '#027648',
  },
  etc: {
    corral: '#FFDFDA',
    blue: '#E0EDFF',
    skyBlue: '#DAF3FF',
    purple: '#E5DCFF',
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors,
      fontFamily: {
        pretendard: [fontFamily.pretendard],
        sans: [fontFamily.pretendard],
      },
      fontSize: {
        'text-H1': [
          '2.75rem',
          { lineHeight: '56px', letterSpacing: '-0.01em', fontWeight: '600' },
        ],
        'text-H2': [
          '2rem',
          { lineHeight: '38px', letterSpacing: '-0.01em', fontWeight: '600' },
        ],
        'text-H3': [
          '1.5rem',
          { lineHeight: '30px', letterSpacing: '-0.02em', fontWeight: '700' },
        ],
        'text-T0': [
          '1.375rem',
          { lineHeight: '24px', letterSpacing: '-0.02em', fontWeight: '600' },
        ],
        'text-T1': [
          '1.125rem',
          { lineHeight: '23px', letterSpacing: '-0.02em', fontWeight: '600' },
        ],
        'text-T2': [
          '1rem',
          { lineHeight: '21px', letterSpacing: '-0.02em', fontWeight: '600' },
        ],
        'text-T3': [
          '0.875rem',
          { lineHeight: '18px', letterSpacing: '-0.02em', fontWeight: '600' },
        ],
        'text-B1M': [
          '1.125rem',
          { lineHeight: '23px', letterSpacing: '-0.02em', fontWeight: '500' },
        ],
        'text-B2M': [
          '1rem',
          { lineHeight: '24px', letterSpacing: '-0.02em', fontWeight: '500' },
        ],
        'text-B3M': [
          '0.875rem',
          { lineHeight: '22px', letterSpacing: '-0.02em', fontWeight: '500' },
        ],
        'text-B1R': [
          '1.125rem',
          { lineHeight: '23px', letterSpacing: '-0.02em', fontWeight: '400' },
        ],
        'text-B2R': [
          '1rem',
          { lineHeight: '24px', letterSpacing: '-0.02em', fontWeight: '400' },
        ],
        'text-B3R': [
          '0.875rem',
          { lineHeight: '22px', letterSpacing: '-0.02em', fontWeight: '400' },
        ],
        'text-caption': [
          '0.75rem',
          { lineHeight: '18px', letterSpacing: '-0.02em', fontWeight: '500' },
        ],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '28px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm: '0 2px 2px 0 rgb(0 0 0 / 0.04)',
        md: '0 4px 8px 0 rgb(0 0 0 / 0.08)',
        lg: '0 4px 16px 0 rgb(137 137 142 / 0.16)',
        xl: '0 4px 20px 0 rgb(0 0 0 / 0.2)',
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.2s ease-in',
        'slide-in-from-top': 'slide-in-from-top 0.2s ease-out',
        'slide-out-to-top': 'slide-out-to-top 0.2s ease-in',
        'slide-in-from-left': 'slide-in-from-left 0.2s ease-out',
        'slide-out-to-left': 'slide-out-to-left 0.2s ease-in',
        'zoom-in': 'zoom-in 0.2s ease-out',
        'zoom-out': 'zoom-out 0.2s ease-in',
        in: 'in 0.2s ease-out',
        out: 'out 0.2s ease-in',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'fade-out': {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        'slide-in-from-top': {
          from: { transform: 'translateY(-10%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-out-to-top': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-10%)' },
        },
        'slide-in-from-left': {
          from: { transform: 'translateX(-10%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-out-to-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-10%)' },
        },
        'zoom-in': {
          from: { transform: 'scale(0.95)' },
          to: { transform: 'scale(1)' },
        },
        'zoom-out': {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(0.95)' },
        },
        in: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        out: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar'),
    require('tailwindcss-gradients'),
    require('tailwindcss-interaction-variants'),
  ],
};
