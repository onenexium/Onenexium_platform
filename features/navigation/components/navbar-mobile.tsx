'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/shared/components/ui/sheet'
import { cn } from '@/shared/lib/utils'
import { NAV_LINKS, SIGN_IN_HREF, SIGN_UP_HREF } from '../constants'
import { NavbarLogo } from './navbar-logo'

export function NavbarMobile() {
    const pathname = usePathname()
    const [open, setOpen] = React.useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label="Toggle menu"
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-8">
                <SheetHeader>
                    <SheetTitle className="text-left">
                        <NavbarLogo />
                    </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    'text-lg font-medium transition-colors hover:text-text-primary',
                                    isActive ? 'text-text-primary' : 'text-text-muted'
                                )}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>
                <div className="flex flex-col gap-3">
                    <Button asChild variant="ghost" className="w-full justify-start">
                        <Link href={SIGN_IN_HREF} onClick={() => setOpen(false)}>
                            Sign in
                        </Link>
                    </Button>
                    <Button asChild className="w-full justify-start">
                        <Link href={SIGN_UP_HREF} onClick={() => setOpen(false)}>
                            Get started free
                        </Link>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
