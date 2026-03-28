import { sendSimpleEmail } from "@/server/aws"

import type { WaitlistEntry } from "@/shared/lib/waitlist-store"

/**
 * Optional internal notification when someone joins the waitlist (Amazon SES).
 * Set AWS_SES_FROM + WAITLIST_NOTIFY_TO (comma-separated) on the platform host.
 */
export async function notifyWaitlistSignup(entry: WaitlistEntry): Promise<void> {
  const from = process.env.AWS_SES_FROM?.trim()
  const rawTo = process.env.WAITLIST_NOTIFY_TO?.trim()
  if (!from || !rawTo) return

  const to = rawTo
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean)
  if (to.length === 0) return

  const configurationSet = process.env.AWS_SES_CONFIGURATION_SET?.trim()

  const textBody = [
    `New waitlist signup`,
    `Name: ${entry.name}`,
    `Email: ${entry.email}`,
    entry.message ? `Message: ${entry.message}` : null,
    `Time: ${entry.createdAt}`,
  ]
    .filter(Boolean)
    .join("\n")

  try {
    await sendSimpleEmail({
      from,
      to,
      subject: `[${process.env.NEXT_PUBLIC_APP_NAME ?? "OneNexium"}] Waitlist: ${entry.email}`,
      textBody,
      ...(configurationSet ? { configurationSetName: configurationSet } : {}),
    })
  } catch (err) {
    console.error("[waitlist] SES notify failed (non-fatal)", err)
  }
}
