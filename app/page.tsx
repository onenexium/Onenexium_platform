import { HeroSection } from '@/features/hero/components/hero-section'
import { ProblemSection } from '@/features/features-showcase/components/problem-section'
import { HowItWorksSection } from '@/features/how-it-works/components/how-it-works-section'
import { FeaturesSection } from '@/features/features-showcase/components/features-section'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      {/* Other sections will go here */}
    </main>
  )
}
