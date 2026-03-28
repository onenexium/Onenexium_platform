'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { PricingPlan, BillingInterval } from '../types';
import { getDisplayPrice } from '../lib/pricing-calculator';
import { PricingCardFeature } from './pricing-card-feature';
import { PricingBadge } from './pricing-badge';
import { PRICING_COPY } from '../constants';

interface PricingCardProps {
    plan: PricingPlan;
    interval: BillingInterval;
}

export function PricingCard({ plan, interval }: PricingCardProps) {
    const price = getDisplayPrice(plan.monthlyPrice, interval);

    return (
        <div className={cn(
            "relative p-8 rounded-2xl border bg-surface flex flex-col h-full shadow-sm transition-all duration-200",
            plan.recommended
                ? "border-primary shadow-md shadow-primary/10 bg-gradient-to-b from-primary/5 to-transparent z-10 scale-[1.02]"
                : "border-border hover:border-accent/30 hover:shadow-md"
        )}>
            {plan.recommended && <PricingBadge />}

            <div className="mb-8">
                <h3 className="text-xl font-bold text-foreground mb-2">
                    {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {plan.description}
                </p>
            </div>

            <div className="mb-8 flex items-baseline gap-1">
                <div className="relative h-12 flex items-center">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={price}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="text-4xl font-bold text-foreground"
                        >
                            {price}
                        </motion.span>
                    </AnimatePresence>
                </div>
                <span className="text-sm text-muted-foreground font-medium">
                    {price !== "Free" && PRICING_COPY.perMonth}
                </span>
            </div>

            <div className="flex-grow space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                    <PricingCardFeature key={index}>
                        {feature}
                    </PricingCardFeature>
                ))}
            </div>

            <Button
                variant={plan.ctaVariant}
                className={cn(
                    "w-full h-12 font-semibold",
                    plan.recommended ? "shadow-md bg-primary hover:bg-primary/90" : ""
                )}
            >
                {plan.ctaText}
            </Button>
        </div>
    );
}
