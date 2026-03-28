'use client'

import { motion, Variants } from 'motion/react'
import { cn } from '@/shared/lib/utils'
import { Feature } from '../types'

interface FeatureHighlightLargeProps {
    feature: Feature
    variants: Variants
}

export function FeatureHighlightLarge({
    feature,
    variants,
}: FeatureHighlightLargeProps) {
    return (
        <motion.div
            variants={variants}
            className={cn(
                'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md lg:col-span-2 md:min-h-[260px]'
            )}
        >
            <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="flex flex-col">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    {feature.label && (
                        <span className="mb-2 text-[10px] font-bold tracking-widest text-primary uppercase">
                            {feature.label}
                        </span>
                    )}
                    <h3 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
                        {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                    </p>
                </div>

                {/* Mini Visual */}
                <div className="relative flex items-center justify-center rounded-xl bg-muted/50 p-4">
                    {feature.visualType === 'chat' && renderChatVisual()}
                    {feature.visualType === 'infra' && renderInfraVisual()}
                </div>
            </div>
        </motion.div>
    )
}

function renderChatVisual() {
    return (
        <div className="flex w-full flex-col gap-3">
            <div className="h-4 w-3/4 rounded bg-primary/20" />
            <div className="h-4 w-1/2 rounded bg-muted-foreground/20 self-end" />
            <div className="h-4 w-2/3 rounded bg-primary/20" />
            <div className="mt-2 flex gap-1">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                        className="h-1.5 w-1.5 rounded-full bg-primary"
                    />
                ))}
            </div>
        </div>
    )
}

function renderInfraVisual() {
    return (
        <div className="relative flex h-32 w-full items-center justify-center">
            <div className="absolute h-16 w-16 rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full border-2 border-primary/40 border-t-primary animate-spin" />
            </div>
            <div className="absolute top-0 left-1/4 h-8 w-8 rounded bg-muted animate-pulse" />
            <div className="absolute bottom-0 right-1/4 h-8 w-8 rounded bg-muted animate-pulse" />
            <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 100 100">
                <line x1="50" y1="20" x2="50" y2="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="50" y1="60" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            </svg>
        </div>
    )
}
