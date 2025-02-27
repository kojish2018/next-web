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
      },
      fontFamily: {
        cursive: ['"Dancing Script"', "cursive"],
        roboto: ['"Roboto"', "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
