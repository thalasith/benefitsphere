import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: "#1B386D",
        secondary: "#00AB4E",
        tertiary: "#0198D8",
        "tertiary-lt": "#C6EDFF",
        "tertiary-dk": "#0164AC",
        danger: "#EE3C8C",
        "danger-lt": "#FDDFE5",
        "danger-dk": "#B2025A",
      },
      spacing: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
