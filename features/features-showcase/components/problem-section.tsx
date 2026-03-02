'use client'

import * as React from 'react'
import { motion, useAnimation, Variants } from 'motion/react'
import { ChevronDown, X, ArrowDown } from 'lucide-react'
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer'
import { useReducedMotion } from '@/shared/hooks/use-reduced-motion'
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
                staggerChildren: isReducedMotion ? 0 : 0.15,
            },
        },
    }

    const cardVariants: Variants = {
        hidden: isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
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
        <section
            ref={sectionRef}
            className="relative w-full py-24 md:py-32"
        >
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Top Label & Headline */}
                <div className="text-center">
                    <motion.span
                        initial="hidden"
                        animate={controls}
                        variants={fadeVariants}
                        custom={0}
                        className="text-xs font-semibold tracking-widest uppercase text-text-muted"
                    >
                        {PROBLEM_TOP_LABEL}
                    </motion.span>
                    <motion.h2
                        initial="hidden"
                        animate={controls}
                        variants={fadeVariants}
                        custom={0.1}
                        className="mt-4 font-bold text-text-primary"
                    >
                        {PROBLEM_HEADLINE}
                    </motion.h2>
                </div>

                {/* Problem Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
                >
                    {PROBLEM_CARDS.map((card) => (
                        <motion.div
                            key={card.id}
                            variants={cardVariants}
                            className="flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:shadow-md"
                        >
                            <div className="flex items-center gap-x-3 text-text-primary">
                                <card.icon className="h-5 w-5 text-accent" />
                                <h3 className="font-semibold text-h3">{card.title}</h3>
                            </div>

                            {/* Promise Section */}
                            <div className="mt-6 flex-1">
                                <p className="text-sm font-medium text-success">
                                    What they promise:
                                </p>
                                <p className="mt-2 text-text-secondary italic">&quot;{card.promise}&quot;</p>

                                {/* Animated Arrow */}
                                <div className="my-6 flex justify-center">
                                    <ChevronDown className="h-5 w-5 animate-bounce text-text-muted" />
                                </div>

                                {/* Reality Section */}
                                <p className="text-sm font-medium text-error">
                                    What actually happens:
                                </p>
                                <ul className="mt-4 flex flex-col gap-3">
                                    {card.reality.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                                            <X className="mt-0.5 h-4 w-4 shrink-0 text-error/60" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Bottom Text */}
                            <div className="mt-8 border-t border-border pt-6">
                                <p className="text-sm font-semibold text-error">
                                    {card.bottomText}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Transition Footer */}
                <div className="mt-24 text-center">
                    <motion.div
                        animate={controls}
                        variants={fadeVariants}
                        custom={0.8}
                        initial="hidden"
                        className="flex flex-col items-center"
                    >
                        <p className="text-lg text-text-secondary">{PROBLEM_TRANSITION_UP}</p>
                        <motion.div
                            animate={isReducedMotion ? {} : { y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="mt-4"
                        >
                            <ArrowDown className="h-6 w-6 text-text-primary opacity-50" />
                        </motion.div>
                        <h3 className="mt-6 max-w-2xl font-bold text-text-primary">
                            {PROBLEM_TRANSITION_DOWN}
                        </h3>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
