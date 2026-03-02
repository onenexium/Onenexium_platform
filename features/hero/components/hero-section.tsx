'use client'

import { HeroHeadline } from './hero-headline'
import { HeroSubheadline } from './hero-subheadline'
import { HeroChatInput } from './hero-chat-input'

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Layer 1: All content */}
            <div className="relative z-20 flex flex-col items-center justify-center gap-8 w-full max-w-3xl mx-auto px-4 text-center">
                <HeroHeadline />
                <HeroSubheadline />
                <HeroChatInput />
            </div>
        </section>
    )
}
