/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#0A1A0F",
        bg2: "#0D2214",
        card: "rgba(14,38,22,0.65)",
        brd: "rgba(201,168,76,0.10)",
        brdHi: "rgba(201,168,76,0.22)",
        gold: { DEFAULT: "#C9A84C", light: "#E8D5A0", dark: "#8B7332", up: "#F5EDD4" },
        green: { DEFAULT: "#22C55E", dark: "#16A34A" },
        red: "#EF4444",
        amber: "#F59E0B",
        blue: "#3B82F6",
        purple: "#A855F7",
        text: { DEFAULT: "#E8E4D9", muted: "#9E9A8A", dim: "#6B6758" },
      },
      fontFamily: {
        display: ["'DM Sans'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
