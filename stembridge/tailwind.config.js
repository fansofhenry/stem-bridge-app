/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tell Tailwind which files to scan for class names
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Our brand colours as Tailwind tokens
      colors: {
        green: {
          DEFAULT: "#003b5c",
          mid: "#1a5276",
          light: "#2e86c1",
          pale: "#eaf2f8",
        },
        gold: {
          DEFAULT: "#c4972a",
          light: "#e8b84b",
          pale: "#fdf5e3",
        },
        cream: "#f8f9fa",
        sand: "#e2e4e8",
        "warm-white": "#fbfcfd",
        charcoal: "#1c1c1c",
        muted: "#5a6570",
        brand_red: "#c0392b",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["DM Sans", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
