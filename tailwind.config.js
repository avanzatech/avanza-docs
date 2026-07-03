/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Aligned exactly to the marketing site's index.css custom properties
        bg: "#040e08",       // --background / --avanza-green-dark
        bg2: "#0a2318",      // --avanza-green
        card: "rgba(10,30,20,0.7)", // dark.--card region, glass-tinted
        brd: "rgba(201,168,76,0.10)",
        brdHi: "rgba(201,168,76,0.22)",
        gold: { DEFAULT: "#c9a84c", light: "#d4b96b", dark: "#8B7332", up: "#F5EDD4" }, // --avanza-gold / --avanza-gold-light
        green: { DEFAULT: "#22C55E", dark: "#16A34A" },
        red: "#EF4444",
        amber: "#F59E0B",
        blue: "#3B82F6",
        purple: "#A855F7",
        text: { DEFAULT: "#fafafa", muted: "#9E9A8A", dim: "#6B6758" }, // --foreground
      },
      fontFamily: {
        display: ["'DM Sans'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      keyframes: {
        gleam: {
          "0%, 15%": { backgroundPosition: "150% 0" },
          "35%, 100%": { backgroundPosition: "-50% 0" },
        },
        // Ported verbatim from the marketing site's index.css — built
        // specifically for the butterfly mark.
        butterflyFloat: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(0.8deg)" },
          "66%": { transform: "translateY(-6px) rotate(-0.5deg)" },
        },
        goldPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "butterfly-float": "butterflyFloat 6s ease-in-out infinite",
        "gold-pulse": "goldPulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
