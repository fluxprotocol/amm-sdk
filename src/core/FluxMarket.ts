import Big from "big.js";
import { DEFAULT_FUNGIBLE_TOKEN_CONTRACT_ID, DEFAULT_SLIPPAGE, DEFAULT_SWAP_FEE, MAX_GAS, STORAGE_BASE } from "../config";
import { ProtocolContract } from "../contracts/ProtocolContract";
import { TokenWhitelist } from "../models/TokenWhitelist";
import { TransactionParams } from "../models/TransactionParams";
import TokensHolder from "./TokensHolder";

export default class FluxMarket {
    protocol: ProtocolContract;
    tokens: TokensHolder;

    constructor(protocol: ProtocolContract, tokensHolder: TokensHolder) {
        this.protocol = protocol;
        this.tokens = tokensHolder;
    }

    async createMarket(market: {
        description: string,
        outcomes: string[],
        categories?: string[],
        endDate: Date,
        resolutionDate?: Date,
        extraInfo: string,
        swapFee?: string,
        collateralTokenId?: string,
        isScalar?: boolean,
    }) {
        if (!this.protocol) throw new Error('Cannot create a market without connecting first');

        return this.protocol.createMarket(
            market.description,
            market.outcomes,
            market.categories || [],
            market.endDate,
            market.resolutionDate ?? market.endDate,
            market.extraInfo,
            market.swapFee || DEFAULT_SWAP_FEE,
            market.collateralTokenId || DEFAULT_FUNGIBLE_TOKEN_CONTRACT_ID,
            market.isScalar ?? false,
        );
    }

    async buy(buyParams: {
        collateralTokenId: string,
        marketId: string,
        outcomeId: number,
        amountOut: string,
        amountIn: string,
        slippage?: number,
    }, txParams?: TransactionParams) {
        const params = {
            slippage: DEFAULT_SLIPPAGE,
            ...buyParams,
        };

        const minSharesOut = new Big(params.amountOut).mul(new Big(100).sub(params.slippage)).div(100).round(0, 0).toString();
        const tokenContract = this.tokens.getTokenContract(params.collateralTokenId);

        const payload = JSON.stringify({
            function: 'buy',
            args: {
                market_id: params.marketId,
                outcome_target: params.outcomeId,
                min_shares_out: minSharesOut,
            }
        });

        const finalTxParams: TransactionParams = {
            value: STORAGE_BASE.mul(2).toString(),
            ...txParams,
        };

        return tokenContract.transferCall(params.amountIn, payload, finalTxParams);
    }

    async sell(sellParams: {
        marketId: string,
        amountOut: string,
        amountIn: string,
        outcomeId: number,
        slippage?: number,
    }, txParams?: TransactionParams) {
        const params = {
            slippage: DEFAULT_SLIPPAGE,
            ...sellParams,
        };

        const slippageIn = new Big(params.amountIn).mul(new Big(100).add(params.slippage)).div(100).round(0, 0).toString();

        return this.protocol.sell(
            params.marketId,
            params.outcomeId,
            params.amountOut,
            slippageIn,
            txParams,
        );
    }

    async claimEarnings(marketId: string) {
        return this.protocol.claimEarnings(marketId);
    }

    async burnOutcomeTokensRedeemCollateral(marketId: string, toBurn: string) {
        return this.protocol.burnOutcomeTokensRedeemCollateral(marketId, toBurn);
    }

    async getTokenWhitelist(): Promise<TokenWhitelist[]> {
        return this.protocol.getTokenWhitelist();
    }
}
