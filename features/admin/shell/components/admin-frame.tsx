import type { ReactNode } from "react"
import Link from "next/link"

import { routes } from "@/config/routes"
import { siteConfig } from "@/config/site"
import { ThemeToggle } from "@/shared/components/theme-toggle"

type AdminFrameProps = {
  children: ReactNode
}

export function AdminFrame({ children }: AdminFrameProps) {
  return (
    <div className="min-h-screen bg-premium-bg font-sans text-premium-text">
      <header className="border-b border-premium-border bg-premium-surface">
        <div className="section-container flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-premium-amber">
              Admin
            </span>
            <span className="font-heading text-sm font-medium text-premium-text-2">{siteConfig.name}</span>
          </div>
          <nav className="flex items-center gap-3 text-sm">
            <ThemeToggle compact />
            <Link
              href={routes.admin.root}
              className="text-premium-text-2 transition-colors duration-200 ease-premium hover:text-premium-text"
            >
              Waitlist
            </Link>
            <Link
              href={routes.marketing.home}
              className="text-premium-text-3 transition-colors duration-200 ease-premium hover:text-premium-text-2"
            >
              Exit to site
            </Link>
          </nav>
        </div>
      </header>
      <div className="section-container px-4 py-8 sm:px-6 sm:py-10 lg:px-8">{children}</div>
    </div>
  )
}
