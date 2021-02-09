import Big from "big.js";

export function formatToken(amount: string, decimals = 18, dp = 2): string {
    const denominator = new Big(10).pow(decimals);
    return new Big(amount).div(denominator).toFixed(dp);
}

export function toToken(amount: string, decimals = 18): string {
    const denominator = new Big(10).pow(decimals);
    return new Big(amount).mul(denominator).toFixed(0);
}