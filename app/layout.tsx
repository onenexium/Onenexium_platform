import type { Metadata } from 'next'
import { playfair, inter } from '@/shared/lib/fonts'
import { ThemeProvider } from '@/shared/providers/theme-provider'
import { siteConfig } from '@/config/site'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

import { TooltipProvider } from '@/shared/components/ui/tooltip'
import { AnnouncementBar } from '@/features/navigation/components/navbar-announcement-bar'
import { Navbar } from '@/features/navigation/components/navbar'
import { Footer } from '@/features/footer/components/footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="flex flex-col min-h-screen">
              <AnnouncementBar />
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
