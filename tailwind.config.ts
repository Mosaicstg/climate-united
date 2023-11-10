import type {Config} from 'tailwindcss';

export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                black: '#000',
                white: '#F8FAFD',
                grey: '#D9D9D9',
                green: '#00984E',
                lightGreen: '#29B78F',
                paleGreen: '#E6F5F0',
                yellow: '#EDC121',
                blue: '#39C1CF',
                darkBlue: '#1A445F',
            },
        },
    },
    plugins: [],
} satisfies Config;
