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
        grayBtn: '#efefef',
      },
    },
  },
  plugins: [],
};
