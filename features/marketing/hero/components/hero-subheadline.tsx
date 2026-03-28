'use client'

import { motion } from 'motion/react'
import { HERO_SUBHEADLINE_LINE1, HERO_SUBHEADLINE_LINE2 } from '../constants'
import { useReducedMotion } from '@/shared/hooks/use-reduced-motion'

export function HeroSubheadline() {
    const isReducedMotion = useReducedMotion()

    return (
        <motion.div
            initial={isReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-content mx-auto text-center font-sans text-[length:var(--font-size-lead)] text-text-secondary leading-[var(--leading-relaxed)]"
        >
            <p>{HERO_SUBHEADLINE_LINE1}</p>
            <p>{HERO_SUBHEADLINE_LINE2}</p>
        </motion.div>
    )
}
