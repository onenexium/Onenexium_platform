import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "./schema"

type Db = PostgresJsDatabase<typeof schema>

declare global {
  var __onenexium_postgres: ReturnType<typeof postgres> | undefined
  var __onenexium_drizzle: Db | undefined
}

function getDb(): Db {
  const url = process.env.DATABASE_URL
  if (!url?.trim()) {
    throw new Error(
      "DATABASE_URL is missing. Set it in .env or load from AWS Secrets Manager before using the DB.",
    )
  }

  if (!globalThis.__onenexium_postgres) {
    const options =
      url.includes("rds.amazonaws.com") || process.env.DATABASE_SSL === "require"
        ? ({ max: 10, prepare: false, ssl: "require" } as const)
        : ({ max: 10, prepare: false } as const)
    globalThis.__onenexium_postgres = postgres(url, options)
  }

  if (!globalThis.__onenexium_drizzle) {
    globalThis.__onenexium_drizzle = drizzle(globalThis.__onenexium_postgres, {
      schema,
    })
  }

  return globalThis.__onenexium_drizzle
}

/**
 * Singleton Postgres + Drizzle client for the Node.js server (route handlers, server actions).
 * Do not import from Edge middleware.
 */
export const db = getDb()

export { schema }
