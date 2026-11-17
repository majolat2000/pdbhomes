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
          navy: "#0A192F",
          blue: "#1E3A8A",
          azure: "#2563EB",
          green: "#059669",
          emerald: "#10B981",
          amber: "#059669", // Replaced yellow with rich Nigerian emerald green
          slate: "#1E293B",
          gold: "#047857",
          light: "#F8FAFC",
          card: "#FFFFFF",
          muted: "#64748B",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        display: ["'Outfit'", "'Plus Jakarta Sans'", "system-ui", "sans-serif"],
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
