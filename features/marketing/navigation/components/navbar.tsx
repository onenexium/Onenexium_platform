'use client'

import * as React from 'react'
import { cn } from '@/shared/lib/utils'
import { useNavbarScroll } from '../hooks/use-navbar-scroll'
import { NavbarLogo } from './navbar-logo'
import { NavbarLinks } from './navbar-links'
import { NavbarCta } from './navbar-cta'
import { NavbarMobile } from './navbar-mobile'

export function Navbar() {
    const { isScrolled } = useNavbarScroll()

    return (
        <header
            className={cn(
                'sticky top-0 z-40 w-full transition-all duration-200',
                isScrolled
                    ? 'bg-page/80 backdrop-blur-md'
                    : 'bg-page/80 backdrop-blur-md'
            )}
        >
            <div className="section-container flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-start md:flex-none md:w-1/4">
                    <NavbarLogo />
                </div>

                <div className="hidden flex-1 items-center justify-center md:flex">
                    <NavbarLinks />
                </div>

                <div className="flex items-center justify-end gap-x-2 md:flex-none md:w-1/4">
                    <NavbarCta />
                    <NavbarMobile />
                </div>
            </div>
        </header>
    )
}
