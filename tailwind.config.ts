import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: {
          DEFAULT: "hsl(var(--background))",
          light: "hsl(var(--background-light))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        board: "hsl(var(--board))",
      },
      gridTemplateColumns: {
        "layout-300": "repeat(auto-fill, minmax(300px, 1fr))",
        "layout-350": "repeat(auto-fill, minmax(350px, 1fr))",
        "layout-400": "repeat(auto-fill, minmax(400px, 1fr))",
      },
    },
  },
  plugins: [],
}
export default config
