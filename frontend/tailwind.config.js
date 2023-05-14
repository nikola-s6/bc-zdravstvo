/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // colors: {
    //   tb50: "#e4f0f6",
    //   tb100: "#bcd9ea",
    //   tb200: "#8bbdd9",
    //   tb300: "#5ba4cf",
    //   tb400: "#298fca",
    //   tb500: "#0079bf",
    //   tb600: "#026aa7",
    //   tb700: "#055a8c",
    //   tb800: "#094c72",
    //   tb900: "#0c3953",
    // },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        ailerons: ["AILERONS", "cursive"],
      },
    },
  },
  plugins: [],
}
