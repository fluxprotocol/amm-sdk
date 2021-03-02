import Big from "big.js";
import sortBig from "./sortBig";

describe('sortBig', () => {
    it('should sort big.js numbers from large to small', () => {
        const result = sortBig([new Big(1), new Big(100), new Big(-1), new Big(50)]);
        const resultAsString = result.map(a => a.toString());

        expect(resultAsString).toStrictEqual(['-1', '1', '50', '100']);
    })
});
