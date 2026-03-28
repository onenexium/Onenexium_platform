import { LucideIcon } from 'lucide-react'

export interface Step {
    id: number
    title: string
    description: string
    tag: string
    icon: LucideIcon
}

export type StepId = 0 | 1 | 2
