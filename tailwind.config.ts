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
        forest: {
          50: "#f2f6f3",
          100: "#e0ece4",
          200: "#c2d8cb",
          300: "#99beaa",
          400: "#6d9f86",
          500: "#4b8267",
          600: "#3a6a53",
          700: "#2f5643",
          800: "#2C4A3B", // Primary Forest Green
          900: "#21382c",
          950: "#122019",
        },
        terracotta: {
          50: "#fdf8f4",
          100: "#faeee4",
          200: "#f4dbca",
          300: "#ebbe9f",
          400: "#df996e",
          500: "#d37b46",
          600: "#B5651D", // Secondary Accent Terracotta
          700: "#984e18",
          800: "#7c3f18",
          900: "#663517",
          950: "#391a0a",
        },
        parchment: {
          50: "#FAF7F2",
          100: "#F5F0E6", // Primary background
          200: "#EBE3D3",
          300: "#DDD0BA",
          400: "#CBB99C",
          500: "#B59F7E",
          600: "#998263",
          700: "#7A674D",
          800: "#5F503D",
          900: "#493D2F",
          950: "#2A2219",
        },
        charcoal: {
          50: "#f6f5f4",
          100: "#eceae7",
          200: "#d8d4cf",
          300: "#bcb5ac",
          400: "#9d9386",
          500: "#7f7466",
          600: "#62584d",
          700: "#49423a",
          800: "#2B2620", // Primary Charcoal
          900: "#1f1b17",
          950: "#120f0c",
        },
        gold: {
          50: "#fbf9ef",
          100: "#f6f1d8",
          200: "#ece0af",
          300: "#dfca7d",
          400: "#d2b14f",
          500: "#C9A227", // Accent Harvest Gold
          600: "#aa831b",
          700: "#866117",
          800: "#6e4e19",
          900: "#5c411a",
          950: "#36230b",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "Playfair Display", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "Source Sans 3", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        warm: "0 2px 8px -1px rgba(43, 38, 32, 0.06), 0 1px 3px -1px rgba(43, 38, 32, 0.04)",
        "warm-md": "0 6px 16px -2px rgba(43, 38, 32, 0.08), 0 2px 6px -1px rgba(43, 38, 32, 0.05)",
        "warm-lg": "0 14px 28px -4px rgba(43, 38, 32, 0.10), 0 6px 12px -2px rgba(43, 38, 32, 0.06)",
        "warm-xl": "0 24px 40px -8px rgba(43, 38, 32, 0.14)",
      },
      backgroundImage: {
        "paper-subtle": "radial-gradient(circle at 50% 50%, rgba(245, 240, 230, 0.8) 0%, rgba(235, 227, 211, 0.4) 100%)",
        "heritage-border": "repeating-linear-gradient(45deg, #2C4A3B 0, #2C4A3B 10px, #F5F0E6 10px, #F5F0E6 20px)",
      },
    },
  },
  plugins: [],
};

export default config;
