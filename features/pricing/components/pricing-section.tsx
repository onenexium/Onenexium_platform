'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, RefreshCw, CreditCard } from 'lucide-react';
import { PricingToggle } from './pricing-toggle';
import { PricingCard } from './pricing-card';
import { PRICING_DATA, PRICING_COPY } from '../constants';
import { usePricingToggle } from '../hooks/use-pricing-toggle';

export function PricingSection() {
    const { interval, setInterval } = usePricingToggle();

    return (
        <section className="py-24 md:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
                        {PRICING_COPY.headline}
                    </h2>
                    <p className="text-lg text-text-muted">
                        {PRICING_COPY.subheadline}
                    </p>

                    <div className="pt-8">
                        <PricingToggle interval={interval} onChange={setInterval} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 max-w-7xl mx-auto items-stretch">
                    {PRICING_DATA.plans.map((plan) => (
                        <PricingCard
                            key={plan.name}
                            plan={plan}
                            interval={interval}
                        />
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-border/50 max-w-4xl mx-auto">
                    <div className="text-center space-y-2 mb-10">
                        <p className="text-sm text-text-muted font-medium italic">
                            {PRICING_COPY.trustLabel}
                        </p>
                        <p className="text-xs text-text-disabled uppercase tracking-widest font-bold">
                            {PRICING_COPY.guaranteeLabel}
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                        <TrustIcon icon={ShieldCheck} label="Secure AWS Guard" />
                        <TrustIcon icon={RefreshCw} label="Daily Backups" />
                        <TrustIcon icon={CreditCard} label="SSL Encrypted" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function TrustIcon({ icon: Icon, label }: { icon: any; label: string }) {
    return (
        <div className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors group">
            <Icon size={18} className="text-accent group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
        </div>
    );
}
