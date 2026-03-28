import { PricingData } from './types';

export const PRICING_DATA: PricingData = {
    discountPercentage: 20,
    plans: [
        {
            name: "Starter",
            description: "Try it. See what AI can build.",
            monthlyPrice: 0,
            features: [
                "1 site",
                "AI chat — 50 messages/day",
                ".onenexium.com subdomain",
                "Basic features only",
                "Community support",
            ],
            ctaText: "Start for free",
            ctaVariant: "outline",
            recommended: false,
        },
        {
            name: "Pro",
            description: "For serious businesses that need a real website.",
            monthlyPrice: 29,
            features: [
                "3 sites",
                "Unlimited AI chat",
                "Custom domain + SSL",
                "Full backend — DB, payments, email, bookings",
                "Custom admin panel",
                "Priority build queue",
                "Version history + 1-click rollback",
                "Email support",
            ],
            ctaText: "Start 14-day free trial",
            ctaVariant: "primary",
            recommended: true,
        },
        {
            name: "Agency",
            description: "For agencies building sites for clients.",
            monthlyPrice: 99,
            features: [
                "Unlimited sites",
                "Everything in Pro",
                "White-label option",
                "Client management dashboard",
                "5 team members",
                "Priority support + onboarding call",
            ],
            ctaText: "Start 14-day free trial",
            ctaVariant: "outline",
            recommended: false,
        },
    ],
};

export const PRICING_COPY = {
    headline: "Simple, transparent pricing",
    subheadline: "Choose the plan that's right for your business growth.",
    monthly: "Monthly",
    annual: "Annual",
    saveLabel: "Save 20%",
    perMonth: "/month",
    trustLabel: "All plans include AWS infrastructure, SSL, CDN, email, and daily backups.",
    guaranteeLabel: "No hidden fees. Cancel anytime. 30-day money-back guarantee.",
    mostPopular: "Most Popular",
};
