import { AccountBalance, AccountFeeBalance, AccountMarketBalanceGraphData } from "../models/AccountData";
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

export async function getAccountInfo(sdkConfig: SdkConfig, accountId: string): Promise<{
    balances: AccountBalance[],
    earned_fees: AccountFeeBalance[];
}> {
    const response = await queryGraph(sdkConfig.graphApiUrl, {
        operationName: 'AccountInfo',
        query: `
            query AccountInfo($accountId: String!) {
                account: getAccount(accountId: $accountId) {
                    earned_fees {
                        fees
                        outcomeId
                        poolId
                        balance
                        market {
                            description
                        }
                    }
                    balances {
                        balance
                        outcome_id
                        pool_id
                        spent
                        market {
                            description
                            outcome_tags
                            end_time
                            finalized
                            payout_numerator
                        }
                    }
                }
            }
        `,
        variables: {
            accountId,
        }
    });

    return response?.data?.account;
}
