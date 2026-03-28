'use client'

import React from 'react'
import { ShieldCheck, RefreshCw, CreditCard } from 'lucide-react'
import { PricingToggle } from './pricing-toggle'
import { PricingCard } from './pricing-card'
import { PRICING_DATA, PRICING_COPY } from '../constants'
import { usePricingToggle } from '../hooks/use-pricing-toggle'
import { Section, SectionContainer, SectionHeader } from '@/shared/components/section-layout'

export function PricingSection() {
  const { interval, setInterval } = usePricingToggle()

  return (
    <Section id="pricing" className="bg-subtle/60">
      <SectionContainer>
        <div className="max-w-3xl mx-auto text-center mb-[var(--section-gap)]">
          <SectionHeader
            title={PRICING_COPY.headline}
            description={PRICING_COPY.subheadline}
          />
          <div className="mt-8 flex justify-center">
            <PricingToggle interval={interval} onChange={setInterval} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
          {PRICING_DATA.plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              interval={interval}
            />
          ))}
        </div>

        <div className="mt-[var(--section-gap)] pt-10 border-t border-border max-w-4xl mx-auto">
          <div className="text-center space-y-2 mb-10">
            <p className="text-sm text-text-muted font-medium italic">
              {PRICING_COPY.trustLabel}
            </p>
            <p className="section-kicker">
              {PRICING_COPY.guaranteeLabel}
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            <TrustIcon icon={ShieldCheck} label="Secure AWS Guard" />
            <TrustIcon icon={RefreshCw} label="Daily Backups" />
            <TrustIcon icon={CreditCard} label="SSL Encrypted" />
          </div>
        </div>
      </SectionContainer>
    </Section>
  )
}

function TrustIcon({ icon: Icon, label }: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string }) {
  return (
    <div className="flex items-center gap-2.5 text-text-muted hover:text-text-primary transition-colors duration-200 group">
      <Icon size={18} className="text-accent group-hover:scale-105 transition-transform shrink-0" />
      <span className="text-xs font-semibold uppercase tracking-[0.12em]">{label}</span>
    </div>
  )
}
