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
        accent: "#EE3C8C",
      },
    },
  },
  plugins: [],
} satisfies Config;
