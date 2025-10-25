module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        "smoky-dark":
          "radial-gradient(circle at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.9) 70%, #000 100%)",
      },
      fontFamily:{
          blackOps: ['"Black Ops One"', 'cursive'], // Google Font 1
          rubik: ['Rubik', 'sans-serif'],   
          oswald: ['Oswald', 'sans-serif']
      },
      keyframes: {
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
      },
      animation: {
        shine: 'shine 5s linear infinite',
      },
    },
  },
  plugins: [],
};