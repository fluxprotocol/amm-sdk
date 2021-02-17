import Big from "big.js";
import { Account, Contract } from "near-api-js";
import { MAX_GAS, STORAGE_BASE } from "../config";
import { SdkConfig } from "../models/SdkConfig";

export class ProtocolContract {
    contract: Contract;

    constructor(account: Account, sdkConfig: SdkConfig) {
        this.contract = new Contract(account, sdkConfig.protocolContractId, {
            viewMethods: [],
            changeMethods: ['create_market', 'seed_pool', 'sell', 'exit_pool', 'claim_earnings', 'burn_outcome_tokens_redeem_collateral'],
        });
    }

    async burnOutcomeTokensRedeemCollateral(marketId: string, toBurn: string) {
        // @ts-ignore
        return this.contract.burn_outcome_tokens_redeem_collateral({
            market_id: marketId,
            to_burn: toBurn,
        }, MAX_GAS.toString(), STORAGE_BASE.toString());
    }

    async createMarket(
        description: string,
        outcomes: string[],
        categories: string[],
        endDate: Date,
        extraInfo: string,
        swapFee: string,
        collateralTokenId: string,
    ) {
        const storageRequired = STORAGE_BASE.mul(outcomes.length);

        // @ts-ignore
        return this.contract.create_market({
            description,
            extra_info: extraInfo,
            outcomes: outcomes.length,
            outcome_tags: outcomes,
            end_time: endDate.getTime().toString(),
            collateral_token_id: collateralTokenId,
            categories,
            swap_fee: swapFee,
        }, MAX_GAS.toString(), storageRequired.toString());
    }

    async seedPool(
        marketId: string,
        totalIn: string,
        denormWeights: string[],
    ): Promise<void> {
        // Each weight is used seperatly in near requiring more storage
        const storageRequired = new Big('80000000000000000000000').mul(denormWeights.length);

        // @ts-ignore
        return this.contract.seed_pool({
            market_id: marketId,
            total_in: totalIn,
            denorm_weights: denormWeights,
        }, MAX_GAS.toString(), storageRequired.toString());
    }

    async exitPool(marketId: string, totalIn: string) {
        // @ts-ignore
        return this.contract.exit_pool({
            market_id: marketId,
            total_in: totalIn,
        }, MAX_GAS.toString(), STORAGE_BASE.toString());
    }

    async sell(marketId: string, outcomeId: number, amountOut: string, amountIn: string) {
        // @ts-ignore
        return this.contract.sell({
            market_id: marketId,
            collateral_out: amountOut,
            outcome_target: outcomeId,
            max_shares_in: amountIn,
        }, MAX_GAS.toString(), STORAGE_BASE.mul(2).toString())
    }

    async claimEarnings(marketId: string) {
        // @ts-ignore
        this.contract.claim_earnings({
            market_id: marketId,
        }, MAX_GAS, STORAGE_BASE)
    }
}
