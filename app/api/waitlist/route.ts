import { NextResponse } from "next/server"
import { z } from "zod"

import {
  createWaitlistEntryFromRequest,
  listWaitlistEntries,
} from "@/server/waitlist"
import { notifyWaitlistSignup } from "@/server/waitlist/waitlist-notify"

function waitlistReadAuthorized(request: Request): boolean {
  const key =
    process.env.ADMIN_API_KEY?.trim() ||
    process.env.WAITLIST_ADMIN_SECRET?.trim()
  if (!key) return true
  const auth = request.headers.get("authorization")
  return auth === `Bearer ${key}`
}

export async function POST(request: Request) {
  try {
    const entry = await createWaitlistEntryFromRequest(request)

    await notifyWaitlistSignup(entry)

    return NextResponse.json(
      { success: true, entry },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    console.error("Failed to save waitlist entry", error)

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  try {
    if (!waitlistReadAuthorized(request)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      )
    }

    const entries = await listWaitlistEntries()

    return NextResponse.json({ success: true, entries })
  } catch (error) {
    console.error("Failed to load waitlist entries", error)

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    )
  }
}
