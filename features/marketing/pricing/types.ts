export type BillingInterval = 'monthly' | 'annual';

export interface PricingPlan {
    name: string;
    description: string;
    monthlyPrice: number;
    features: string[];
    ctaText: string;
    ctaVariant: 'primary' | 'outline' | 'ghost' | 'link';
    recommended: boolean;
}

export interface PricingData {
    plans: PricingPlan[];
    discountPercentage: number;
}
