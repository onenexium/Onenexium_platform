/**
 * Pure process.env reads — safe for Edge (middleware) and Node (pages, actions).
 */

export function hasAuthSecretEnv(): boolean {
  return Boolean(
    process.env.AUTH_SECRET?.trim() || process.env.NEXTAUTH_SECRET?.trim(),
  )
}

export function getGoogleOAuthPair(): { id: string; secret: string } | null {
  const id =
    process.env.AUTH_GOOGLE_ID?.trim() || process.env.GOOGLE_CLIENT_ID?.trim()
  const secret =
    process.env.AUTH_GOOGLE_SECRET?.trim() ||
    process.env.GOOGLE_CLIENT_SECRET?.trim()
  if (!id || !secret) return null
  return { id, secret }
}

export function getAuthEnvFlags() {
  return {
    secretReady: hasAuthSecretEnv(),
    databaseReady: Boolean(process.env.DATABASE_URL?.trim()),
    googleReady: getGoogleOAuthPair() !== null,
  }
}

export function canUseEmailAuth(flags = getAuthEnvFlags()) {
  return flags.secretReady && flags.databaseReady
}

export function canUseGoogleAuth(flags = getAuthEnvFlags()) {
  return flags.secretReady && flags.googleReady
}

export function canSignIn(flags = getAuthEnvFlags()) {
  return flags.secretReady && (flags.databaseReady || flags.googleReady)
}

export function canSignUp(flags = getAuthEnvFlags()) {
  return flags.secretReady && flags.databaseReady
}
