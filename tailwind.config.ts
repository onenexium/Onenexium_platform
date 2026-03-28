import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./features/**/*.{js,ts,jsx,tsx,mdx}",
        "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                /** Body / UI — Outfit */
                sans: [
                    "var(--font-outfit)",
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                ],
                body: [
                    "var(--font-outfit)",
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                ],
                /** Headlines — Bricolage Grotesque (`font-heading`, `font-display`) */
                heading: [
                    "var(--font-bricolage)",
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                ],
                display: [
                    "var(--font-bricolage)",
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                ],
                mono: ["var(--font-mono)", "ui-monospace", "monospace"],
            },
            colors: {
                /* OneNexium brand */
                indigo: { DEFAULT: "#3D4EF0", hover: "#3241CC" },
                /* OneNexium surface aliases — CSS-var-aware for light/dark */
                page: {
                    DEFAULT: "var(--bg-page)",
                    bg: "var(--bg-page)",
                    surface: "var(--bg-surface)",
                },
                surface: "var(--bg-surface)",
                subtle: "var(--bg-subtle)",
                muted: "var(--bg-muted)",
                /* Text aliases — CSS-var-aware for light/dark */
                content: {
                    primary: "var(--foreground)",
                    body: "var(--text-body)",
                    muted: "var(--muted-foreground)",
                },
                text: {
                    primary: "var(--foreground)",
                    secondary: "var(--text-body)",
                    body: "var(--text-body)",
                    muted: "var(--muted-foreground)",
                    disabled: "var(--muted-foreground)",
                    inverse: "var(--primary-foreground)",
                },
                border: {
                    DEFAULT: "var(--border)",
                    strong: "var(--border-strong)",
                    subtle: "var(--border-subtle)",
                },
                status: {
                    success: "var(--success)",
                    error: "var(--error)",
                    warning: "var(--warning)",
                    info: "var(--info)",
                },
                /* Semantic (shadcn + existing classes) — all var-driven */
                accent: { DEFAULT: "var(--accent)", hover: "var(--accent-hover)" },
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "var(--primary)",
                "primary-foreground": "var(--primary-foreground)",
                secondary: "var(--secondary)",
                "secondary-foreground": "var(--secondary-foreground)",
                "muted-foreground": "var(--muted-foreground)",
                "accent-subtle": "var(--accent-subtle)",
                "accent-foreground": "var(--accent-foreground)",
                destructive: "var(--destructive)",
                "destructive-foreground": "var(--destructive-foreground)",
                card: "var(--card)",
                "card-foreground": "var(--card-foreground)",
                ring: "var(--ring)",
                input: "var(--input)",
                overlay: "var(--overlay)",
                success: "var(--success)",
                "success-subtle": "var(--success-subtle)",
                /**
                 * Dashboard tokens — `shared/styles/onenexium-dashboard-tokens.css`.
                 * `--nx-*` on `:root` (light) and `html.dark` (dark); use with next-themes.
                 */
                premium: {
                    bg: "var(--nx-bg)",
                    surface: "var(--nx-surface)",
                    "surface-2": "var(--nx-surface-2)",
                    "surface-3": "var(--nx-surface-3)",
                    border: "var(--nx-border)",
                    "border-2": "var(--nx-border-2)",
                    blue: "var(--nx-blue)",
                    "blue-2": "var(--nx-blue-2)",
                    "blue-3": "var(--nx-blue-3)",
                    text: "var(--nx-text)",
                    "text-2": "var(--nx-text-2)",
                    "text-3": "var(--nx-text-3)",
                    green: "var(--nx-green)",
                    "green-bg": "var(--nx-green-bg)",
                    amber: "var(--nx-amber)",
                    "amber-bg": "var(--nx-amber-bg)",
                    red: "var(--nx-red)",
                    sky: "var(--nx-sky)",
                    violet: "var(--nx-violet)",
                    "topbar-bg": "var(--nx-topbar-bg)",
                    "nav-active": "var(--nx-nav-active-bg)",
                    "nav-active-border": "var(--nx-nav-active-border)",
                    sidebar: "var(--nx-sidebar-bg)",
                    "nav-pill": "var(--nx-nav-pill-bg)",
                },
            },
            backgroundImage: {
                "gradient-primary": "linear-gradient(135deg, #3D4EF0, #23A0FF)",
            },
            boxShadow: {
                xs: "var(--shadow-xs)",
                sm: "var(--shadow-sm)",
                md: "var(--shadow-md)",
                lg: "var(--shadow-lg)",
                xl: "var(--shadow-xl)",
                "premium-card": "var(--nx-card-shadow)",
                "premium-card-hover": "var(--nx-card-shadow-hover)",
                "premium-composer": "var(--nx-composer-shadow)",
                "premium-sidebar": "var(--nx-sidebar-shadow)",
                "premium-primary-hover": "var(--nx-shadow-primary-hover)",
            },
            transitionTimingFunction: {
                premium: "cubic-bezier(0.16, 1, 0.3, 1)",
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
                "2xl": "var(--radius-2xl)",
                full: "var(--radius-full)",
            },
            maxWidth: {
                container: "var(--container-max)",
                content: "65ch",
            },
            spacing: {
                "section-gap": "var(--section-gap)",
                "section-py": "var(--section-py)",
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
                "page-in": {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "card-in": {
                    "0%": { opacity: "0", transform: "translateY(8px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "stat-in": {
                    "0%": { opacity: "0", transform: "translateY(8px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "pulse-dot": {
                    "0%, 100%": { opacity: "1", transform: "scale(1)" },
                    "50%": { opacity: "0.4", transform: "scale(0.7)" },
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
                "page-in": "page-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "card-in": "card-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "stat-in": "stat-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "pulse-dot": "pulse-dot 1.4s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};

export default config;
