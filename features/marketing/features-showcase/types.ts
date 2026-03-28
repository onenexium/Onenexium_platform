import { LucideIcon } from 'lucide-react'

export interface ProblemCard {
    id: string
    title: string
    icon: LucideIcon
    promise: string
    reality: string[]
    bottomText: string
}

export interface ProblemSectionProps {
    className?: string
}

export interface Feature {
    id: string
    title: string
    description: string
    icon: LucideIcon
    label?: string
    size: 'small' | 'large'
    visualType?: 'chat' | 'infra'
}

export interface FeaturesSectionProps {
    className?: string
}
