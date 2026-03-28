'use client'

import React from 'react'
import Link from 'next/link'
import { motion, Variants } from 'motion/react'
import { cn } from '@/shared/lib/utils'
import { useReducedMotion } from '@/shared/hooks/use-reduced-motion'
import { siteConfig } from '@/config/site'
import { FOOTER_DATA } from '../constants'

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
}

export function Footer() {
    const isReducedMotion = useReducedMotion()

    return (
        <footer className="w-full bg-subtle/50 border-t border-border py-[var(--section-py)]">
            <div className="section-container">
                <motion.div
                    variants={containerVariants}
                    initial={isReducedMotion ? "visible" : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
                >
                    {/* Column 1: Brand */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <span className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors">
                                {siteConfig.name}
                            </span>
                        </Link>
                        <p className="text-text-muted max-w-xs leading-relaxed">
                            {FOOTER_DATA.tagline}
                        </p>
                        <div className="flex items-center space-x-4">
                            {FOOTER_DATA.socials.map((social) => (
                                <Link
                                    key={social.platform}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg text-text-muted hover:text-accent hover:bg-accent/5 transition-all"
                                    aria-label={social.platform}
                                >
                                    <social.icon size={20} />
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* Columns 2-4: Links */}
                    {FOOTER_DATA.columns.map((column) => (
                        <motion.div key={column.title} variants={itemVariants} className="space-y-6">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-text-primary">
                                {column.title}
                            </h4>
                            <ul className="space-y-4">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-text-muted hover:text-accent transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Strip */}
                <motion.div
                    initial={isReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <p className="text-sm text-text-muted font-medium">
                            {FOOTER_DATA.copyright}
                        </p>
                    </div>

                    <div className="flex items-center space-x-6">
                        {FOOTER_DATA.legalLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-xs font-medium text-text-disabled hover:text-accent transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}

