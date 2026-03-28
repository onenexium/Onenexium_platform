import { routes } from "@/config/routes"

/**
 * After Auth.js `signIn({ redirect: false })`, `res.url` can be an absolute URL built from
 * `AUTH_URL` / `NEXTAUTH_URL`. If those still point at localhost while users hit production,
 * pushing `res.url` sends them to the wrong host. We always navigate on the **current** origin
 * using only path + query + hash (open-redirect safe for `//evil.com`).
 */
export function postLoginRedirectPath(
  urlOrPath: string | null | undefined,
  fallback: string = routes.platform.root,
): string {
  if (!urlOrPath) return fallback
  const t = urlOrPath.trim()
  if (t.startsWith("//")) return fallback
  if (t.startsWith("/") && !t.startsWith("//")) {
    return t
  }
  try {
    const u = new URL(t)
    const path = `${u.pathname}${u.search}${u.hash}`
    return path.length > 0 ? path : fallback
  } catch {
    return fallback
  }
}
