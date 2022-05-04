module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    'bg-red',
    'hover:bg-red-600',
    'focus:bg-red-600',
    'bg-gray',
    'hover:bg-gray-600',
    'focus:bg-gray-600',
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          DEFAULT: '#ECA539',
        },
        red: {
          DEFAULT: '#F22539',
          600: '#C00E20',
        },
        gray: {
          100: '#F9F9F9',
          200: '#F5F5F5',
          300: '#E8E8E8',
          DEFAULT: '#BFBFBF',
          600: '#5E5E5E',
          800: '#353535',
        },
      },
      backgroundImage: {
        pokemon: "url('/src/assets/bg.jpg')",
      },
    },
  },
  plugins: [],
};
