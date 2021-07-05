module.exports = {
  purge: ['./src/components/**/*.jsx', './src/pages/**/*.jsx'],
  important: true,
  theme: {
    extend: {
    },
  },
  variants: {
    extend: {
      textColor: ['disabled'],
      backgroundColor: ['disabled'],
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
