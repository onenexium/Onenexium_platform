import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./features/**/*.{js,ts,jsx,tsx,mdx}",
        "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ["var(--font-display)", "Georgia", "serif"],
                body: ["var(--font-body)", "system-ui", "sans-serif"],
                sans: ["var(--font-body)", "system-ui", "sans-serif"],
            },
            colors: {
                page: "hsl(var(--bg-page) / <alpha-value>)",
                surface: "hsl(var(--bg-surface) / <alpha-value>)",
                subtle: "hsl(var(--bg-subtle) / <alpha-value>)",
                accent: "hsl(var(--accent) / <alpha-value>)",
                border: {
                    DEFAULT: "hsl(var(--border) / <alpha-value>)",
                    strong: "hsl(var(--border-strong) / <alpha-value>)",
                    subtle: "hsl(var(--border-subtle) / <alpha-value>)",
                },
                text: {
                    primary: "hsl(var(--text-primary) / <alpha-value>)",
                    secondary: "hsl(var(--text-secondary) / <alpha-value>)",
                    muted: "hsl(var(--text-muted) / <alpha-value>)",
                    disabled: "hsl(var(--text-disabled) / <alpha-value>)",
                },
            },
            boxShadow: {
                xs: "var(--shadow-xs)",
                sm: "var(--shadow-sm)",
                md: "var(--shadow-md)",
                lg: "var(--shadow-lg)",
                xl: "var(--shadow-xl)",
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
                "2xl": "var(--radius-2xl)",
                full: "var(--radius-full)",
            },
            backgroundImage: {
                "gradient-page": "var(--gradient-page)",
                "gradient-surface": "var(--gradient-surface)",
                "stripe-texture": "var(--stripe-texture)",
            },
            keyframes: {
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(16px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "scale-in": {
                    "0%": { opacity: "0", transform: "scale(0.96)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                "slide-up": {
                    "0%": { opacity: "0", transform: "translateY(24px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                marquee: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                "marquee-reverse": {
                    "0%": { transform: "translateX(-50%)" },
                    "100%": { transform: "translateX(0)" },
                },
                "pulse-soft": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.5" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-6px)" },
                },
                "stripe-drift": {
                    "0%": { backgroundPosition: "0 0" },
                    "100%": { backgroundPosition: "40px 0" },
                },
            },
            animation: {
                "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "fade-up-slow": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "fade-in": "fade-in 0.5s ease forwards",
                "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "slide-up": "slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                marquee: "marquee 30s linear infinite",
                "marquee-reverse": "marquee-reverse 30s linear infinite",
                "pulse-soft": "pulse-soft 2.5s ease-in-out infinite",
                float: "float 4s ease-in-out infinite",
                "stripe-drift": "stripe-drift 8s linear infinite",
            },
        },
    },
    plugins: [],
};

export default config;
