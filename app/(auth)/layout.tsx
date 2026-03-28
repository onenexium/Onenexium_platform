/**
 * Auth routes — no marketing chrome. Full-viewport centered card.
 * Background follows the global theme (light/dark) via CSS vars.
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 text-foreground">
      {children}
    </div>
  )
}
