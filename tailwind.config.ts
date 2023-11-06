import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000',
        white: '#39C1CF',
        grey: '#D9D9D9',
        green: '#00984E',
        paleGreen: '#E6F5F0',
        yellow: '#EDC121',
        blue: '#39C1CF',
      },
    },
  },
  plugins: [],
} satisfies Config;
