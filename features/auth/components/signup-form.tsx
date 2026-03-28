"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { routes } from "@/config/routes"
import { signupAction, type SignupState } from "@/features/auth/actions/signup"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"

const initial: SignupState = {}

export function SignupForm() {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(signupAction, initial)

  useEffect(() => {
    if (state.ok) {
      router.push(`${routes.auth.login}?registered=1`)
    }
  }, [state.ok, router])

  return (
    <form action={formAction} className="w-full max-w-md space-y-5 rounded-2xl border border-input bg-card p-8 text-card-foreground shadow-xl">
      <div className="space-y-2 text-center">
        <h1 className="font-heading text-xl font-semibold">Create account</h1>
        <p className="text-sm text-muted-foreground">
          Set up email and password for the platform workspace.
        </p>
      </div>

      {state.error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-center text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <div className="space-y-2 text-left">
        <Label htmlFor="signup-name">Name</Label>
        <Input
          id="signup-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="bg-background"
        />
      </div>
      <div className="space-y-2 text-left">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="bg-background"
        />
      </div>
      <div className="space-y-2 text-left">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="bg-background"
        />
        <p className="text-xs text-muted-foreground">At least 8 characters.</p>
      </div>
      <div className="space-y-2 text-left">
        <Label htmlFor="signup-confirm">Confirm password</Label>
        <Input
          id="signup-confirm"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          className="bg-background"
        />
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>

      <p className="border-t border-border pt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a href={routes.auth.login} className="font-medium text-primary hover:underline">
          Sign in
        </a>
      </p>
    </form>
  )
}
