"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

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

  return (
    <div className="flex min-h-[100dvh] min-h-screen bg-premium-bg font-sans text-premium-text">
      <PlatformSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <PlatformHeader
          headerVariant={headerVariant}
          title={meta.title}
          {...(meta.subtitle !== undefined ? { subtitle: meta.subtitle } : {})}
        />
        <main
          className={cn(
            "animate-page-in flex-1 overflow-x-hidden overflow-y-auto px-4 pb-28 pt-6 sm:px-6 sm:pb-8 md:pb-8 lg:px-10",
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
