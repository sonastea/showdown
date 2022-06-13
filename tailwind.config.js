/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        once: {
          DEFAULT: "#FF5FA2",
        },
        ponce: {
          DEFAULT: "#FCC89B",
        },
        mina: {
          DEFAULT: "#71C7D4",
        },
      },
    },
  },
  plugins: [],
};
