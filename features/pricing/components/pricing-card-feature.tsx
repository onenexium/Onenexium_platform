'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface PricingCardFeatureProps {
    children: React.ReactNode;
}

export function PricingCardFeature({ children }: PricingCardFeatureProps) {
    return (
        <div className="flex items-start gap-2">
            <div className="text-emerald-500 w-4 h-4 mt-0.5 flex-shrink-0">
                <Check size={16} strokeWidth={3} />
            </div>
            <span className="text-sm text-muted-foreground leading-tight">
                {children}
            </span>
        </div>
    );
}
