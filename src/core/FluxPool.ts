import { ProtocolContract } from "../contracts/ProtocolContract";
import calcDistributionHint from "../utils/calcDistributionHint";
import TokensHolder from "./TokensHolder";

export default class FluxPool {
    protocol: ProtocolContract;
    tokensHolder: TokensHolder;

    constructor(protocolContract: ProtocolContract, tokensHolder: TokensHolder) {
        this.protocol = protocolContract;
        this.tokensHolder = tokensHolder;
    }

    /**
     * Seeds the market pool
     *
     * @param {{
     *         marketId: string,
     *         totalIn: string,
     *         weights: number[],
     *     }} pool
     * @memberof FluxSdk
     */
    seedPool(pool: {
        marketId: string,
        totalIn: string,
        weights: number[],
    }) {
        const totalWeights = pool.weights.reduce((prev, current) => prev + current, 0);

        if (totalWeights !== 100) throw new Error('Weights should equal 100 together');
        if (!this.protocol) throw new Error('Cannot create a market without connecting first');

        const denormWeights = calcDistributionHint(pool.weights);

        this.protocol.seedPool(pool.marketId, pool.totalIn, denormWeights.map(w => w.toFixed(0)));
    }

    /**
     * Publish the pool (Only possible when the market was already seeded)
     *
     * @param {string} collateralTokenId
     * @param {string} marketId
     * @param {string} amountIn This should match the current total supply of the market
     * @memberof FluxSdk
     */
    publishPool(collateralTokenId: string, marketId: string, amountIn: string) {
        const tokenContract = this.tokensHolder.getTokenContract(collateralTokenId);
        const payload = JSON.stringify({
            function: 'publish',
            args: {
                market_id: marketId,
            }
        });

        tokenContract.transferWithVault(amountIn, payload);
    }

    async joinPool(collateralTokenId: string, marketId: string, amountIn: string) {
        const tokenContract = this.tokensHolder.getTokenContract(collateralTokenId);
        const payload = JSON.stringify({
            function: 'join_pool',
            args: {
                market_id: marketId,
            }
        });

        return tokenContract.transferWithVault(amountIn, payload);
    }
}
