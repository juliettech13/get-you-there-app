import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          600: "var(--color-gray-600)",
        },
        navy: "var(--color-navy)",
        forest: "var(--color-forest)",
        lavender: "var(--color-lavender)",
        sky: "var(--color-sky)",
        sand: "var(--color-sand)",
        brown: "var(--color-brown)",
        burgundy: "var(--color-burgundy)",
        orange: "var(--color-orange)",
        cream: "var(--color-cream)",
        gold: "var(--color-gold)",
      },
      fontFamily: {
        libreBaskerville: ["var(--font-libre-baskerville)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        switzer: ["var(--font-switzer)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
