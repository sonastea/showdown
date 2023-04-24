/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        once: {
          DEFAULT: "#FF5FA2",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFD9E9",
          300: "#FFB1D1",
          400: "#FF88BA",
          500: "#FF5FA2",
          600: "#FF2781",
          700: "#EE0064",
          800: "#B6004C",
          900: "#7E0035",
          950: "#620029",
        },
        mina: {
          DEFAULT: "#6DCDB8",
          50: "#F6FCFB",
          100: "#E7F7F3",
          200: "#C8ECE4",
          300: "#AAE2D6",
          400: "#8BD7C7",
          500: "#6DCDB8",
          600: "#43BFA4",
          700: "#339681",
          800: "#256D5D",
          900: "#174339",
          950: "#102E27",
        },
      },
    },
  },
  plugins: [],
};
