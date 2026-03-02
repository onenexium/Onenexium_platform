import { Playfair_Display, Inter } from 'next/font/google'

export const playfair = Playfair_Display({
    subsets: ['latin'],
    style: ['normal', 'italic'],
    weight: ['400', '500', '600'],
    variable: '--font-display',
    display: 'swap',
})

export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-body',
    display: 'swap',
})
