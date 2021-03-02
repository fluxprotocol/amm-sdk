import Big from "big.js";
import calcDistributionHintForScalar from "./calcScalarDistributionPercentages";

describe('calcScalarDistributionPercentages', () => {
    it('should calculate percentages correctly with a 50/50 market', () => {
        const result = calcDistributionHintForScalar(new Big(51), new Big(1), new Big(101));

        expect(result).toStrictEqual([50, 50]);
    });

    it('should be able to handle negative ranges', () => {
        const result = calcDistributionHintForScalar(new Big(0), new Big(-50), new Big(50));

        expect(result).toStrictEqual([50, 50]);
    });
})
