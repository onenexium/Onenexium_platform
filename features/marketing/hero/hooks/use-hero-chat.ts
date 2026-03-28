'use client'

import { useState, useRef, useEffect } from 'react'
import { PLATFORM_URL } from '../constants'

export function useHeroChat() {
    const [value, setValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // Auto-resize textarea
    useEffect(() => {
        const el = textareaRef.current
        if (!el) return

        el.style.height = 'auto'
        el.style.height = Math.min(el.scrollHeight, 200) + 'px'
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            if (value.trim()) handleSubmit()
        }
    }

    const handleSubmit = () => {
        if (!value.trim() || isLoading) return
        setIsLoading(true)

        // Navigate to platform app with prompt pre-filled
        const encoded = encodeURIComponent(value.trim())
        window.location.href = `${PLATFORM_URL}/new?prompt=${encoded}`
    }

    return {
        value,
        handleChange,
        handleKeyDown,
        handleSubmit,
        isLoading,
        textareaRef,
        isEmpty: !value.trim(),
    }
}
