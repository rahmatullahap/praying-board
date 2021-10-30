module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    colors: {
      "white": "#FFFFFF",
      "blue-marine": "#2D405C",
      "blue-black-100": "#181D2A",
      "blue-lapis": "#2B50CB",
      "blue-sky": "#ECF2F8",
      "blue-black": "#161925",
      "blue-midnight": "#1D2088",
      "yellow-bright": "#FFCF31",
      khaki: "#FFDE73",
      golden: "#DDB430",
      orange: "#F3A336",
      "black-100": "#27282E",
      "black-200": "#3C3F42",
      "black-300": "#5F6368",
      "black-500": "#DADADA",
      "black-700": "#EFEFF0",
      red: "#ED2643",
      crimson: "#E6292E",
    },
    fontFamily: {
      nunito: ["nunito", "sans-serif"],
      ubuntu: ["ubuntu", "sans-serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
