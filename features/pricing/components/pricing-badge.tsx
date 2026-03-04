'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { PRICING_COPY } from '../constants';

export function PricingBadge() {
    return (
        <div className="absolute top-0 right-6 -translate-y-1/2">
            <span className="inline-flex bg-primary text-primary-foreground rounded-full text-xs font-semibold px-3 py-1 shadow-sm">
                {PRICING_COPY.mostPopular}
            </span>
        </div>
    );
}
