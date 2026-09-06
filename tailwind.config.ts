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
        // Deep obsidian surfaces (John Deere / CommandARM matte chassis)
        obsidian: {
          950: "#060907",
          900: "#0A0F0D",
          850: "#0F1613",
          800: "#141D19",
          750: "#1A2520",
          700: "#222F29",
          600: "#2F4038",
        },
        // British Racing Green / High-Precision Ag Forest (Coutts × John Deere Green)
        forest: {
          50: "#f2f7f4",
          100: "#dbe8e0",
          200: "#b8d2c4",
          300: "#8eb6a2",
          400: "#64957e",
          500: "#447861",
          600: "#325f4c",
          700: "#264a3b",
          800: "#1B3B2B", // Elite Racing Green
          850: "#142C20",
          900: "#0E2017",
          950: "#08130E",
        },
        // High-Octane Agro Volt / Monster Energy Acid Lime (Telemetry HUD & Live Pulses)
        volt: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          DEFAULT: "#00E676", // High-voltage kinetic lime
          neon: "#39FF14",
          glow: "#00FF66",
        },
        // Coutts Bank Gold & Heritage Brass (Fiduciary Luxury & Precious Accents)
        gold: {
          50: "#fbf9ef",
          100: "#f6f1d8",
          200: "#ece0af",
          300: "#dfca7d",
          400: "#d2b14f",
          500: "#C9A227", // Harvest Gold
          600: "#B88E1B",
          700: "#946F13",
          800: "#755612",
          900: "#594010",
          coutts: "#D4AF37", // Imperial Coutts Gold
          brass: "#C5A059",
        },
        // Terracotta & Copper Warning Accents
        terracotta: {
          50: "#fdf8f4",
          100: "#faeee4",
          200: "#f4dbca",
          300: "#ebbe9f",
          400: "#df996e",
          500: "#d37b46",
          600: "#B5651D",
          700: "#984e18",
          800: "#7c3f18",
          900: "#663517",
          950: "#391a0a",
        },
        // Engineered Steel & Parchment Tone Map
        parchment: {
          50: "#FAF7F2",
          100: "#F5F0E6",
          200: "#EAE2D2",
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
          800: "#2B2620",
          900: "#1f1b17",
          950: "#120f0c",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "SF Mono", "Menlo", "monospace"],
      },
      borderRadius: {
        sharp: "2px",
        tech: "4px",
        panel: "6px",
        card: "10px",
      },
      boxShadow: {
        hud: "0 0 0 1px rgba(0, 230, 118, 0.2), 0 8px 24px -4px rgba(0, 0, 0, 0.4)",
        "hud-gold": "0 0 0 1px rgba(212, 175, 55, 0.3), 0 8px 24px -4px rgba(0, 0, 0, 0.4)",
        "coutts-card": "0 1px 3px rgba(0,0,0,0.1), 0 12px 32px -4px rgba(10,15,13,0.12)",
        "precision-sm": "0 1px 2px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        "precision-md": "0 4px 12px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
        warm: "0 2px 8px -1px rgba(43, 38, 32, 0.06), 0 1px 3px -1px rgba(43, 38, 32, 0.04)",
        "warm-md": "0 6px 16px -2px rgba(43, 38, 32, 0.08), 0 2px 6px -1px rgba(43, 38, 32, 0.05)",
        "warm-lg": "0 14px 28px -4px rgba(43, 38, 32, 0.10), 0 6px 12px -2px rgba(43, 38, 32, 0.06)",
        "warm-xl": "0 24px 40px -8px rgba(43, 38, 32, 0.14)",
      },
      backgroundImage: {
        "tactical-grid": "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "radar-radial": "radial-gradient(circle at 50% 50%, rgba(0, 230, 118, 0.08) 0%, transparent 70%)",
        "gold-radial": "radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.12) 0%, transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
