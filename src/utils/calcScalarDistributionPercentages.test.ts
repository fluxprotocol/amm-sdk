import Big from "big.js";
import calcDistributionHintForScalar from "./calcScalarDistributionPercentages";
import calcScalarValue from "./calcScalarValue";

describe('calcScalarDistributionPercentages', () => {
    it('should calculate percentages correctly with a 50/50 market', () => {
        const result = calcDistributionHintForScalar(new Big(51), new Big(1), new Big(101));

        expect(result).toStrictEqual([50, 50]);
    });

    it('should be able to handle negative ranges', () => {
        const result = calcDistributionHintForScalar(new Big(0), new Big(-50), new Big(50));

        expect(result).toStrictEqual([50, 50]);
    });

    it('should correctly calculate 65 when range is 50 - 100', () => {
        const lowerBound = new Big(50);
        const upperBound = new Big(100);
        const initialValue = new Big(65);
        const result = calcDistributionHintForScalar(initialValue, lowerBound, upperBound);
        const value = calcScalarValue(lowerBound, upperBound, new Big(result[1] / 100));

        expect(value.toString()).toStrictEqual(initialValue.toString());
    });

    it('should correctly calculate -2 when range is -50 - 50', () => {
        const lowerBound = new Big(-50);
        const upperBound = new Big(50);
        const initialValue = new Big(-2);
        const result = calcDistributionHintForScalar(initialValue, lowerBound, upperBound);
        const value = calcScalarValue(lowerBound, upperBound, new Big(result[1] / 100));

        expect(value.toString()).toStrictEqual(initialValue.toString());
    });

    it('should correctly calculate 85 when range is 0 - 100', () => {
        const lowerBound = new Big(0);
        const upperBound = new Big(100);
        const initialValue = new Big(85);
        const result = calcDistributionHintForScalar(initialValue, lowerBound, upperBound);
        const value = calcScalarValue(lowerBound, upperBound, new Big(result[1] / 100));

        expect(value.toString()).toStrictEqual(initialValue.toString());
    });
})
