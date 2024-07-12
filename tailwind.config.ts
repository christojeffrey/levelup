import type { Config } from "tailwindcss";

const config = {
  // custom add safelist
  safelist: ["bg-[#809B5E]", "bg-[#60AA70]"],
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        "2lg": "1024px",
        xl: "1440px",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        serif: ["Bohemian-Soul", "serif"],
      },
      colors: {
        transparent: "transparent",
        yellow: {
          darkest: "#CF6708",
          darker: "#DF7C21",
          main: "#F69834",
          light: "#FFC54D",
        },
        orange: {
          darkest: "#A23226",
          darker: "#CB4427",
          main: "#EC5E36",
          light: "#FF8C3C",
        },
        purple: {
          darkest: "#4F3B56",
          darker: "#784663",
          main: "#A75669",
          light: "#FF7E90",
        },
        blue: {
          darkest: "#30314D",
          darker: "#36416E",
          main: "#3D5A92",
          light: "#5F90BB",
        },
        green: {
          darkest: "#2C5A58",
          darker: "#3C7A6F",
          main: "#52988D",
          light: "#76BFA1",
        },
        bw: {
          darkest: "#24222F",
          darker: "#CECBB8",
          main: "#E6E4D7",
          light: "#FCFAEE",
        },
        black: "#000000",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
