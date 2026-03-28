import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

import { authConfig } from "./auth.config"
import { getGoogleOAuthPair } from "@/features/auth/lib/auth-env"

const googlePair = getGoogleOAuthPair()
const googleProviders = googlePair
  ? [
      Google({
        clientId: googlePair.id,
        clientSecret: googlePair.secret,
      }),
    ]
  : []

const credentialsProvider = Credentials({
  id: "credentials",
  name: "Email and password",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  authorize: async (credentials) => {
    if (!credentials?.email || !credentials?.password) return null
    const { authorizeCredentialsUser } = await import("@/server/auth/authorize-credentials")
    return authorizeCredentialsUser({
      email: String(credentials.email),
      password: String(credentials.password),
    })
  },
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [...googleProviders, credentialsProvider],
})
