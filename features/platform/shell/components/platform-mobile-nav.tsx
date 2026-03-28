"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  FolderKanban,
  Globe,
  Home,
  Settings,
} from "lucide-react"

import { routes } from "@/config/routes"
import { cn } from "@/shared/lib/utils"

type Tab = {
  href: string
  label: string
  icon: typeof FolderKanban
  rootOnly?: boolean
}

const tabs: Tab[] = [
  { href: routes.platform.root, label: "Home", icon: Home, rootOnly: true },
  { href: routes.platform.projects, label: "Apps", icon: FolderKanban },
  { href: routes.platform.domains, label: "Domains", icon: Globe },
  { href: routes.platform.notifications, label: "Alerts", icon: Bell },
  { href: routes.platform.settings, label: "More", icon: Settings },
]

function tabActive(pathname: string, href: string, rootOnly?: boolean) {
  if (rootOnly) return pathname === "/app" || pathname === "/app/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function PlatformMobileNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-premium-border bg-premium-surface/95 pb-safe shadow-[0_-1px_12px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:shadow-[0_-1px_12px_rgba(0,0,0,0.3)] md:hidden"
      aria-label="Primary"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-1 pt-1">
        {tabs.map(({ href, label, icon: Icon, rootOnly }) => {
          const active = tabActive(pathname, href, rootOnly)
          return (
            <li key={`${href}-${label}`} className="min-w-0 flex-1">
              <Link
                href={href}
                className={cn(
                  "premium-focus flex min-h-[48px] min-w-[44px] flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px] font-medium transition-colors duration-200 ease-premium",
                  active
                    ? "text-premium-violet dark:text-primary"
                    : "text-premium-text-3 hover:text-premium-text-2",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0",
                    active ? "text-premium-violet dark:text-primary" : "text-premium-text-3",
                  )}
                  aria-hidden
                />
                <span className="truncate">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
