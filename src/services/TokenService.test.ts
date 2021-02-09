import { formatToken, toToken } from "./TokenService";

describe('TokenService', () => {
    describe('formatToken', () => {
        it('should be able to format a big number to "2"', () => {
            const result = formatToken('2000000000000000000', 18, 0);

            expect(result).toBe('2');
        });

        it('should be able to format a big number to "200" when decimals decrease to 16', () => {
            const result = formatToken('2000000000000000000', 16, 0);

            expect(result).toBe('200');
        });
    });

    describe('toToken', () => {
        it('should be able to convert back to a big number when inserting "2"', () => {
            const result = toToken('2', 18);

            expect(result).toBe('2000000000000000000');
        });

        it('should be able to convert back to a big number when inserting "200" with decimals 16', () => {
            const result = toToken('200', 16);

            expect(result).toBe('2000000000000000000');
        });
    });
});
