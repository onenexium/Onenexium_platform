'use client'

import * as React from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useLocalStorage } from '@/shared/hooks/use-local-storage'
import { useReducedMotion } from '@/shared/hooks/use-reduced-motion'
import { cn } from '@/shared/lib/utils'
import {
    ANNOUNCEMENT_TEXT,
    ANNOUNCEMENT_CTA,
    ANNOUNCEMENT_HREF,
    ANNOUNCEMENT_DISMISSED_KEY,
} from '../constants'

export function AnnouncementBar() {
    const [isDismissed, setIsDismissed] = useLocalStorage(
        ANNOUNCEMENT_DISMISSED_KEY,
        false
    )
    const prefersReducedMotion = useReducedMotion()

    // Avoid hydration flash by not rendering until we know the dismissal state
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted || isDismissed) {
        return null
    }

    return (
        <AnimatePresence>
            {!isDismissed && (
                <motion.div
                    role="banner"
                    aria-label="Announcement"
                    initial={{ height: 36, opacity: 1 }}
                    exit={
                        prefersReducedMotion
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={cn(
                        'relative z-50 flex h-9 w-full items-center justify-center overflow-hidden',
                        'bg-accent px-4 text-xs font-medium text-white'
                    )}
                >
                    <div className="flex items-center gap-x-2 md:gap-x-3">
                        <span className="flex items-center gap-x-2">
                            <span className="text-xs md:text-sm">{ANNOUNCEMENT_TEXT}</span>
                        </span>
                        <Link
                            href={ANNOUNCEMENT_HREF}
                            className="hidden font-medium underline underline-offset-4 hover:text-blue-400 sm:inline-block"
                        >
                            {ANNOUNCEMENT_CTA}
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsDismissed(true)}
                        className="absolute right-4 p-1 text-white/70 transition-colors hover:text-white"
                        aria-label="Dismiss announcement"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
