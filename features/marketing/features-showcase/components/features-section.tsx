import { FeatureBentoGrid } from './feature-bento-grid'
import { Section, SectionContainer, SectionHeader } from '@/shared/components/section-layout'

export function FeaturesSection() {
  return (
    <Section id="features">
      <SectionContainer>
        <SectionHeader
          kicker="Features"
          title="Everything you need to launch."
          description="One Nexium isn't just a landing page generator. It's a full-stack engine that provisions your entire infrastructure and handles the complex logic automatically."
          align="left"
        />
        <FeatureBentoGrid />
      </SectionContainer>
    </Section>
  )
}
