import type { Config } from "tailwindcss";

const config: Config = {
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
        "warm-cream": "#FFF8F0",
        "light-peach": "#FFF4E6",
        "deep-brown": "#2D2520",
        espresso: "#1A1612",
        coral: "#FF6B4A",
        "warm-gold": "#F5A962",
        "warm-gray": "#736B65",
        "soft-sand": "#E8DED0",
        sage: "#6B9B7A",
        sunrise: "#FFF0DC",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
export default config;
