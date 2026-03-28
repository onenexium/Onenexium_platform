'use client'

import Link from 'next/link'
import { siteConfig } from '@/config/site'

export function NavbarLogo() {
    return (
        <Link
            href="/"
            className="flex items-center gap-x-2 transition-opacity hover:opacity-80"
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary-foreground"
                >
                    <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" />
                    <path d="M12 12V21" />
                    <path d="M12 12L20 7.5" />
                    <path d="M12 12L4 7.5" />
                </svg>
            </div>
            <span className="font-heading text-lg md:text-xl font-bold tracking-tight text-text-primary whitespace-nowrap">
                {siteConfig.name}
            </span>
        </Link>
    )
}
