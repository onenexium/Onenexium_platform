import {
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  PricingSection,
  ProblemSection,
  WaitlistSection,
} from "@/features/marketing"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <PricingSection />
      <WaitlistSection />
    </div>
  )
}
