'use client'

import { useState, useEffect } from 'react'

export function useNavbarScroll() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | undefined

        const handleScroll = () => {
            if (timeoutId) {
                return
            }

            timeoutId = setTimeout(() => {
                setIsScrolled(window.scrollY > 10)
                timeoutId = undefined
            }, 100)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [])

    return { isScrolled }
}
