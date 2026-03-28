'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/shared/components/ui/button'
import { ThemeToggle } from '@/shared/components/theme-toggle'
import { SIGN_IN_HREF, SIGN_UP_HREF } from '../constants'

export function NavbarCta() {
    return (
        <div className="flex items-center gap-x-1">
            <ThemeToggle className="hidden md:inline-flex" />
            <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden md:inline-flex"
            >
                <Link href={SIGN_IN_HREF}>Sign in</Link>
            </Button>
            <Button asChild size="sm">
                <Link href={SIGN_UP_HREF}>Get started free</Link>
            </Button>
        </div>
    )
}
