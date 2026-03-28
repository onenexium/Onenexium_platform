"use client"

import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"

import { routes } from "@/config/routes"
import { Button } from "@/shared/components/ui/button"

export function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") ?? routes.platform.root
  const error = searchParams.get("error")

  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl border border-input bg-card p-8 text-center text-card-foreground shadow-xl">
      <div className="space-y-2">
        <h1 className="font-heading text-xl font-semibold">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Use your Google account to access the platform dashboard.
        </p>
      </div>

      {error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Sign-in failed ({error}). Check AUTH_SECRET and Google OAuth credentials.
        </p>
      ) : null}

      <div className="flex flex-col gap-3">
        <Button
          type="button"
          className="w-full"
          onClick={() => signIn("google", { callbackUrl })}
        >
          Continue with Google
        </Button>
        <Button variant="outline" type="button" className="w-full" asChild>
          <a href={routes.marketing.home}>Back to site</a>
        </Button>
      </div>
    </div>
  )
}
