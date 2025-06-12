import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        salvatore: ['var(--font-salvatore)'],
        flood: ['var(--font-flood)'],
      },
      colors: {
        gray: {
          50: '#E4EAEE1F',
          100: '#45455352',
          200: '#E4EAEE',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#454553',
        },
        pink: {
          500: '#F53F76',
        },
        blue: {
          100: '#11A8FF',
          500: '#3B82F6',
          600: '#2563EB',
        },
        white: {
          50: '#FFFFFF1F',
          100: '#FFFFFF',
        },
        black: {
          100: '#000000',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
