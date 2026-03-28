import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

import type { NextAuthConfig } from "next-auth"

const googleConfigured =
  Boolean(process.env.AUTH_GOOGLE_ID?.trim()) &&
  Boolean(process.env.AUTH_GOOGLE_SECRET?.trim())

const providers = googleConfigured
  ? [
      Google({
        clientId: process.env.AUTH_GOOGLE_ID!,
        clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      }),
    ]
  : []

export const authConfig = {
  trustHost: true,
  /** AUTH_SECRET / NEXTAUTH_SECRET read from env (including after SM bootstrap). */
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  providers,
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

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
