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
        brand: {
          navy: "#0F172A",
          slate: "#1E293B",
          gold: "#C5A880",
          amber: "#D97706",
          light: "#F8FAFC",
          card: "#FFFFFF",
          muted: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        luxury: "0 10px 40px -10px rgba(15, 23, 42, 0.08)",
        "luxury-lg": "0 20px 50px -12px rgba(15, 23, 42, 0.15)",
        card: "0 2px 12px 0 rgba(15, 23, 42, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
