"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"

import { routes } from "@/config/routes"
import { postLoginRedirectPath } from "@/features/auth/lib/post-login-redirect"
import { loginCredentialsSchema } from "@/features/auth/lib/auth-schemas"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"

type LoginFormProps = {
  showEmail: boolean
  showGoogle: boolean
}

export function LoginForm({ showEmail, showGoogle }: LoginFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") ?? routes.platform.root
  const error = searchParams.get("error")
  const registered = searchParams.get("registered")

  const [emailError, setEmailError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setEmailError(null)
    const form = new FormData(e.currentTarget)
    const parsed = loginCredentialsSchema.safeParse({
      email: form.get("email"),
      password: form.get("password"),
    })
    if (!parsed.success) {
      setEmailError(parsed.error.issues[0]?.message ?? "Invalid input")
      return
    }

    setPending(true)
    const res = await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      callbackUrl,
      redirect: false,
    })
    setPending(false)

    if (res?.error) {
      setEmailError("Invalid email or password.")
      return
    }
    router.push(postLoginRedirectPath(res?.url ?? callbackUrl, routes.platform.root))
    router.refresh()
  }

  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl border border-input bg-card p-8 text-card-foreground shadow-xl">
      <div className="space-y-2 text-center">
        <h1 className="font-heading text-xl font-semibold">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          {showEmail && showGoogle
            ? "Use email and password or Google to access your workspace."
            : showGoogle
              ? "Use your Google account to access the platform."
              : "Sign in with your email and password."}
        </p>
      </div>

      {registered ? (
        <p className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-center text-sm text-foreground">
          Account created. You can sign in now.
        </p>
      ) : null}

      {error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-center text-sm text-destructive">
          Sign-in failed ({error}). Try again or use another method.
        </p>
      ) : null}

      {showEmail ? (
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2 text-left">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="bg-background"
            />
          </div>
          {emailError ? (
            <p className="text-sm text-destructive" role="alert">
              {emailError}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      ) : null}

      {showEmail && showGoogle ? (
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-wide">
            <span className="bg-card px-2 text-muted-foreground">Or</span>
          </div>
        </div>
      ) : null}

      {showGoogle ? (
        <Button
          type="button"
          variant={showEmail ? "outline" : "primary"}
          className="w-full"
          onClick={() => signIn("google", { callbackUrl })}
        >
          Continue with Google
        </Button>
      ) : null}

      <div className="flex flex-col gap-2 border-t border-border pt-4 text-center text-sm">
        {showEmail ? (
          <p className="text-muted-foreground">
            No account?{" "}
            <a href={routes.auth.signup} className="font-medium text-primary hover:underline">
              Create one
            </a>
          </p>
        ) : null}
        <Button variant="ghost" type="button" className="w-full text-muted-foreground" asChild>
          <a href={routes.marketing.home}>Back to site</a>
        </Button>
      </div>
    </div>
  )
}
