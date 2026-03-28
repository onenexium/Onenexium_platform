import Link from "next/link"

import { routes } from "@/config/routes"
import { canSignUp, getAuthEnvFlags, SignupForm } from "@/features/auth"

export default function SignupPage() {
  const flags = getAuthEnvFlags()

  if (!canSignUp(flags)) {
    return (
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-input bg-card p-8 text-center text-card-foreground shadow-xl">
        <h1 className="font-heading text-xl font-semibold">Sign up unavailable</h1>
        <p className="text-sm text-muted-foreground">
          Sign up needs{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">AUTH_SECRET</code> (or{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">NEXTAUTH_SECRET</code>) and a working{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">DATABASE_URL</code> (e.g. from AWS
          Secrets Manager). Run{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">npm run db:migrate:sm</code> if the{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">users</code> table is not up to
          date.
        </p>
        <Link href={routes.auth.login} className="inline-flex text-sm font-medium text-primary hover:underline">
          Back to sign in →
        </Link>
      </div>
    )
  }

  return <SignupForm />
}
