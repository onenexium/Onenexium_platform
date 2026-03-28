import { Suspense } from "react"
import Link from "next/link"

import { routes } from "@/config/routes"
import { canSignIn, getAuthEnvFlags } from "@/features/auth"
import { LoginForm } from "@/features/auth"

export default function LoginPage() {
  const flags = getAuthEnvFlags()
  const showEmail = flags.secretReady && flags.databaseReady
  const showGoogle = flags.secretReady && flags.googleReady

  if (!canSignIn(flags)) {
    return (
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-input bg-card p-8 text-center text-card-foreground shadow-xl">
        <h1 className="font-heading text-xl font-semibold">Sign in unavailable</h1>
        <p className="text-sm text-muted-foreground">
          Set <code className="rounded bg-muted px-1 py-0.5 text-xs">AUTH_SECRET</code> or{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">NEXTAUTH_SECRET</code>, then either
          connect <code className="rounded bg-muted px-1 py-0.5 text-xs">DATABASE_URL</code> for
          email sign-in or configure Google OAuth (
          <code className="rounded bg-muted px-1 py-0.5 text-xs">AUTH_GOOGLE_*</code> or{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">GOOGLE_CLIENT_*</code>). Load from
          AWS Secrets Manager with{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">AWS_SECRETS_PREFIX</code>, then
          restart the Node process (
          <code className="rounded bg-muted px-1 py-0.5 text-xs">pm2 restart … --update-env</code>
          ).
        </p>
        <Link href={routes.marketing.home} className="inline-flex text-sm font-medium text-primary hover:underline">
          Back to site →
        </Link>
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
      <LoginForm showEmail={showEmail} showGoogle={showGoogle} />
    </Suspense>
  )
}
