import Big from "big.js";
import calcDistributionHintForScalar from "./calcDistributionHintForScalar";

describe('calcDistributionHintForScalar', () => {
    it('should calculate percentages correctly and give back the distribution hint', () => {
        const result = calcDistributionHintForScalar(new Big(51), new Big(1), new Big(101)).map(a => a.toString());

        expect(result).toStrictEqual(['50000000', '50000000']);
    });

    it('should be able to handle negative ranges', () => {
        const result = calcDistributionHintForScalar(new Big(0), new Big(-50), new Big(50)).map(a => a.toString());

        expect(result).toStrictEqual(['50000000', '50000000']);
    });
})
