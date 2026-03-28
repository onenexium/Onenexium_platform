import type { Metadata, Viewport } from "next"

import { siteConfig } from "@/config/site"
import { PwaRegister } from "@/features/pwa"
import { bricolageGrotesque, dmMono, outfit } from "@/shared/lib/fonts"
import { AuthProvider } from "@/shared/providers/auth-provider"
import { ThemeProvider } from "@/shared/providers/theme-provider"
import { TooltipProvider } from "@/shared/components/ui/tooltip"

import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6fd" },
    { media: "(prefers-color-scheme: dark)", color: "#080c14" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${bricolageGrotesque.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh] min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <TooltipProvider>
              {children}
              <PwaRegister />
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
