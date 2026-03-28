'use client'

import { useState, useEffect } from 'react'

export function useReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

        const handler = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches)
        }

        // Set initial value deferred to avoid cascading render lint error
        const timeoutId = setTimeout(() => {
            if (mediaQuery.matches) {
                setPrefersReducedMotion(true)
            }
        }, 0)

        mediaQuery.addEventListener('change', handler)
        return () => {
            clearTimeout(timeoutId)
            mediaQuery.removeEventListener('change', handler)
        }
    }, [])

    return prefersReducedMotion
}
