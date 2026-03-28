import { AnnouncementBar } from "@/features/marketing/navigation/components/navbar-announcement-bar"
import { Navbar } from "@/features/marketing/navigation/components/navbar"
import { Footer } from "@/features/marketing/footer/components/footer"

/**
 * Marketing shell: announcement bar, nav, main, footer.
 * `.marketing-gradient` gives only this shell the decorative gradient background.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="marketing-gradient flex min-h-[100dvh] min-h-screen flex-col pt-safe text-foreground">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
