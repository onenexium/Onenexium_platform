import { SignOutButton } from "./sign-out-button"

export default function PlatformSettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-2xl border border-premium-border bg-premium-surface p-8 text-center shadow-premium-card">
        <p className="text-sm text-premium-text-3">
          Workspace settings and team — placeholder per UI spec.
        </p>
      </div>
      <div className="flex justify-center">
        <SignOutButton />
      </div>
    </div>
  )
}
