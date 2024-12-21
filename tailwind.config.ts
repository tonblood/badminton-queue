import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // custom_GD: "var(--Gradient-Button)",
        disable_Color: "var(--Disable)",
        default_Icon_color: "#c4c4c4",
        Active_Icon_color: "var(--primary-color)",
        text_color: "#333",
        borderColor: "#f5f5f5",
        danger: "#D1392B",
      },
      backgroundImage:{
        custom_GD: "linear-gradient(to bottom,#A83B24,#CC6651)"
      },
    },
  },
  plugins: [nextui()],
};
export default config;
