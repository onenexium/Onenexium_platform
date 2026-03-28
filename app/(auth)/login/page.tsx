import { Suspense } from "react"

import { routes } from "@/config/routes"

import { LoginForm } from "./login-form"

export default function LoginPage() {
  const secretReady = Boolean(process.env.AUTH_SECRET?.trim())
  const googleReady =
    Boolean(process.env.AUTH_GOOGLE_ID?.trim()) &&
    Boolean(process.env.AUTH_GOOGLE_SECRET?.trim())

  if (!secretReady || !googleReady) {
    return (
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-input bg-card p-8 text-center text-card-foreground shadow-xl">
        <h1 className="font-heading text-xl font-semibold">Sign in unavailable</h1>
        <p className="text-sm text-muted-foreground">
          Set <code className="rounded bg-muted px-1 py-0.5 text-xs">AUTH_SECRET</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">AUTH_GOOGLE_ID</code>, and{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">AUTH_GOOGLE_SECRET</code> in{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">.env.local</code>, or load them from
          AWS Secrets Manager using{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">AWS_SECRETS_PREFIX</code> /{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">AWS_SECRETS_JSON_ID</code> (see{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">docs/AWS_CREDENTIALS.md</code>
          ).
        </p>
        <a
          href={routes.marketing.home}
          className="inline-flex text-sm font-medium text-primary hover:underline"
        >
          Back to site →
        </a>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md rounded-2xl border border-input bg-card p-8 text-center text-sm text-muted-foreground shadow-xl">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
