import Big from "big.js";
import { STORAGE_BASE } from "../config";
import { ProtocolContract } from "../contracts/ProtocolContract";
import TokenContract from "../contracts/TokenContract";
import ProtocolContractMock from "../test/mocks/ProtocolContractMock";
import TokenContractMock from "../test/mocks/TokenContractMock";
import TokensHolderMock from "../test/mocks/TokensHolderMock";
import FluxPool from "./FluxPool";

describe('FluxPool', () => {
    let fluxPool: FluxPool;
    let tokenContract: TokenContract;
    let protocolContract: ProtocolContract;

    beforeEach(() => {
        // @ts-ignore
        tokenContract = new TokenContractMock();

        // @ts-ignore
        protocolContract = new ProtocolContractMock();

        // @ts-ignore
        fluxPool = new FluxPool(protocolContract, new TokensHolderMock(tokenContract));
    });

    describe('addLiquidity', () => {
        it('should be able to add liquidity without adding weights', async () => {
            await fluxPool.addLiquidity('test.near', '1', '100000');

            const expectedPayload = JSON.stringify({
                function: "add_liquidity",
                args: {
                    market_id: '1',
                    weight_indication: null,
                }
            });

            expect(fluxPool.tokensHolder.getTokenContract).toHaveBeenCalledWith('test.near');
            expect(tokenContract.transferCall).toHaveBeenCalledWith('100000', expectedPayload, {
                value: '30000000000000000000000',
            });
        });

        it('should be able to seed the pool', async () => {
            await fluxPool.addLiquidity('test.near', '1', '100000', [50, 50]);

            const expectedPayload = JSON.stringify({
                function: "add_liquidity",
                args: {
                    market_id: '1',
                    weight_indication: ['50000000', '50000000'],
                }
            });

            expect(fluxPool.tokensHolder.getTokenContract).toHaveBeenCalledWith('test.near');
            expect(tokenContract.transferCall).toHaveBeenCalledWith('100000', expectedPayload, {
                value: new Big('160000000000000000000000').toString()
            });
        });

        it('should not be able to seed when weight do not equal 100 together', async () => {
            expect.assertions(1);

            try {
                await fluxPool.addLiquidity('test.near', '1', '100000', [50, 60]);
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
            }
        });
    });

    describe('exitPool', () => {
        it('should be able to call the protocol class with the exact parameters given', async () => {
            await fluxPool.exitPool('1', '10000');

            expect(protocolContract.exitPool).toHaveBeenCalledWith('1', '10000');
        });
    });
});
