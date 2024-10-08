import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'waitrose-red': '#7C263B',
        'waitrose-brown': '#C09C5C',
        'waitrose-beige': '#EEE6D7',
        'waitrose-lime': '#C4D143',
        'waitrose-green': '#244635',
        'subtle-background': '#F6F6F6',
        'subtle-foreground': '#878787',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
