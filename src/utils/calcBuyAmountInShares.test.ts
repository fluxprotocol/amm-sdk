import Big from "big.js";
import { calcBuyAmountInShares } from "../core/FluxSdkUtils";

describe('calcBuyAmountInShares', () => {
    it('should be able to calculate the amount you can buy', () => {
        const result = calcBuyAmountInShares(
            new Big('50000000000000000000'),
            0,
            [
                new Big('100000000000000000000'),
                new Big('100000000000000000000'),
            ],
            0.2,
            18,
        );

        expect(result.toFixed(0)).toBe('68571428571428571428');
    });

    it('should throw and error when the outcomeId is not correctly set', () => {
        const result = () => {
            const amount = calcBuyAmountInShares(
                new Big('200000000000000000000'),
                2,
                [
                    new Big('100000000000000000000'),
                    new Big('100000000000000000000'),
                ],
                0.02,
                18,
            );
        }

        expect(result).toThrowError();
    });
});
