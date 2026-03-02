'use client'

import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue)
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        // Defer initialization to avoid cascading render lint error
        const timeoutId = setTimeout(() => {
            try {
                const item = window.localStorage.getItem(key)
                if (item) {
                    const parsed = JSON.parse(item) as T
                    setStoredValue(parsed)
                }
            } catch (error) {
                console.warn(`Error reading localStorage key "${key}":`, error)
            } finally {
                setIsHydrated(true)
            }
        }, 0)

        return () => clearTimeout(timeoutId)
    }, [key])

    const setValue = useCallback(
        (value: T | (() => T)) => {
            try {
                const valueToStore =
                    value instanceof Function ? value() : value
                setStoredValue(valueToStore)
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore))
                }
            } catch (error) {
                console.warn(`Error setting localStorage key "${key}":`, error)
            }
        },
        [key]
    )

    return [storedValue, setValue, isHydrated] as const
}
