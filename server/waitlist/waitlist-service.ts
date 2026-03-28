import { z } from "zod"

import {
  saveWaitlistEntry,
  getWaitlistEntries,
} from "@/shared/lib/waitlist-store"

export const waitlistSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().max(1000).optional(),
})

export type WaitlistPayload = z.infer<typeof waitlistSchema>

export async function createWaitlistEntryFromRequest(request: Request) {
  const json: unknown = await request.json()
  const data = waitlistSchema.parse(json)
  const entry = await saveWaitlistEntry({
    name: data.name,
    email: data.email,
    ...(data.message !== undefined && data.message !== "" && { message: data.message }),
  })
  return entry
}

export async function listWaitlistEntries() {
  return getWaitlistEntries()
}
