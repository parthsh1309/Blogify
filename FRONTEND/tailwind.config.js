/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mont: "Montserrat, sans-serif",
        merri: "Merriweather, serif",
        prost: "Protest Revolution, serif",
        roboSlab: "Roboto Slab, serif",
      },
      height:{
        '100vh':'100vh',
        '90vh':'90vh',
        '80vh':'80vh',
        '70vh':'70vh',
        '60vh':'60vh',
        '50vh':'50vh',
        '40vh':'40vh',
        '30vh':'30vh',
        '20vh':'20vh',
        '10vh':'10vh',
      },
      animation: {
        fadeIn : 'fadeIn 300ms ease-in',
        fadeOut : 'fadeOut 300ms ease-in',
        fadeInLeft : 'fadeInLeft 300ms ease-in',
        fadeOutLeft : 'fadeOutLeft 300ms ease-in',
      },

    },
  },
  darkMode:'class',
  plugins: [],
};
