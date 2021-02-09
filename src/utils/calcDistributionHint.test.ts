import calcDistributionHint from "./calcDistributionHint";

describe('calcDistributionHint', () => {
    it('should calculate 50/50 correctly', () => {
        const result = calcDistributionHint([50, 50]).map(hint => hint.toString());

        expect(result).toStrictEqual(['50000000', '50000000']);
    });

    it('should calculate 25/25/25/25 correctly', () => {
        const result = calcDistributionHint([25, 25, 25, 25]).map(hint => hint.toString());

        expect(result).toStrictEqual(['15625000000', '15625000000', '15625000000', '15625000000']);
    });
});
