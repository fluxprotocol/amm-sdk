import Big from "big.js";
import { Account, Contract, WalletConnection } from "near-api-js";
import { MAX_GAS, STORAGE_BASE } from "../config";
import { SdkConfig } from "../models/SdkConfig";
import { TokenWhitelist } from "../models/TokenWhitelist";
import { TransactionParams } from "../models/TransactionParams";
import { batchSendTransactions, TransactionOption } from "../services/NearService";
import { getOracleConfig } from "../services/OracleService";
import { createStorageTransaction } from "../services/StorageManagerService";

export class ProtocolContract {
    contract: Contract;
    account: Account;
    sdkConfig: SdkConfig;
    walletConnection: WalletConnection;

    constructor(account: Account, sdkConfig: SdkConfig, walletConnection: WalletConnection) {
        this.sdkConfig = sdkConfig;
        this.account = account;
        this.walletConnection = walletConnection;
        this.contract = new Contract(account, sdkConfig.protocolContractId, {
            viewMethods: ['get_collateral_whitelist'],
            changeMethods: ['create_market', 'seed_pool', 'sell', 'exit_pool', 'claim_earnings', 'burn_outcome_tokens_redeem_collateral'],
        });
    }

    async getTokenWhitelist(): Promise<TokenWhitelist[]> {
        // @ts-ignore
        const whitelist: [string, number][] = await this.contract.get_collateral_whitelist();
        return whitelist.map((token) => ({
            tokenId: token[0],
            decimals: token[1],
        }));
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
        resolutionDate: Date,
        extraInfo: string,
        swapFee: string,
        collateralTokenId: string,
        isScalar: boolean,
        scalarMultiplier: string,
        challengePeriod?: string,
    ) {
        const transactions: TransactionOption[] = [];
        const storageRequired = STORAGE_BASE.mul(outcomes.length + 1);

        // Fetch Oracle Bond size
        const oracleConfig = await getOracleConfig(this.sdkConfig, this.walletConnection);
        const ammStorageTransaction = await createStorageTransaction(this.sdkConfig.protocolContractId, this.account.accountId, this.walletConnection, storageRequired);
        const oracleStorageTransaction = await createStorageTransaction(this.sdkConfig.oracleContractId, this.account.accountId, this.walletConnection, storageRequired);
        let finalchallengePeriod = new Big(challengePeriod ?? this.sdkConfig.defaultChallengePeriod);

        // Make sure our challenge period is within the bounds of the oracle config
        // 3 is our maximum period multiplier used in the oracle contract
        const maxPeriod = new Big(oracleConfig.default_challenge_window_duration).mul(3);
        const minPeriod = new Big(oracleConfig.min_initial_challenge_window_duration);

        if (finalchallengePeriod.gt(maxPeriod)) {
            finalchallengePeriod = maxPeriod;
        } else if (finalchallengePeriod.lt(minPeriod)) {
            finalchallengePeriod = minPeriod;
        }

        if (ammStorageTransaction) {
            transactions.push(ammStorageTransaction);
        }

        if (oracleStorageTransaction) {
            transactions.push(oracleStorageTransaction);
        }

        let finalOutcomes = outcomes;

        if (isScalar) {
            // TODO: We need to change this later for negative numbers
            finalOutcomes = outcomes.map((outcome) => {
                return new Big(outcome).mul(scalarMultiplier).toString();
            });
        }

        transactions.push({
            receiverId: oracleConfig.bond_token,
            transactionOptions: [{
                amount: '1',
                gas: MAX_GAS.toString(),
                methodName: 'ft_transfer_call',
                args: {
                    receiver_id: this.sdkConfig.protocolContractId,
                    amount: oracleConfig.validity_bond,
                    msg: JSON.stringify({
                        'CreateMarketArgs': {
                            description,
                            extra_info: extraInfo,
                            outcomes: outcomes.length,
                            outcome_tags: finalOutcomes,
                            resolution_time: resolutionDate.getTime().toString(),
                            end_time: endDate.getTime().toString(),
                            collateral_token_id: collateralTokenId,
                            categories,
                            swap_fee: swapFee,
                            is_scalar: isScalar,
                            scalar_multiplier: isScalar ? scalarMultiplier : undefined,
                            challenge_period: finalchallengePeriod.toString(),
                            sources: [],
                        },
                    }),
                },
            }],
        });

        await batchSendTransactions(this.walletConnection, transactions);
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

    async sell(marketId: string, outcomeId: number, amountOut: string, amountIn: string, txParams?: TransactionParams) {
        const finalTxParams: TransactionParams = {
            gas: MAX_GAS.toString(),
            value: STORAGE_BASE.mul(2).toString(),
            ...txParams,
        };

        // @ts-ignore
        return this.contract.sell({
            market_id: marketId,
            collateral_out: amountOut,
            outcome_target: outcomeId,
            max_shares_in: amountIn,
        }, finalTxParams.gas, finalTxParams.value)
    }

    async claimEarnings(marketId: string) {
        // @ts-ignore
        this.contract.claim_earnings({
            market_id: marketId,
        }, MAX_GAS.toString(), '1');
    }
}
