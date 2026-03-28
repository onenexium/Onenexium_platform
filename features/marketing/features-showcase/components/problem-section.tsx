'use client'

import * as React from 'react'
import { motion, useAnimation, Variants } from 'motion/react'
import { ChevronDown, X, ArrowDown } from 'lucide-react'
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer'
import { useReducedMotion } from '@/shared/hooks/use-reduced-motion'
import { Section, SectionContainer, SectionHeader } from '@/shared/components/section-layout'
import {
  PROBLEM_TOP_LABEL,
  PROBLEM_HEADLINE,
  PROBLEM_CARDS,
  PROBLEM_TRANSITION_UP,
  PROBLEM_TRANSITION_DOWN,
} from '../constants'

export function ProblemSection() {
  const controls = useAnimation()
  const sectionRef = React.useRef<HTMLElement>(null)
  const isReducedMotion = useReducedMotion()
  const entry = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
    freezeOnceVisible: true,
  })

  React.useEffect(() => {
    if (entry?.isIntersecting) {
      controls.start('visible')
    }
  }, [controls, entry])

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isReducedMotion ? 0 : 0.12,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const fadeVariants: Variants = {
    hidden: isReducedMotion ? { opacity: 1 } : { opacity: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: custom,
      },
    }),
  }

  return (
    <Section ref={sectionRef} id="problem">
      <SectionContainer>
        <SectionHeader kicker={PROBLEM_TOP_LABEL} title={PROBLEM_HEADLINE} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {PROBLEM_CARDS.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-border-strong/50"
            >
              <div className="mb-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <card.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-bold tracking-tight text-text-primary">
                {card.title}
              </h3>

              <div className="mt-4 flex-1">
                <p className="text-[11px] font-semibold tracking-[0.15em] text-success uppercase">
                  The promise
                </p>
                <p className="mt-2 text-sm text-text-secondary italic leading-[var(--leading-relaxed)]">
                  &quot;{card.promise}&quot;
                </p>
                <div className="my-5 flex justify-center">
                  <ChevronDown className="h-4 w-4 animate-bounce text-text-muted/50" />
                </div>
                <p className="text-[11px] font-semibold tracking-[0.15em] text-error uppercase">
                  The reality
                </p>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {card.reality.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed"
                    >
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-error/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-border pt-5">
                <p className="text-sm font-semibold text-error">{card.bottomText}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-[var(--section-gap)] text-center">
          <motion.div
            animate={controls}
            variants={fadeVariants}
            custom={0.8}
            initial="hidden"
            className="flex flex-col items-center"
          >
            <p className="text-[length:var(--font-size-lead)] font-medium text-text-secondary mb-2">
              {PROBLEM_TRANSITION_UP}
            </p>
            <motion.div
              animate={isReducedMotion ? {} : { y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-8"
            >
              <ArrowDown className="h-5 w-5 text-accent opacity-50" />
            </motion.div>
            <h3 className="max-w-3xl font-bold text-text-primary text-h3 leading-[var(--leading-tight)]">
              {PROBLEM_TRANSITION_DOWN}
            </h3>
          </motion.div>
        </div>
      </SectionContainer>
    </Section>
  )
}
