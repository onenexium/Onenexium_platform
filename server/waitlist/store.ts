import fs from "fs/promises"
import path from "path"

export type WaitlistEntryInput = {
  name: string
  email: string
  message?: string
}

export type WaitlistEntry = WaitlistEntryInput & {
  id: string
  createdAt: string
}

const dataDir = path.join(process.cwd(), "data")
const filePath = path.join(dataDir, "waitlist.json")

async function ensureStoreExists() {
  await fs.mkdir(dataDir, { recursive: true })

  try {
    await fs.access(filePath)
  } catch {
    await fs.writeFile(filePath, "[]", "utf8")
  }
}

export async function getWaitlistEntries(): Promise<WaitlistEntry[]> {
  await ensureStoreExists()

  try {
    const raw = await fs.readFile(filePath, "utf8")
    const parsed = JSON.parse(raw) as unknown

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed as WaitlistEntry[]
  } catch {
    return []
  }
}

export async function saveWaitlistEntry(
  input: WaitlistEntryInput,
): Promise<WaitlistEntry> {
  await ensureStoreExists()

  const entries = await getWaitlistEntries()

  const entry: WaitlistEntry = {
    ...input,
    id: typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  }

  entries.push(entry)

  await fs.writeFile(filePath, JSON.stringify(entries, null, 2), "utf8")

  return entry
}
