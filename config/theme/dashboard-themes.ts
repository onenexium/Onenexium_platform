/**
 * Dashboard / admin semantic themes — mirrors `shared/styles/onenexium-dashboard-tokens.css`.
 * Use with `useTheme()` from next-themes for runtime logic; CSS variables drive UI.
 */
export const dashboardThemeLight = {
  colors: {
    bg: "#f4f6fd",
    surface: "#ffffff",
    surface2: "#eef0f8",
    surface3: "#e4e8f4",
    border: "#dde1f0",
    border2: "#c8cee8",
    blue: "#2563EB",
    blue2: "#3B82F6",
    blue3: "#1d4ed8",
    glow: "rgba(37, 99, 235, 0.12)",
    text: "#0E1330",
    text2: "#2D3452",
    text3: "#64748B",
    green: "#10B981",
    greenBg: "rgba(16, 185, 129, 0.12)",
    amber: "#F59E0B",
    amberBg: "rgba(245, 158, 11, 0.12)",
    red: "#EF4444",
    sky: "#0EA5E9",
    violet: "#7C3AED",
    white: "#FFFFFF",
  },
  gradients: {
    brand: "linear-gradient(135deg, #3D4EF0, #23A0FF)",
    primaryButton: "linear-gradient(135deg, #1A3BDB, #2563EB)",
    primaryButtonHover: "linear-gradient(135deg, #1e45f5, #2D6FE8)",
    avatar: "linear-gradient(135deg, #3D4EF0, #23A0FF)",
    previewPage:
      "linear-gradient(160deg, #f8f9fd 0%, #eef2ff 60%, #f4f6fd 100%)",
    previewHeroText: "linear-gradient(90deg, #2563EB, #6366F1)",
  },
  preview: {
    canvasBg: "#FFFFFF",
    sectionBg: "#F8FAFF",
    cardBorder: "#E8ECF4",
    cardText: "#1E293B",
    cardMuted: "#94A3B8",
    chromeBg: "#F1F5F9",
    badgeText: "#2563EB",
  },
  motion: {
    ease: "cubic-bezier(0.16, 1, 0.3, 1)" as const,
  },
  nav: {
    activeBg: "rgba(37, 99, 235, 0.1)",
    activeBorder: "rgba(37, 99, 235, 0.28)",
  },
  font: {
    sans: "'Outfit', ui-sans-serif, system-ui, sans-serif",
    heading: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif",
    mono: "'DM Mono', ui-monospace, monospace",
  },
  radii: {
    shell: "16px",
    card: "14px",
    stat: "12px",
    button: "9px",
    navItem: "9px",
    iconButton: "8px",
    pill: "100px",
  },
  shadows: {
    primaryButtonHover: "0 4px 20px rgba(37, 99, 235, 0.22)",
  },
} as const

/** Dark — docs/onenexium_premium_ui (1).html */
export const dashboardThemeDark = {
  colors: {
    bg: "#080C14",
    surface: "#0E1420",
    surface2: "#141C2E",
    surface3: "#1A2338",
    border: "#1E2D47",
    border2: "#253450",
    blue: "#2563EB",
    blue2: "#3B82F6",
    blue3: "#60A5FA",
    glow: "rgba(37, 99, 235, 0.15)",
    text: "#F0F4FF",
    text2: "#8899BB",
    text3: "#4A5E82",
    green: "#10B981",
    greenBg: "rgba(16, 185, 129, 0.1)",
    amber: "#F59E0B",
    amberBg: "rgba(245, 158, 11, 0.1)",
    red: "#EF4444",
    sky: "#38BDF8",
    violet: "#8B5CF6",
    white: "#FFFFFF",
  },
  gradients: {
    brand: "linear-gradient(135deg, #1A3BDB, #3CA3F5)",
    primaryButton: "linear-gradient(135deg, #1A3BDB, #2563EB)",
    primaryButtonHover: "linear-gradient(135deg, #1e45f5, #2D6FE8)",
    avatar: "linear-gradient(135deg, #1A3BDB, #3CA3F5)",
    previewPage:
      "linear-gradient(160deg, #0B1628 0%, #0F1F3D 60%, #091428 100%)",
    previewHeroText: "linear-gradient(90deg, #60A5FA, #818CF8)",
  },
  preview: {
    canvasBg: "#FFFFFF",
    sectionBg: "#F8FAFF",
    cardBorder: "#E8ECF4",
    cardText: "#1E293B",
    cardMuted: "#94A3B8",
    chromeBg: "#0B1628",
    badgeText: "#93C5FD",
  },
  motion: {
    ease: "cubic-bezier(0.16, 1, 0.3, 1)" as const,
  },
  font: {
    sans: "'Outfit', ui-sans-serif, system-ui, sans-serif",
    heading: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif",
    mono: "'DM Mono', ui-monospace, monospace",
  },
  radii: {
    shell: "16px",
    card: "14px",
    stat: "12px",
    button: "9px",
    navItem: "9px",
    iconButton: "8px",
    pill: "100px",
  },
  shadows: {
    primaryButtonHover: "0 4px 20px rgba(37, 99, 235, 0.35)",
  },
  nav: {
    activeBg: "rgba(37, 99, 235, 0.12)",
    activeBorder: "rgba(37, 99, 235, 0.2)",
  },
} as const

export const dashboardThemes = {
  light: dashboardThemeLight,
  dark: dashboardThemeDark,
} as const

export type DashboardThemeMode = keyof typeof dashboardThemes

/** @deprecated Prefer `dashboardThemeDark` or `dashboardThemes.dark` */
export const onenexiumPremiumTheme = dashboardThemeDark
export type OnenexiumPremiumTheme = typeof dashboardThemeDark
