import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        "hero-subtitle": "hsl(var(--hero-subtitle))",
        festival: {
          saffron: "hsl(var(--festival-saffron))",
          pink: "hsl(var(--festival-pink))",
          gold: "hsl(var(--festival-gold))",
          teal: "hsl(var(--festival-teal))",
          violet: "hsl(var(--festival-violet))",
          coral: "hsl(var(--festival-coral))",
          red: "hsl(var(--festival-red))",
          ink: "hsl(var(--festival-ink))",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Anton", "Impact", "sans-serif"],
      },
      letterSpacing: {
        display: "-0.045em",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 500ms ease-out both",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
