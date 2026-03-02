'use client'

import { motion, Variants } from 'motion/react'
import { cn } from '@/shared/lib/utils'
import { Feature } from '../types'

interface FeatureCardProps {
    feature: Feature
    variants: Variants
}

export function FeatureCard({ feature, variants }: FeatureCardProps) {
    return (
        <motion.div
            variants={variants}
            className={cn(
                'group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:bg-card/80 hover:shadow-md md:min-h-[176px]'
            )}
        >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mb-2 text-base font-semibold text-foreground">
                {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
            </p>
        </motion.div>
    )
}
