'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
            <h2 className="font-heading text-2xl font-bold">Something went wrong!</h2>
            <button
                className="mt-4 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
                onClick={() => reset()}
            >
                Try again
            </button>
        </div>
    )
}
