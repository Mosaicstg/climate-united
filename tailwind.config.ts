import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        black: "#000",
        white: "#F8FAFD",
        grey: "#D9D9D9",
        green: "#00984E",
        lightGreen: "#357A68",
        paleGreen: "#E6F5F0",
        yellow: "#EDC121",
        blue: "#39C1CF",
        darkBlue: "#1A445F",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
} satisfies Config

export default config
