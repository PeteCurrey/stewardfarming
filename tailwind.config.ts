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
        // Corporate Executive Slate & Deep Charcoal
        obsidian: {
          950: "#090D14",
          900: "#0F172A", // Slate 900
          850: "#172033",
          800: "#1E293B", // Slate 800
          750: "#273449",
          700: "#334155", // Slate 700
          600: "#475569",
        },
        // Heritage British Racing Green (Clean Agricultural Corporate)
        forest: {
          50: "#F2F8F5",
          100: "#E3F1EB",
          200: "#C4E2D5",
          300: "#9CCDB8",
          400: "#6CB396",
          500: "#459676",
          600: "#2E7A5D",
          700: "#226049",
          800: "#184736",
          850: "#133B2D",
          900: "#0E2B21", // Elite Heritage British Green
          950: "#081B15",
        },
        // Professional Agricultural Emerald (Clean, crisp, no neon)
        volt: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          DEFAULT: "#15803D", // Deep field emerald
          neon: "#16A34A",
          glow: "#22C55E",
        },
        // Coutts Bank Sovereign Gold & Polished Brass
        gold: {
          50: "#FDFBF4",
          100: "#FBF6E9",
          200: "#F5EBCF",
          300: "#EBD9AA",
          400: "#DFC381",
          500: "#CFA958", // Classic executive gold
          600: "#B8913E",
          700: "#96722C",
          800: "#755621",
          900: "#573F18",
          coutts: "#C5A059", // Refined Coutts brass
          brass: "#C5A059",
        },
        // Restrained warm terracotta / alert accents
        terracotta: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
          950: "#431407",
        },
        // Crisp Corporate Paper & Executive Gray Tone Map
        parchment: {
          50: "#FBFBF9",
          100: "#F6F5F0",
          200: "#EFECE3",
          300: "#E2DDD0",
          400: "#CBC3AF",
          500: "#AFA58F",
          600: "#8E8470",
          700: "#6F6655",
          800: "#524B3D",
          900: "#383329",
          950: "#211E18",
        },
        charcoal: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#090D14",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Work Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Menlo", "monospace"],
      },
      borderRadius: {
        sharp: "4px",
        tech: "6px",
        panel: "8px",
        card: "12px",
        corporate: "8px",
      },
      boxShadow: {
        corporate: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        "corporate-md": "0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
        "corporate-lg": "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.04)",
        "corporate-xl": "0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.03)",
        hud: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        "hud-gold": "0 0 0 1px rgba(197, 160, 89, 0.2), 0 4px 12px -2px rgba(0, 0, 0, 0.05)",
        "coutts-card": "0 1px 3px rgba(0,0,0,0.06), 0 10px 30px -4px rgba(15, 23, 42, 0.08)",
        "precision-sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "precision-md": "0 4px 6px -1px rgb(0 0 0 / 0.07)",
        warm: "0 1px 3px 0 rgb(0 0 0 / 0.06)",
        "warm-md": "0 4px 6px -1px rgb(0 0 0 / 0.07)",
        "warm-lg": "0 10px 15px -3px rgb(0 0 0 / 0.08)",
        "warm-xl": "0 20px 25px -5px rgb(0 0 0 / 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
