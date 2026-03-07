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
          DEFAULT: "#1a4a2e",
          mid: "#2d6e47",
          light: "#4a9e6b",
          pale: "#edf6f1",
        },
        gold: {
          DEFAULT: "#c9962b",
          light: "#f0c060",
          pale: "#fdf5e3",
        },
        cream: "#faf7f0",
        sand: "#ede5d0",
        "warm-white": "#fffdf8",
        charcoal: "#1c1c1c",
        muted: "#6b6b5e",
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
