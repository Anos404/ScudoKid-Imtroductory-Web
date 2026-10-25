import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "kyntra-primary": "#2D8B8B",
        "scudo-primary": "#2D8B8B",
        "scudo-dark": "#206E6E",
        "scudo-deep": "#1A4F4F",
        "scudo-soft": "#E2F3F1",
        "scudo-accent": "#10B981",
        "scudo-ink": "#16212E",
        "scudo-muted": "#5C6773",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        360: "90rem",
        400: "100rem",
      },
      aspectRatio: {
        "440/477": "440 / 477",
      },
    },
  },
  plugins: [],
};

export default config;
