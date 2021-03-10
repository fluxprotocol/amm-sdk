import Big from "big.js";

/**
 * Calculates the distribution percentages hint for scalar markets
 * can be used in combination with calcDistributionHint to get the actual distribution
 * used in the AMM protocol
 *
 * @export
 * @param {Big} pointerValue
 * @param {Big} lowerBound
 * @param {Big} upperBound
 * @return {number[]} The distribution percentages of the
 */
export default function calcScalarDistributionPercentages(pointerValue: Big, lowerBound: Big, upperBound: Big): number[] {
    const range = upperBound.sub(lowerBound);
    const diffLowerBound = pointerValue.sub(lowerBound);
    const diffUpperBound = upperBound.sub(pointerValue);
    const percLowerBound = diffLowerBound.div(range).mul(100);
    const percUpperBound = diffUpperBound.div(range).mul(100);

    return [
        percUpperBound.toNumber(),
        percLowerBound.toNumber(),
    ];
}
