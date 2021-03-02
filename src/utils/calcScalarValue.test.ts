import Big from "big.js";
import calcScalarValue from "./calcScalarValue";

describe('calcScalarValue', () => {
    it('should get ~67.08 when range is 15-75 and price is L0.87 S0.13', () => {
        const result = calcScalarValue(new Big('15'), new Big('75'), new Big('0.8679935334903056068323032698129956'));

        expect(result.toString()).toBe('67.079612009418336409938196188779736');
    });

    it('should be able to get 50 when range is 0-100 and price is L0.50 S0.50', () => {
        const result = calcScalarValue(new Big('0'), new Big('100'), new Big('0.50'));

        expect(result.toString()).toBe('50');
    });

    it('should be able to get 0 when range is -50 - 50 and price is L0.50 S0.50', () => {
        const result = calcScalarValue(new Big('-50'), new Big('50'), new Big('0.50'));

        expect(result.toString()).toBe('0');
    });
});
