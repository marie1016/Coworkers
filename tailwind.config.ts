import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";
import lineClamp from "@tailwindcss/line-clamp";

const config: Config = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 브랜드 색상
        brand: {
          primary: "#10B981",
          secondary: "#34D399",
          tertiary: "#A3E635",
        },
        // 포인트 색상
        point: {
          purple: "#A855F7",
          blue: "#3B82F6",
          cyan: "#06B6D4",
          pink: "#EC4899",
          rose: "#F43F5E",
          orange: "#F97316",
          yellow: "#EAB308",
        },
        // 배경 색상
        background: {
          primary: "#0F172A",
          secondary: "#1E293B",
          tertiary: "#334155",
          inverse: "#FFFFFF",
        },
        // 상호작용 색상
        interaction: {
          inactive: "#94A3B8",
          hover: "#059669",
          pressed: "#047857",
          focus: "#10B981",
        },
        // 테두리 색상
        border: {
          primary: "#F8FAFC",
        },
        // 텍스트 색상
        text: {
          primary: "#F8FAFC",
          secondary: "#CBD5E1",
          tertiary: "#E2E8F0",
          default: "#64748B",
          inverse: "#FFFFFF",
          disabled: "#94A3B8",
        },
        // 상태 색상
        status: {
          danger: "#DC2626",
        },
        // 아이콘 색상
        icon: {
          primary: "#64748B",
          inverse: "#F8FAFC",
          brand: "#10B981",
        },
      },

      backgroundImage: {
        "brand-gradient": "linear-gradient(to right, #10B981, #A3E635)",
      },

      fontFamily: {
        sans: ["Pretendard", ...defaultTheme.fontFamily.sans],
      },

      fontSize: {
        "text-4xl": ["2.5rem", "3rem"], // 40px / 48px
        "text-3xl": ["2rem", "2.375rem"], // 32px / 38px
        "text-2xl": ["1.5rem", "1.75rem"], // 24px / 28px
        "text-xl": ["1.25rem", "1.5rem"], // 20px / 24px
        "text-2lg": ["1.125rem", "1.3125rem"], // 18px / 21px
        "text-lg": ["1rem", "1.1875rem"], // 16px / 19px
        "text-md": ["0.875rem", "1.0625rem"], // 14px / 17px
        "text-sm": ["0.8125rem", "1rem"], // 13px / 16px
        "text-xs": ["0.75rem", "0.875rem"], // 12px / 14px
      },

      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        scaleOut: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.9)", opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        slideUp: "slideUp 0.6s ease-out forwards",
        slideDown: "slideDown 0.6s ease-out forwards",
        scaleIn: "scaleIn 0.6s ease-out forwards",
        scaleOut: "scaleOut 0.6s ease-out forwards",
        fadeIn: "fadeIn 0.6s ease-out forwards",
        fadeOut: "fadeOut 0.6s ease-out forwards",
      },
    },
    screens: {
      // 브레이크포인트 설정
      sm: { max: "639px" }, // 모바일: 0px ~ 639px
      md: { min: "640px", max: "1199px" }, // 태블릿: 640px ~ 1199px
      lg: { min: "1200px" }, // PC: 1200px 이상
    },
  },
  plugins: [forms, typography, aspectRatio, lineClamp],
};

export default config;
