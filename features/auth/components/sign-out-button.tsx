"use client"

import { signOut } from "next-auth/react"

import { routes } from "@/config/routes"
import { Button } from "@/shared/components/ui/button"

export function SignOutButton() {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => signOut({ callbackUrl: routes.marketing.home })}
    >
      Sign out
    </Button>
  )
}
