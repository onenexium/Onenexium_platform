'use client';

import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/shared/lib/utils';
import { BillingInterval } from '../types';
import { PRICING_COPY } from '../constants';

interface PricingToggleProps {
    interval: BillingInterval;
    onChange: (interval: BillingInterval) => void;
}

export function PricingToggle({ interval, onChange }: PricingToggleProps) {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center rounded-full bg-muted p-1 border border-border">
                <button
                    onClick={() => onChange('monthly')}
                    className={cn(
                        "relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full",
                        interval === 'monthly' ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    {interval === 'monthly' && (
                        <motion.div
                            layoutId="pricing-pill"
                            className="absolute inset-0 bg-surface rounded-full shadow-sm border border-border/60"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{PRICING_COPY.monthly}</span>
                </button>
                <button
                    onClick={() => onChange('annual')}
                    className={cn(
                        "relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full",
                        interval === 'annual' ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    {interval === 'annual' && (
                        <motion.div
                            layoutId="pricing-pill"
                            className="absolute inset-0 bg-surface rounded-full shadow-sm border border-border/60"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{PRICING_COPY.annual}</span>
                </button>
            </div>
            {interval === 'annual' && (
                <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-success text-xs font-semibold uppercase tracking-wider"
                >
                    {PRICING_COPY.saveLabel}
                </motion.span>
            )}
        </div>
    );
}
