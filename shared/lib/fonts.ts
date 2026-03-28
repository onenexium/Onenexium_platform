import { Bricolage_Grotesque, DM_Mono, Outfit } from "next/font/google"

/**
 * Default UI / body — Outfit (`--font-outfit`).
 * Stack: Outfit → ui-sans-serif → system-ui → sans-serif (via Tailwind `font-sans`).
 */
export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
})

/**
 * Headings and display type — Bricolage Grotesque (`--font-bricolage`).
 * Use Tailwind `font-heading` or `font-display`; base `h1`–`h3` use this in `globals.css`.
 */
export const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
})

/** Monospace — code, URLs, technical strings (`--font-mono`). */
export const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})
