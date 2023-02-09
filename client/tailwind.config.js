/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bluePrimary: '#0095f6',
        blueSecondary: '#5259d6',
        grayPrimary: '#dbdbdb',
        graySecondary: '#262626',
        grayText: '#8e8e8e',
        bgColorPrimary: '#fafafa',
        bgColor: '#1a1e2d',
        grayBtn: '#efefef',
        searchBg: '#14162b',
        themeColor: '#f9fafb',
        inactiveColor: 'rgb(113 119 144 / 78%)',
      },
      boxShadow: {
        '3xl': '0 0 0 2px rgb(134 140 160 / 2%',
      },
    },
  },
  plugins: [],
};
