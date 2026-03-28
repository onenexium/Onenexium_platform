"use server"

import { eq } from "drizzle-orm"

import { getDb } from "@/server/db/client"
import { users } from "@/server/db/schema"
import { hasAuthSecretEnv } from "@/features/auth/lib/auth-env"
import { hashPassword } from "@/server/auth/password"
import { signupSchema } from "@/features/auth/lib/auth-schemas"

export type SignupState = { error?: string; ok?: boolean }

export async function signupAction(_prev: SignupState, formData: FormData): Promise<SignupState> {
  if (!hasAuthSecretEnv()) {
    return {
      error: "Server auth is not configured (AUTH_SECRET or NEXTAUTH_SECRET).",
    }
  }

  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!parsed.success) {
    const first = parsed.error.issues[0]
    return { error: first?.message ?? "Invalid input" }
  }

  const email = parsed.data.email.toLowerCase()

  try {
    const existing = await getDb().select().from(users).where(eq(users.email, email)).limit(1)
    if (existing[0]) {
      return { error: "An account with this email already exists. Sign in instead." }
    }

    const passwordHash = await hashPassword(parsed.data.password)

    await getDb().insert(users).values({
      email,
      name: parsed.data.name,
      passwordHash,
    })

    return { ok: true }
  } catch {
    return { error: "Could not create account. Check the database connection (DATABASE_URL)." }
  }
}
