"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { useCallback, useState } from "react"

import { cn } from "@/shared/lib/utils"
import { resolvePlatformMeta } from "../lib/platform-meta"
import { PlatformHeader } from "./platform-header"
import { PlatformMobileNav } from "./platform-mobile-nav"
import { PlatformSidebar } from "./platform-sidebar"

type PlatformFrameProps = {
  children: ReactNode
}

export function PlatformFrame({ children }: PlatformFrameProps) {
  const pathname = usePathname()
  const meta = resolvePlatformMeta(pathname)
  const headerVariant = meta.headerVariant ?? "standard"
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((o) => !o)
  }, [])

  return (
    <div className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-premium-bg font-sans text-premium-text">
      <PlatformHeader
        headerVariant={headerVariant}
        title={meta.title}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
        {...(meta.subtitle !== undefined ? { subtitle: meta.subtitle } : {})}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-row">
        <PlatformSidebar open={sidebarOpen} />
        <main
          className={cn(
            "animate-page-in min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-4 pb-28 pt-6 sm:px-6 sm:pb-8 md:pb-8 lg:px-10",
            headerVariant === "home" && "pt-2 sm:pt-4",
          )}
          id="platform-main"
        >
          {children}
        </main>
      </div>
      <PlatformMobileNav />
    </div>
  )
}
