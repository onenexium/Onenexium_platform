"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, ExternalLink, PanelLeft, PanelLeftClose, Search, User, Zap } from "lucide-react"

import { routes } from "@/config/routes"
import { siteConfig } from "@/config/site"
import { ThemeToggle } from "@/shared/components/theme-toggle"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

type PlatformHeaderProps = {
  title: string
  subtitle?: string
  headerVariant?: "standard" | "home"
  /** Desktop sidebar visibility; toggle lives in the header only. */
  sidebarOpen?: boolean
  onToggleSidebar?: () => void
}

function breadcrumbFromPath(pathname: string): string {
  const parts = pathname.replace(/\/$/, "").split("/").filter(Boolean)
  if (parts.length === 0) return "app"
  return parts.join(" · ")
}

function PlatformBrandingAndSidebarToggle({
  sidebarOpen,
  onToggleSidebar,
}: {
  sidebarOpen: boolean
  onToggleSidebar?: () => void
}) {
  return (
    <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2">
      <Link
        href={routes.platform.root}
        className="premium-focus flex min-w-0 items-center gap-2 rounded-lg transition-opacity hover:opacity-90 sm:gap-2.5"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-primary shadow-md ring-1 ring-black/5">
          <Zap className="h-4 w-4 text-white" aria-hidden />
        </div>
        <span className="font-heading max-w-[7.5rem] truncate text-[14px] font-semibold tracking-[-0.03em] text-premium-text sm:max-w-[10rem] sm:text-[15px] lg:max-w-none">
          {siteConfig.name}
        </span>
      </Link>
      {onToggleSidebar ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="premium-focus hidden h-9 w-9 shrink-0 text-premium-text-3 hover:bg-premium-surface-2 hover:text-premium-text-2 md:inline-flex"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={sidebarOpen}
          aria-controls="platform-sidebar"
          onClick={onToggleSidebar}
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" aria-hidden />
          ) : (
            <PanelLeft className="h-5 w-5" aria-hidden />
          )}
        </Button>
      ) : null}
    </div>
  )
}

export function PlatformHeader({
  title,
  subtitle,
  headerVariant = "standard",
  sidebarOpen = true,
  onToggleSidebar,
}: PlatformHeaderProps) {
  const pathname = usePathname()
  const trail = breadcrumbFromPath(pathname)

  if (headerVariant === "home") {
    return (
      <header className="z-30 flex min-h-[52px] shrink-0 items-center gap-2 border-b border-premium-border bg-premium-topbar-bg px-4 py-2 backdrop-blur-xl sm:gap-3 sm:px-6">
        <PlatformBrandingAndSidebarToggle
          sidebarOpen={sidebarOpen}
          {...(onToggleSidebar !== undefined ? { onToggleSidebar } : {})}
        />
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
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
        </div>
      </header>
    )
  }

  return (
    <header className="z-30 flex min-h-[52px] shrink-0 flex-wrap items-center gap-3 border-b border-premium-border bg-premium-topbar-bg px-4 py-2 backdrop-blur-xl sm:px-6">
      <PlatformBrandingAndSidebarToggle
        sidebarOpen={sidebarOpen}
        {...(onToggleSidebar !== undefined ? { onToggleSidebar } : {})}
      />
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
