import type { Config } from 'tailwindcss';

const config: Config = {
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
      },
    },
  },
  plugins: [],
};
export default config;
