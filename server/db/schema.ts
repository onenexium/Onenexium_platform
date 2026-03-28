import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

/**
 * Platform relational model — extend with domains, projects, etc.
 * Starter `users` table for future account/session linkage (Auth.js can stay JWT-only).
 */
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

export type UserRow = typeof users.$inferSelect
export type NewUserRow = typeof users.$inferInsert
