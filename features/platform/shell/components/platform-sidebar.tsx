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
} from "lucide-react"

import { routes } from "@/config/routes"
import { cn } from "@/shared/lib/utils"

function isHome(pathname: string) {
  return pathname === "/app" || pathname === "/app/"
}

function isProjects(pathname: string) {
  return pathname.startsWith(routes.platform.projects)
}

type PlatformSidebarProps = {
  /** Full width with labels; false = narrow icon rail (desktop only). */
  expanded: boolean
}

export function PlatformSidebar({ expanded }: PlatformSidebarProps) {
  const pathname = usePathname()
  const homeActive = isHome(pathname)
  const appsActive = isProjects(pathname)
  const rail = !expanded

  return (
    <aside
      id="platform-sidebar"
      className={cn(
        "hidden h-full min-h-0 shrink-0 overflow-y-auto border-r border-premium-border bg-premium-sidebar shadow-premium-sidebar",
        "transition-[width] duration-200 ease-premium motion-reduce:transition-none",
        "md:flex md:flex-col",
        expanded ? "md:w-[220px]" : "md:w-[56px]",
      )}
    >
      <div
        className={cn(
          "pb-4 pt-4",
          expanded ? "px-4" : "flex flex-col items-center gap-2 px-2 md:px-1.5",
        )}
      >
        <Link
          href={routes.platform.projects}
          title="Create new app"
          className={cn(
            "premium-focus flex items-center justify-center gap-2 rounded-xl bg-gradient-primary font-semibold text-primary-foreground shadow-md ring-1 ring-indigo-500/15 transition hover:-translate-y-px hover:opacity-95 hover:shadow-premium-primary-hover",
            expanded ? "w-full py-2.5 text-sm" : "h-10 w-10 md:size-10",
            rail && "shrink-0",
          )}
        >
          <Plus className="h-4 w-4 shrink-0" aria-hidden />
          <span className={cn(expanded ? "inline" : "sr-only")}>Create new app</span>
        </Link>

        <button
          type="button"
          title="Select an app"
          className={cn(
            "premium-focus flex items-center rounded-xl bg-premium-surface-2 text-sm text-premium-text-2 transition hover:bg-premium-surface-3",
            expanded
              ? "mt-3 w-full justify-between gap-2 px-3 py-2.5 text-left"
              : "mt-0 size-10 shrink-0 justify-center p-0 md:mt-0",
          )}
        >
          {expanded ? (
            <>
              <span className="truncate">Select an app</span>
              <ChevronDown className="h-4 w-4 shrink-0 text-premium-text-3" aria-hidden />
            </>
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0 text-premium-text-3" aria-hidden />
          )}
          {rail ? <span className="sr-only">Select an app</span> : null}
        </button>
      </div>

      <div className={cn("pt-1", expanded ? "px-3" : "flex flex-col items-center px-1.5")}>
        <nav className="flex flex-col gap-1" aria-label="Primary">
          <Link
            href={routes.platform.root}
            title="Home"
            className={cn(
              "premium-focus flex min-h-[42px] items-center rounded-xl text-[13px] font-medium transition-all duration-200 ease-premium",
              expanded ? "gap-2.5 px-3 py-2" : "size-10 justify-center p-0 md:size-10",
              homeActive
                ? "bg-premium-nav-pill text-premium-text shadow-sm"
                : "text-premium-text-2 hover:bg-premium-surface-2 hover:text-premium-text",
            )}
          >
            <Home
              className={cn("h-[18px] w-[18px] shrink-0", homeActive ? "text-premium-violet" : "text-premium-text-3")}
              aria-hidden
            />
            <span className={cn(expanded ? "inline" : "sr-only")}>Home</span>
          </Link>
          <Link
            href={routes.platform.projects}
            title="All apps"
            className={cn(
              "premium-focus flex min-h-[42px] items-center rounded-xl text-[13px] font-medium transition-all duration-200 ease-premium",
              expanded ? "gap-2.5 px-3 py-2" : "size-10 justify-center p-0 md:size-10",
              appsActive
                ? "bg-premium-nav-pill text-premium-text shadow-sm"
                : "text-premium-text-2 hover:bg-premium-surface-2 hover:text-premium-text",
            )}
          >
            <LayoutGrid
              className={cn("h-[18px] w-[18px] shrink-0", appsActive ? "text-premium-violet" : "text-premium-text-3")}
              aria-hidden
            />
            <span className={cn(expanded ? "inline" : "sr-only")}>All apps</span>
          </Link>
        </nav>
      </div>

      {expanded ? (
        <div className="px-3 pt-7">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-premium-text-3">
            Favorites
          </p>
          <div className="rounded-xl bg-premium-surface-2 px-4 py-5 text-center text-[13px] text-premium-text-3">
            No favorites
          </div>
        </div>
      ) : null}

      <div
        className={cn(
          "mt-auto flex flex-col gap-0.5 py-3",
          expanded ? "px-3" : "items-center px-1.5",
        )}
      >
        <a
          href="mailto:support@onenexium.com"
          title="Report an issue"
          className={cn(
            "premium-focus flex min-h-[38px] items-center rounded-lg text-[13px] text-premium-text-3 transition hover:bg-premium-surface-2 hover:text-premium-text-2",
            expanded ? "gap-2.5 px-3 py-1.5" : "size-10 justify-center p-0",
          )}
        >
          <LifeBuoy className="h-4 w-4 shrink-0" aria-hidden />
          <span className={cn(expanded ? "inline" : "sr-only")}>Report an issue</span>
        </a>
        <Link
          href={routes.marketing.about}
          title="Documentation"
          className={cn(
            "premium-focus flex min-h-[38px] items-center rounded-lg text-[13px] text-premium-text-3 transition hover:bg-premium-surface-2 hover:text-premium-text-2",
            expanded ? "gap-2.5 px-3 py-1.5" : "size-10 justify-center p-0",
          )}
        >
          <BookOpen className="h-4 w-4 shrink-0" aria-hidden />
          <span className={cn(expanded ? "inline" : "sr-only")}>Documentation</span>
        </Link>
        <Link
          href={routes.platform.settings}
          title="Settings"
          className={cn(
            "premium-focus flex min-h-[38px] items-center rounded-lg text-[13px] text-premium-text-3 transition hover:bg-premium-surface-2 hover:text-premium-text-2",
            expanded ? "gap-2.5 px-3 py-1.5" : "size-10 justify-center p-0",
          )}
        >
          <Settings className="h-4 w-4 shrink-0" aria-hidden />
          <span className={cn(expanded ? "inline" : "sr-only")}>Settings</span>
        </Link>
      </div>

      <div className={cn("pb-4", expanded ? "px-3" : "flex justify-center px-1.5")}>
        <button
          type="button"
          title="Account"
          className={cn(
            "premium-focus flex items-center rounded-xl bg-premium-surface-2 transition hover:bg-premium-surface-3",
            expanded ? "w-full gap-2.5 p-2.5 text-left" : "size-10 shrink-0 justify-center p-0",
          )}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-[11px] font-semibold text-primary-foreground shadow-md ring-1 ring-black/10"
            aria-hidden
          >
            AS
          </div>
          {expanded ? (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-premium-text">You</p>
                <p className="truncate text-xs text-premium-text-3">Workspace</p>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 text-premium-text-3" aria-hidden />
            </>
          ) : (
            <span className="sr-only">Account menu</span>
          )}
        </button>
      </div>
    </aside>
  )
}
