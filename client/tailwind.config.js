module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark-blue': '#2D3E50',
        'light-blue': '#4A90E2',
        'light-gray': '#F7F7F7',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
