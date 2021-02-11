import TokenContract from "../contracts/TokenContract";
import { createSdkConfig } from "../models/SdkConfig";
import TokensHolder from "./TokensHolder";

describe('TokensHolder', () => {
    let tokensHolder: TokensHolder;

    beforeEach(() => {
        // @ts-ignore
        tokensHolder = new TokensHolder(jest.fn(), createSdkConfig({}));
    });

    describe('getTokenContract', () => {
        it('Should create a new token', () => {
            tokensHolder.getTokenContract('testtoken.near');

            expect(tokensHolder.tokens.size).toBe(1);
            expect(tokensHolder.tokens.has('testtoken.near')).toBe(true);
        });

        it('Should not store an existing token', () => {
            tokensHolder.getTokenContract('testtoken.near');
            tokensHolder.getTokenContract('testtoken.near');
            tokensHolder.getTokenContract('testtoken.near');

            expect(tokensHolder.tokens.size).toBe(1);
            expect(tokensHolder.tokens.has('testtoken.near')).toBe(true);
        });
    });
});
