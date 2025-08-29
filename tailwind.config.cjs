/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // <-- IMPORTANT for the Light/Dark toggle
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#b7d6ff",
          300: "#8abcff",
          400: "#5a9bff",
          500: "#2b79ff", // primary
          600: "#1f5ed1",
          700: "#1a4da8",
          800: "#173f88",
          900: "#132f65",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.06), 0 1px 1px rgba(0,0,0,0.04)",
      },
      borderRadius: {
        xl: "0.8rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
