/**
 * Drizzle ORM lists @prisma/client as an optional peer; npm may still install it.
 * This project uses postgres.js only — remove Prisma packages after install.
 */
const fs = require("node:fs")
const path = require("node:path")

const root = path.join(__dirname, "..")
for (const rel of ["node_modules/@prisma", "node_modules/prisma"]) {
  const target = path.join(root, rel)
  try {
    fs.rmSync(target, { recursive: true, force: true })
  } catch {
    /* ignore */
  }
}
