import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background
        void: "#050507",
        obsidian: "#0D0D0F",
        smoke: "#1A1A1F",
        mist: "#2A2A32",

        // Aurora Accents
        aurora: {
          blue: "#5B9FFF",
          violet: "#9D7AFF",
          rose: "#FF7AA8",
          cyan: "#5BE0E5",
          gold: "#FFD07A",
        },

        // Glass
        glass: {
          white: "rgba(255, 255, 255, 0.05)",
          frost: "rgba(255, 255, 255, 0.12)",
          shine: "rgba(255, 255, 255, 0.25)",
          border: "rgba(255, 255, 255, 0.08)",
        },

        // Text
        primary: "#FFFFFF",
        secondary: "#8E8E93",
        muted: "#48484A",

        // Semantic
        success: "#30D158",
        error: "#FF453A",
        warning: "#FFD60A",
      },

      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Helvetica Neue",
          "Segoe UI",
          "sans-serif",
        ],
      },

      fontSize: {
        "display-lg": ["56px", { lineHeight: "64px", letterSpacing: "-0.02em" }],
        "display": ["40px", { lineHeight: "48px", letterSpacing: "-0.01em" }],
        "title-1": ["28px", { lineHeight: "34px", letterSpacing: "0" }],
        "title-2": ["22px", { lineHeight: "28px", letterSpacing: "0" }],
        "title-3": ["18px", { lineHeight: "24px", letterSpacing: "0" }],
        "body-lg": ["17px", { lineHeight: "24px", letterSpacing: "0" }],
        "body": ["16px", { lineHeight: "22px", letterSpacing: "0" }],
        "callout": ["15px", { lineHeight: "20px", letterSpacing: "0" }],
        "footnote": ["13px", { lineHeight: "18px", letterSpacing: "0" }],
        "caption": ["12px", { lineHeight: "16px", letterSpacing: "0.02em" }],
        "lyrics-active": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em" }],
        "lyrics": ["20px", { lineHeight: "28px", letterSpacing: "0" }],
      },

      borderRadius: {
        "glass": "24px",
        "glass-sm": "16px",
        "glass-lg": "32px",
      },

      backdropBlur: {
        "glass": "40px",
        "glass-sm": "20px",
        "glass-lg": "60px",
      },

      boxShadow: {
        "glass": "0 8px 32px rgba(0, 0, 0, 0.4)",
        "glass-lg": "0 12px 48px rgba(0, 0, 0, 0.5)",
        "glow-blue": "0 0 40px rgba(91, 159, 255, 0.5)",
        "glow-violet": "0 0 40px rgba(157, 122, 255, 0.5)",
        "glow-cyan": "0 0 40px rgba(91, 224, 229, 0.5)",
        "inner-glow": "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      },

      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float-slow 20s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        "spin-slow": "spin 3s linear infinite",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-15px) rotate(5deg)" },
          "50%": { transform: "translateY(-25px) rotate(0deg)" },
          "75%": { transform: "translateY(-15px) rotate(-5deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(5%, 10%) scale(1.05)" },
          "50%": { transform: "translate(-5%, 5%) scale(0.98)" },
          "75%": { transform: "translate(8%, -5%) scale(1.02)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },

      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [],
};

export default config;
