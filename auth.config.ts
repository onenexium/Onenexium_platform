import type { NextAuthConfig } from "next-auth"

/**
 * Edge-safe Auth.js config — no OAuth providers here (avoids build-time / Edge env issues).
 * Real providers live in `auth.ts` (Node). Middleware only needs callbacks + same AUTH_SECRET.
 */
export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname

      if (pathname.startsWith("/api/")) {
        return true
      }

      if (pathname.startsWith("/app") || pathname.startsWith("/admin")) {
        return !!auth?.user
      }

      return true
    },
    jwt({ token, user, profile }) {
      if (user?.id) token.sub = user.id
      if (typeof profile?.sub === "string" && profile.sub) token.sub = profile.sub
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? ""
      }
      return session
    },
  },
} satisfies NextAuthConfig
