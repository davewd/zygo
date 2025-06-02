import tailwindThemeConfig from "@zygo/tailwind-theme/tailwind.config";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [tailwindThemeConfig],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
      },
      borderColor: {
        border: "hsl(var(--border))",
      },
    },
  },
};

export default config;