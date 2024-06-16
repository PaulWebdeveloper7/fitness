/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const {default: flattenColorPalette,} = require("tailwindcss/lib/util/flattenColorPalette");
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",

  theme: {
    extend: {},
  },
  plugins: [],
}