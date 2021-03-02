import Big from "big.js";
import calcMedian from "./calcMedian";

describe('calcMedian', () => {
    it('should calculate the median value based on a set of nums', () => {
        const result = calcMedian([new Big(0), new Big(100)]);

        expect(result.toString()).toBe('50');
    });

    it('should calculate the median value based on a set of nums with floating points', () => {
        const result = calcMedian([new Big(1.2), new Big(100)]);

        expect(result.toString()).toBe('50.6');
    });

    it('should be able to find the median with negative values', () => {
        const result = calcMedian([new Big(-50), new Big(51)]);

        expect(result.toString()).toBe('0.5');
    });
});
