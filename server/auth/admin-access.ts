/**
 * When AUTH_ADMIN_EMAILS is unset or empty, any signed-in user may open /admin (dev/staging).
 * In production, set comma-separated allowlisted emails in env or Secrets Manager.
 */
export function isAdminViewer(email: string | null | undefined): boolean {
  const raw = process.env.AUTH_ADMIN_EMAILS?.trim()
  if (!raw) return true

  const allowed = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)

  if (allowed.length === 0) return true
  if (!email) return false
  return allowed.includes(email.toLowerCase())
}
