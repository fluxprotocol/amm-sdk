import { AccountBalance, AccountFeeBalance, AccountMarketBalanceGraphData } from "../models/AccountData";
import { Pagination } from "../models/Pagination";
import { ParticipatedMarket } from "../models/ParticipatedMarket";
import { SdkConfig } from "../models/SdkConfig";
import { queryGraph } from "./GraphQLService";

export async function getAccountBalancesForMarket(sdkConfig: SdkConfig, marketId: string, accountId: string): Promise<AccountMarketBalanceGraphData[]> {
    const response = await queryGraph(sdkConfig.graphApiUrl, {
        operationName: 'AccountMarketBalances',
        query: `
            query AccountMarketBalances($accountId: String!, $marketId: String) {
                account: getAccount(accountId: $accountId) {
                    balances(poolId: $marketId) {
                        balance
                        outcome_id
                        pool_id,
                        spent

                        market {
                            outcome_tags
                            is_scalar
                            description
                            finalized
                            end_time
                            payout_numerator

                            pool {
                                collateral_token_id
                            }
                        }
                    }
                }
            }
        `,
        variables: {
            marketId,
            accountId,
        }
    });

    return response?.data?.account?.balances ?? [];
}

export interface GetAccountInfoOptions {
    removeZeroBalances?: boolean;
    removeClaimedBalances?: boolean;
}

export async function getAccountInfo(sdkConfig: SdkConfig, accountId: string, options: GetAccountInfoOptions = {}): Promise<{
    balances: AccountBalance[],
    earned_fees: AccountFeeBalance[];
}> {
    const finalOptions: GetAccountInfoOptions = {
        removeClaimedBalances: true,
        removeZeroBalances: true,
        ...options,
    };

    const response = await queryGraph(sdkConfig.graphApiUrl, {
        operationName: 'AccountInfo',
        query: `
            query AccountInfo($accountId: String!, $removeZeroBalances: Boolean!, $removeClaimedBalances: Boolean!) {
                account: getAccount(accountId: $accountId) {
                    earned_fees(removeZeroBalances: $removeZeroBalances, removeClaimedBalances: $removeClaimedBalances) {
                        fees
                        outcomeId
                        poolId
                        balance
                        market {
                            description
                            is_scalar

                            pool {
                                collateral_token_id
                            }
                        }
                    }
                    balances(removeZeroBalances: $removeZeroBalances, removeClaimedBalances: $removeClaimedBalances) {
                        balance
                        outcome_id
                        pool_id
                        spent
                        market {
                            description
                            is_scalar
                            outcome_tags
                            end_time
                            finalized
                            payout_numerator

                            pool {
                                collateral_token_id
                                pool_balances{
                                    weight
                                    outcome_id
                                    balance
                                    price
                                    odds
                                }
                            }
                        }
                    }
                }
            }
        `,
        variables: {
            accountId,
            removeZeroBalances: finalOptions.removeZeroBalances,
            removeClaimedBalances: finalOptions.removeClaimedBalances,
        }
    });

    return response?.data?.account;
}

export interface GetParticipatedMarketsOptions {
    limit?: number;
    offset?: number;
}

export async function getParticipatedMarkets(sdkConfig: SdkConfig, accountId: string, options?: GetParticipatedMarketsOptions): Promise<Pagination<ParticipatedMarket>> {
    const response = await queryGraph(sdkConfig.graphApiUrl, {
        operationName: 'ParticipatedMarkets',
        query: `
            query ParticipatedMarkets($accountId: String!, $limit: Int, $offset: Int) {
                account: getAccount(accountId: $accountId) {
                    participated_markets(limit: $limit, offset: $offset) {
                        total
                        items {
                            participated_date
                            market {
                                id
                                description
                                extra_info
                                outcome_tags
                                end_time
                                payout_numerator
                                finalized
                                categories
                                creation_date
                                is_scalar
                            }
                        }
                    }
                }
            }
        `,
        variables: {
            accountId,
            limit: options?.limit,
            offset: options?.offset,
        }
    });

    return response?.data?.account?.participated_markets;
}
