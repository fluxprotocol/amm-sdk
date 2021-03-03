import Big from "big.js";

/**
 * Computes the price of each outcome token given their holdings. Returns an array of numbers in the range [0, 1]
 *
 * @param poolBalances - the market maker's balances of outcome tokens
 * @author TokenUnion https://github.com/TokenUnion/amm-maths/blob/master/src/fpmm/price/calcPrice.ts
 */
export default function calcPrice(poolBalances: string[]): number[] {
    const balances = poolBalances.map(h => new Big(h));

    const hasZeroBalances = balances.every(h => h.toString() === "0");
    if (hasZeroBalances) {
        return balances.map(() => 0);
    }

    const product = balances.reduce((a, b) => a.mul(b));
    const denominator = balances.map(h => product.div(h)).reduce((a, b) => a.add(b));
    const prices = balances.map(holding => product.div(holding).div(denominator));

    return prices.map(price => +price.valueOf());
};
