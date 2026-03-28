'use client'

import { HeroHeadline } from './hero-headline'
import { HeroSubheadline } from './hero-subheadline'
import { HeroChatInput } from './hero-chat-input'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-[var(--section-py)]"
    >
      <div className="section-container relative z-20 flex flex-col items-center justify-center gap-10 w-full max-w-3xl mx-auto text-center">
        <HeroHeadline />
        <HeroSubheadline />
        <HeroChatInput />
      </div>
    </section>
  )
}
