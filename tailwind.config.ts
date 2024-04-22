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
        "primary-lt": "#41587A",
        secondary: "#00AB4E",
        tertiary: "#0198D8",
        "tertiary-lt": "#C6EDFF",
        "tertiary-dk": "#0164AC",
        danger: "#EE3C8C",
        "danger-lt": "#FDDFE5",
        "danger-dk": "#B2025A",
        info: "#463281",
        "info-lt": "#EADFF2",
      },
      spacing: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
