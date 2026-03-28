import { redirect } from "next/navigation"

import { PlatformFrame } from "@/features/platform/shell"
import { auth } from "@/auth"
import { routes } from "@/config/routes"

export default async function PlatformRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (!session?.user) {
    redirect(`${routes.auth.login}?callbackUrl=${encodeURIComponent(routes.platform.root)}`)
  }

  return <PlatformFrame>{children}</PlatformFrame>
}
