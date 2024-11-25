import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FDB913", // Primary color
        gray: "#AAAAAA", // Gray color
        lightPrimary: "rgba(253, 185, 19, 0.2)", // Light version of primary with opacity
        whiteTransparent: "#FFFFFF4D", // White with opacity
        error: "#FD1E1E", // Error red color
        warning: "#FB3333", // Warning color
        black: "#000000", // Background black color
      },
      borderRadius: {
        48: "48px", // Border radius
      },
      borderColor: {
        lightPrimaryBorder: "rgba(253, 185, 19, 0.1)", // Border color with opacity
      },
    },
  },
  plugins: [],
} satisfies Config;
