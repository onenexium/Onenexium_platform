import { BillingInterval } from '../types';

export function getDisplayPrice(
    monthlyPrice: number,
    interval: BillingInterval
): string {
    if (monthlyPrice === 0) return "Free";

    const price = interval === 'monthly'
        ? monthlyPrice
        : Math.round(monthlyPrice * 0.8);

    return `$${price}`;
}
