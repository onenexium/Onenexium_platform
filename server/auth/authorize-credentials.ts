import { eq } from "drizzle-orm"

import { getDb } from "@/server/db/client"
import { users } from "@/server/db/schema"

import { verifyPassword } from "./password"

export async function authorizeCredentialsUser(input: {
  email: string
  password: string
}): Promise<{ id: string; email: string; name?: string | null; image?: string | null } | null> {
  const email = input.email.trim().toLowerCase()
  if (!email || !input.password) return null

  const rows = await getDb().select().from(users).where(eq(users.email, email)).limit(1)
  const row = rows[0]
  if (!row?.passwordHash) return null

  const ok = await verifyPassword(input.password, row.passwordHash)
  if (!ok) return null

  return {
    id: row.id,
    email: row.email,
    name: row.name,
    image: row.image,
  }
}
