import { LucideIcon } from 'lucide-react'

export interface FooterLink {
    label: string
    href: string
}

export interface FooterColumn {
    title: string
    links: FooterLink[]
}

export interface SocialLink {
    platform: string
    href: string
    icon: LucideIcon
}

export interface FooterData {
    tagline: string
    socials: SocialLink[]
    columns: FooterColumn[]
    legalLinks: FooterLink[]
    copyright: string
}
