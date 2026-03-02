'use client'

import { motion } from 'motion/react'
import { HERO_HEADLINE } from '../constants'
import { useReducedMotion } from '@/shared/hooks/use-reduced-motion'

export function HeroHeadline() {
    const isReducedMotion = useReducedMotion()

    return (
        <motion.h1
            initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="text-center font-serif text-5xl italic font-normal tracking-tight leading-tight sm:text-6xl lg:text-7xl"
            style={{ color: '#1e3564' }}
        >
            {HERO_HEADLINE}
        </motion.h1>
    )
}
