'use client'

import * as React from 'react'
import { HOW_IT_WORKS_STEPS } from '../constants'
import { StepList } from './step-list'
import { StepDemoPreview } from './step-demo-preview'
import { useStepScroll } from '../hooks/use-step-scroll'
import { StepId } from '../types'
import { Section, SectionContainer, SectionHeader } from '@/shared/components/section-layout'

export function HowItWorksSection() {
  const { activeStep, stepRefs, setActiveStep } = useStepScroll(HOW_IT_WORKS_STEPS.length)

  const handleStepClick = (index: number) => {
    setActiveStep(index)
    stepRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <Section id="how-it-works">
      <SectionContainer>
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="flex flex-col gap-0 leading-none">
              {HOW_IT_WORKS_STEPS.map((step, index) => (
                <div
                  key={`trigger-${step.id}`}
                  ref={(el) => { stepRefs.current[index] = el }}
                  className="absolute h-1 w-1 opacity-0 pointer-events-none"
                  style={{ top: `${(index + 0.5) * 33}%` }}
                />
              ))}
            </div>

            <div className="lg:sticky lg:top-36 lg:max-h-[calc(100vh-10rem)]">
              <SectionHeader
                kicker="Steps"
                title="How One Nexium launches you"
                align="left"
              />
              <StepList
                activeStep={activeStep}
                onStepClick={handleStepClick}
              />
            </div>
          </div>

          <div className="hidden lg:block lg:sticky lg:top-36">
            <div className="rounded-2xl border border-border bg-surface shadow-md overflow-hidden">
              <StepDemoPreview activeStep={activeStep as StepId} />
            </div>
          </div>

          <div className="block lg:hidden mt-8 rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
            <StepDemoPreview activeStep={activeStep as StepId} />
          </div>
        </div>
      </SectionContainer>
    </Section>
  )
}
