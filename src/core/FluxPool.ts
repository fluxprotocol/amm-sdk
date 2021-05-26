import Big from "big.js";
import { STORAGE_BASE } from "../config";
import { ProtocolContract } from "../contracts/ProtocolContract";
import { TransactionParams } from "../models/TransactionParams";
import calcDistributionHint from "../utils/calcDistributionHint";
import TokensHolder from "./TokensHolder";

export default class FluxPool {
    protocol: ProtocolContract;
    tokensHolder: TokensHolder;

    constructor(protocolContract: ProtocolContract, tokensHolder: TokensHolder) {
        this.protocol = protocolContract;
        this.tokensHolder = tokensHolder;
    }

    async addLiquidity(collateralTokenId: string, marketId: string, amountIn: string, weights: number[] = [], txParams?: TransactionParams) {
        const tokenContract = this.tokensHolder.getTokenContract(collateralTokenId);
        let storageRequired = STORAGE_BASE;
        let weightIndication: string[] = [];

        // Allow reseeding of markets
        if (weights.length) {
            const totalWeights = weights.reduce((prev, current) => prev + current, 0);
            if (totalWeights !== 100) throw new Error('Weights should equal 100 together');

            storageRequired = new Big('80000000000000000000000').mul(weights.length);
            weightIndication = calcDistributionHint(weights).map(w => w.toFixed(0));
        }

        const payload = JSON.stringify({
            AddLiquidityArgs: {
                market_id: marketId,
                weight_indication: weightIndication.length ? weightIndication : null,
            },
        });

        return tokenContract.transferCall(amountIn, payload, {
            value: storageRequired.toString(),
            ...txParams,
        });
    }

    async exitPool(marketId: string, totalIn: string) {
        return this.protocol.exitPool(marketId, totalIn);
    }
}
