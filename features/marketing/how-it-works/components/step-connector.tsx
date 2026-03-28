'use client'

import { cn } from '@/shared/lib/utils'

interface StepConnectorProps {
    active?: boolean
    isLast?: boolean
}

export function StepConnector({ active, isLast }: StepConnectorProps) {
    if (isLast) return null

    return (
        <div className="ml-5 flex h-16 w-px items-center justify-center">
            <div
                className={cn(
                    'h-full w-px bg-gradient-to-b from-border to-transparent transition-colors duration-500',
                    active && 'from-primary'
                )}
            />
        </div>
    )
}
