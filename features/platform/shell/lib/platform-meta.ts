import { routes } from "@/config/routes"

export type PlatformMeta = {
  title: string
  subtitle?: string
  /** Minimal top bar (credits + profile) — full-width hero on `/app` */
  headerVariant?: "standard" | "home"
}

export function resolvePlatformMeta(pathname: string): PlatformMeta {
  const normalized = pathname.replace(/\/$/, "") || "/"

  if (normalized === routes.platform.root) {
    return {
      title: "Home",
      headerVariant: "home",
    }
  }
  if (normalized.startsWith(routes.platform.projects)) {
    return { title: "Projects", subtitle: "Sites you are building" }
  }
  if (normalized.startsWith(routes.platform.domains)) {
    return { title: "Domains", subtitle: "Custom domains and DNS" }
  }
  if (normalized.startsWith(routes.platform.settings)) {
    return { title: "Settings", subtitle: "Workspace and brand" }
  }
  if (normalized.startsWith(routes.platform.notifications)) {
    return { title: "Notifications", subtitle: "Activity and alerts" }
  }

  return { title: "Platform" }
}
