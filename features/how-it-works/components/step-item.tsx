'use client'

import { motion } from 'motion/react'
import { cn } from '@/shared/lib/utils'
import { Step } from '../types'
import { useReducedMotion } from '@/shared/hooks/use-reduced-motion'

interface StepItemProps {
    step: Step
    isActive: boolean
    onClick: () => void
}

export function StepItem({ step, isActive, onClick }: StepItemProps) {
    const isReducedMotion = useReducedMotion()

    return (
        <div
            onClick={onClick}
            className={cn(
                'group cursor-pointer transition-all duration-500',
                !isActive && 'opacity-40 hover:opacity-100'
            )}
        >
            <div className="flex gap-6">
                {/* Number Badge */}
                <div
                    className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-all duration-500',
                        isActive
                            ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]'
                            : 'bg-muted text-muted-foreground border-border'
                    )}
                >
                    {step.id + 1}
                </div>

                {/* Content */}
                <motion.div
                    animate={
                        isReducedMotion ? {} : { scale: isActive ? 1.02 : 1, x: isActive ? 4 : 0 }
                    }
                    className="flex flex-col gap-2"
                >
                    <div className="flex items-center gap-2">
                        <step.icon className={cn('h-4 w-4', isActive ? 'text-primary' : 'text-muted-foreground')} />
                        <span className={cn('text-xs font-semibold uppercase tracking-wider', isActive ? 'text-primary' : 'text-slate-400')}>
                            {step.tag}
                        </span>
                    </div>
                    <h3
                        className={cn(
                            'text-xl font-semibold transition-colors duration-500',
                            isActive ? 'text-foreground' : 'text-muted-foreground'
                        )}
                    >
                        {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
