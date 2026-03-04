'use client';

import { useState } from 'react';
import { BillingInterval } from '../types';

export function usePricingToggle() {
    const [interval, setInterval] = useState<BillingInterval>('monthly');

    const isAnnual = interval === 'annual';

    return {
        interval,
        setInterval,
        isAnnual,
    };
}
