import Big from "big.js";
import { calcSellAmountInCollateral } from "../core/FluxSdkUtils";

describe('calcSellAmountInCollateral', () => {
    it('should calculate the sell amount', () => {
        const amount = calcSellAmountInCollateral(
            new Big('200000000000000000000'),
            0,
            [
                new Big('100000000000000000000'),
                new Big('100000000000000000000'),
            ],
            0.02,
        );

        expect(amount?.toString()).toBe('57407070887436685217');
    });

    it('should throw and error when the outcomeId is not correctly set', () => {
        const result = () => {
            const amount = calcSellAmountInCollateral(
                new Big('200000000000000000000'),
                2,
                [
                    new Big('100000000000000000000'),
                    new Big('100000000000000000000'),
                ],
                0.02,
            );
        }

        expect(result).toThrowError();
    });
});
