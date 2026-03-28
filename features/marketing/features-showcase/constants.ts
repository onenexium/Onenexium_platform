import { Sparkles, Globe, Code, Brain, Server, LayoutDashboard, CreditCard, Lock } from 'lucide-react'
import { ProblemCard, Feature } from './types'

export const PROBLEM_TOP_LABEL = 'THE PAINFUL TRUTH'
export const PROBLEM_HEADLINE = 'Every other tool stops here.'

export const PROBLEM_CARDS: ProblemCard[] = [
    {
        id: 'ai-code-generators',
        title: 'Static AI Generators',
        icon: Sparkles,
        promise: 'Your beautiful business site is ready!',
        reality: [
            'Drowning in technical maintenance',
            'No real business logic or automation',
            'Generic design that looks like everyone else',
            'Hidden fees for basic business tools',
        ],
        bottomText: 'A hobbyist tool for professional needs.',
    },
    {
        id: 'website-builders',
        title: 'Rigid Visual Builders',
        icon: Globe,
        promise: 'Your professional presence is live!',
        reality: [
            'Stuck inside their gated ecosystem',
            'Slow performance kills your conversions',
            'Can\'t scale features as you grow',
            'You don\'t truly own your data or site',
        ],
        bottomText: 'Rent your digital home, never own it.',
    },
    {
        id: 'hire-developer',
        title: 'Agencies & Freelancers',
        icon: Code,
        promise: 'We\'ll build exactly what you need!',
        reality: [
            '$10,000 – $40,000 upfront investment',
            'Months of delays and missed deadlines',
            'You are locked into their maintenance fees',
            'Impossible to make small updates yourself',
        ],
        bottomText: 'Wait months for what you need today.',
    },
]

export const PROBLEM_TRANSITION_UP = 'There is a better way.'
export const PROBLEM_TRANSITION_DOWN =
  "One Nexium is the only platform that takes you from idea to live website without a single configuration screen."

export const FEATURES: Feature[] = [
    {
        id: 'intelligence',
        icon: Brain,
        label: 'INTELLIGENCE',
        title: 'AI that masters your unique brand voice',
        description: 'Most tools copy-paste generic content. One Nexium deeply learns your industry, brand identity, and customer psychology — then generates a strategy and presence that actually converts visitors into lifelong customers.',
        size: 'large',
        visualType: 'chat',
    },
    {
        id: 'capabilities',
        icon: Server,
        label: 'CAPABILITIES',
        title: 'Enterprise-grade power, zero technical friction',
        description: 'Gain the power of a Fortune 500 tech stack without hiring a single engineer. We handle the heavy lifting — performance, security, global scaling, and data management — so you can focus entirely on your business growth.',
        size: 'large',
        visualType: 'infra',
    },
    {
        id: 'admin-panel',
        icon: LayoutDashboard,
        title: 'Your Digital Command Center',
        description: 'A custom, intuitive dashboard tailored to your business. Manage your entire operation — from inventory to customer relationships — with zero code required.',
        size: 'small',
    },
    {
        id: 'payments',
        icon: CreditCard,
        title: 'Seamless Revenue Engines',
        description: 'Turn your site into a high-conversion checkout machine. Subscriptions, online orders, and global payments are integrated and ready to launch on day one.',
        size: 'small',
    },
    {
        id: 'presence',
        icon: Globe,
        title: 'Global Professional Presence',
        description: 'Go live on your own custom domain with instant, high-speed delivery worldwide. Build credibility and trust with your customers from the very first click.',
        size: 'small',
    },
    {
        id: 'freedom',
        icon: Lock,
        title: 'Total Strategic Freedom',
        description: 'You own every line of code and every byte of data. Scale, export, or evolve your platform at any time. We provide the power; you maintain the control.',
        size: 'small',
    },
]
