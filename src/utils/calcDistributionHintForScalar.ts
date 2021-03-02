import Big from "big.js";
import calcDistributionHint from "./calcDistributionHint";

/**
 * Calculates the distribution hint for scalar markets
 *
 * @export
 * @param {Big} initialValue
 * @param {Big} lowerBound
 * @param {Big} upperBound
 * @return {Big[]}
 */
export default function calcDistributionHintForScalar(initialValue: Big, lowerBound: Big, upperBound: Big) {
    const range = upperBound.sub(lowerBound);
    const diffLowerBound = initialValue.sub(lowerBound);
    const diffUpperBound = upperBound.sub(initialValue);
    const percLowerBound = diffLowerBound.div(range).mul(100);
    const percUpperBound = diffUpperBound.div(range).mul(100);

    return calcDistributionHint([
        percLowerBound.toNumber(),
        percUpperBound.toNumber(),
    ]);
}
