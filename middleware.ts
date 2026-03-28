import { NextResponse } from "next/server"

import { auth } from "@/auth"

function applySecurityHeaders(response: NextResponse) {
  response.headers.set("X-DNS-Prefetch-Control", "on")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("X-Frame-Options", "SAMEORIGIN")
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  )
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload",
    )
  }
  return response
}

/**
 * Auth.js session + security headers. API routes rely on their own checks (e.g. Bearer keys).
 * Secrets Manager hydrates process.env in instrumentation (Node) before the server accepts traffic.
 */
export default auth(() => applySecurityHeaders(NextResponse.next()))

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons/|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
}
