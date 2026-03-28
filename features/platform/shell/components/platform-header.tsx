"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, ExternalLink, Search, User, Zap } from "lucide-react"

import { routes } from "@/config/routes"
import { ThemeToggle } from "@/shared/components/theme-toggle"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

type PlatformHeaderProps = {
  title: string
  subtitle?: string
  headerVariant?: "standard" | "home"
}

function breadcrumbFromPath(pathname: string): string {
  const parts = pathname.replace(/\/$/, "").split("/").filter(Boolean)
  if (parts.length === 0) return "app"
  return parts.join(" · ")
}

export function PlatformHeader({
  title,
  subtitle,
  headerVariant = "standard",
}: PlatformHeaderProps) {
  const pathname = usePathname()
  const trail = breadcrumbFromPath(pathname)

  if (headerVariant === "home") {
    return (
      <header className="sticky top-0 z-30 flex min-h-[52px] shrink-0 items-center justify-end gap-2 border-b border-premium-border px-4 py-2 sm:gap-3 sm:px-6 bg-premium-topbar-bg backdrop-blur-xl">
        <div className="flex items-center gap-1.5 rounded-full bg-premium-surface-2 px-3 py-1.5 text-sm text-premium-text-2">
          <Zap className="h-4 w-4 shrink-0 text-amber-500" aria-hidden />
          <span className="font-medium tabular-nums text-premium-text">15.0</span>
          <span className="sr-only">credits</span>
        </div>
        <button
          type="button"
          className="premium-focus hidden h-8 items-center justify-center rounded-full bg-premium-violet px-4 text-sm font-semibold text-white shadow-md ring-1 ring-violet-600/25 transition hover:brightness-105 sm:inline-flex"
        >
          Buy credits
        </button>
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-md ring-1 ring-indigo-500/20"
          aria-hidden
        >
          <User className="h-4 w-4" strokeWidth={2} />
        </div>
        <ThemeToggle compact className="text-premium-text-3 hover:text-premium-text [&_svg]:text-current" />
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-30 flex min-h-[52px] shrink-0 flex-wrap items-center gap-3 border-b border-premium-border px-4 py-2 sm:px-6 bg-premium-topbar-bg backdrop-blur-xl">
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.08em] text-premium-text-3 sm:block sm:max-w-[40%] lg:max-w-none">
          {trail}
        </p>
        <div className="min-w-0">
          <h1 className="font-heading text-xl font-semibold leading-tight tracking-[-0.035em] text-premium-text">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-[13px] leading-snug text-premium-text-3">{subtitle}</p>
          ) : null}
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <div className="relative hidden min-w-0 md:block md:max-w-[200px] lg:max-w-xs">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-premium-text-3"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search…"
            className={cn(
              "premium-focus h-9 w-full rounded-xl border border-premium-border bg-premium-surface-2 pl-9 pr-3 text-sm text-premium-text placeholder:text-premium-text-3 outline-none transition",
              "focus:ring-2 focus:ring-premium-violet/20 focus:border-premium-violet/30",
            )}
            aria-label="Search workspace"
          />
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="premium-focus relative h-10 w-10 shrink-0 text-premium-text-3 hover:bg-premium-surface-2 hover:text-premium-text-2"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-premium-red ring-2 ring-premium-surface" />
        </Button>

        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-md ring-1 ring-indigo-500/20"
          aria-hidden
        >
          <User className="h-4 w-4" strokeWidth={2} />
        </div>

        <ThemeToggle compact className="text-premium-text-3 hover:text-premium-text [&_svg]:text-current" />

        <Link
          href={routes.marketing.home}
          className="hidden items-center gap-1.5 text-xs font-medium text-premium-text-3 transition-colors duration-200 ease-premium hover:text-premium-text lg:inline-flex"
        >
          Site
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </header>
  )
}
