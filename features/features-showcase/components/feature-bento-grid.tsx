'use client'

import * as React from 'react'
import { motion, useAnimation, Variants } from 'motion/react'
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer'
import { useReducedMotion } from '@/shared/hooks/use-reduced-motion'
import { FEATURES } from '../constants'
import { FeatureCard } from './feature-card'
import { FeatureHighlightLarge } from './feature-highlight-large'

export function FeatureBentoGrid() {
    const controls = useAnimation()
    const gridRef = React.useRef<HTMLDivElement>(null)
    const isReducedMotion = useReducedMotion()
    const entry = useIntersectionObserver(gridRef, {
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
                staggerChildren: isReducedMotion ? 0 : 0.08,
            },
        },
    }

    const itemVariants: Variants = {
        hidden: isReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: 'easeOut',
            },
        },
    }

    return (
        <motion.div
            ref={gridRef}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
            {FEATURES.map((feature) => (
                feature.size === 'large' ? (
                    <FeatureHighlightLarge
                        key={feature.id}
                        feature={feature}
                        variants={itemVariants}
                    />
                ) : (
                    <FeatureCard
                        key={feature.id}
                        feature={feature}
                        variants={itemVariants}
                    />
                )
            ))}
        </motion.div>
    )
}
