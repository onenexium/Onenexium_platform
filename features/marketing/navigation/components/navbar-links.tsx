'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { NAV_LINKS } from '../constants'

export function NavbarLinks() {
    const pathname = usePathname()

    return (
        <nav className="flex items-center gap-6">
            {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            'text-sm font-normal transition-colors hover:text-text-primary',
                            isActive ? 'text-text-primary' : 'text-text-muted'
                        )}
                    >
                        {link.label}
                    </Link>
                )
            })}
        </nav>
    )
}
