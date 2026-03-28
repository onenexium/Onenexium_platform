'use client'

import { useState, useEffect, useRef } from 'react'

export function useStepScroll(stepCount: number) {
    const [activeStep, setActiveStep] = useState(0)
    const stepRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0% -40% 0%', // Trigger when step is roughly in the middle 20% of viewport
            threshold: 0,
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = stepRefs.current.indexOf(entry.target as HTMLDivElement)
                    if (index !== -1) {
                        setActiveStep(index)
                    }
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)

        stepRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref)
        })

        return () => observer.disconnect()
    }, [stepCount])

    return { activeStep, stepRefs, setActiveStep }
}
