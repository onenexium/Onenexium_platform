import { redirect } from "next/navigation"

import { AdminFrame } from "@/features/admin/shell"
import { auth } from "@/auth"
import { routes } from "@/config/routes"
import { isAdminViewer } from "@/server/auth/admin-access"

export default async function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (!session?.user) {
    redirect(`${routes.auth.login}?callbackUrl=${encodeURIComponent(routes.admin.root)}`)
  }

  if (!isAdminViewer(session.user.email)) {
    redirect(routes.platform.root)
  }

  return <AdminFrame>{children}</AdminFrame>
}
