"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  ChevronDown,
  Home,
  LayoutGrid,
  LifeBuoy,
  Plus,
  Settings,
  Zap,
} from "lucide-react"

import { routes } from "@/config/routes"
import { siteConfig } from "@/config/site"
import { cn } from "@/shared/lib/utils"

function isHome(pathname: string) {
  return pathname === "/app" || pathname === "/app/"
}

function isProjects(pathname: string) {
  return pathname.startsWith(routes.platform.projects)
}

export function PlatformSidebar() {
  const pathname = usePathname()
  const homeActive = isHome(pathname)
  const appsActive = isProjects(pathname)

  return (
    <aside
      className={cn(
        "hidden w-[220px] shrink-0 flex-col md:flex",
        "bg-premium-sidebar border-r border-premium-border shadow-premium-sidebar",
      )}
    >
      <div className="px-4 pt-5 pb-4">
        <Link
          href={routes.platform.root}
          className="flex items-center gap-2.5 rounded-lg transition-opacity hover:opacity-90"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-primary shadow-md ring-1 ring-black/5">
            <Zap className="h-4 w-4 text-white" aria-hidden />
          </div>
          <span className="font-heading text-[15px] font-semibold tracking-[-0.03em] text-premium-text">
            {siteConfig.name}
          </span>
        </Link>

        <Link
          href={routes.platform.projects}
          className="premium-focus mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-md ring-1 ring-indigo-500/15 transition hover:-translate-y-px hover:opacity-95 hover:shadow-premium-primary-hover"
        >
          <Plus className="h-4 w-4 shrink-0" aria-hidden />
          Create new app
        </Link>

        <button
          type="button"
          className="premium-focus mt-3 flex w-full items-center justify-between gap-2 rounded-xl bg-premium-surface-2 px-3 py-2.5 text-left text-sm text-premium-text-2 transition hover:bg-premium-surface-3"
        >
          <span className="truncate">Select an app</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-premium-text-3" aria-hidden />
        </button>
      </div>

      <div className="px-3 pt-1">
        <nav className="flex flex-col gap-1" aria-label="Primary">
          <Link
            href={routes.platform.root}
            className={cn(
              "premium-focus flex min-h-[42px] items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium transition-all duration-200 ease-premium",
              homeActive
                ? "bg-premium-nav-pill text-premium-text shadow-sm"
                : "text-premium-text-2 hover:bg-premium-surface-2 hover:text-premium-text",
            )}
          >
            <Home
              className={cn("h-[18px] w-[18px] shrink-0", homeActive ? "text-premium-violet" : "text-premium-text-3")}
              aria-hidden
            />
            Home
          </Link>
          <Link
            href={routes.platform.projects}
            className={cn(
              "premium-focus flex min-h-[42px] items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium transition-all duration-200 ease-premium",
              appsActive
                ? "bg-premium-nav-pill text-premium-text shadow-sm"
                : "text-premium-text-2 hover:bg-premium-surface-2 hover:text-premium-text",
            )}
          >
            <LayoutGrid
              className={cn("h-[18px] w-[18px] shrink-0", appsActive ? "text-premium-violet" : "text-premium-text-3")}
              aria-hidden
            />
            All apps
          </Link>
        </nav>
      </div>

      <div className="px-3 pt-7">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-premium-text-3">
          Favorites
        </p>
        <div className="rounded-xl bg-premium-surface-2 px-4 py-5 text-center text-[13px] text-premium-text-3">
          No favorites
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-0.5 px-3 py-3">
        <a
          href="mailto:support@onenexium.com"
          className="premium-focus flex min-h-[38px] items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13px] text-premium-text-3 transition hover:bg-premium-surface-2 hover:text-premium-text-2"
        >
          <LifeBuoy className="h-4 w-4 shrink-0" aria-hidden />
          Report an issue
        </a>
        <Link
          href={routes.marketing.about}
          className="premium-focus flex min-h-[38px] items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13px] text-premium-text-3 transition hover:bg-premium-surface-2 hover:text-premium-text-2"
        >
          <BookOpen className="h-4 w-4 shrink-0" aria-hidden />
          Documentation
        </Link>
        <Link
          href={routes.platform.settings}
          className="premium-focus flex min-h-[38px] items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13px] text-premium-text-3 transition hover:bg-premium-surface-2 hover:text-premium-text-2"
        >
          <Settings className="h-4 w-4 shrink-0" aria-hidden />
          Settings
        </Link>
      </div>

      <div className="px-3 pb-4">
        <button
          type="button"
          className="premium-focus flex w-full items-center gap-2.5 rounded-xl bg-premium-surface-2 p-2.5 text-left transition hover:bg-premium-surface-3"
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-[11px] font-semibold text-primary-foreground shadow-md ring-1 ring-black/10"
            aria-hidden
          >
            AS
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-premium-text">You</p>
            <p className="truncate text-xs text-premium-text-3">Workspace</p>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 text-premium-text-3" aria-hidden />
        </button>
      </div>
    </aside>
  )
}
