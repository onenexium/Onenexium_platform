import { Twitter, Linkedin, Github, Youtube } from 'lucide-react'
import { FooterData } from './types'

export const FOOTER_DATA: FooterData = {
    tagline: "From conversation to live website.",
    socials: [
        { platform: 'Twitter', href: 'https://twitter.com/onenexium', icon: Twitter },
        { platform: 'LinkedIn', href: 'https://linkedin.com/company/onenexium', icon: Linkedin },
        { platform: 'GitHub', href: 'https://github.com/onenexium', icon: Github },
        { platform: 'YouTube', href: 'https://youtube.com/@onenexium', icon: Youtube },
    ],
    columns: [
        {
            title: 'Product',
            links: [
                { label: 'Features', href: '#features' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Changelog', href: '/changelog' },
                { label: 'Roadmap', href: '/roadmap' },
                { label: 'API', href: '/api-docs' },
            ]
        },
        {
            title: 'Resources',
            links: [
                { label: 'Blog', href: '/blog' },
                { label: 'Documentation', href: '/docs' },
                { label: 'Examples', href: '/examples' },
                { label: 'Customers', href: '/customers' },
                { label: 'Affiliate program', href: '/affiliate' },
            ]
        },
        {
            title: 'Company',
            links: [
                { label: 'About', href: '/about' },
                { label: 'Careers', href: '/careers' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Contact', href: '/contact' },
            ]
        }
    ],
    legalLinks: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Status', href: '/status' },
    ],
    copyright: `© ${new Date().getFullYear()} One Nexium. All rights reserved.`,
}
