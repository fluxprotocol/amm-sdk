import { EscrowStatus } from "../models/EscrowStatus";
import { MarketDetailGraphData, MarketGraphData } from "../models/Market";
import { Pagination } from "../models/Pagination";
import { SdkConfig } from "../models/SdkConfig";
import { queryGraph } from "./GraphQLService";

export interface MarketFilters {
    categories?: string[];
    expired?: boolean;
    finalized?: boolean;
    limit?: number;
    offset?: number;
}

export async function getMarkets(sdkConfig: SdkConfig, filters: MarketFilters): Promise<Pagination<MarketGraphData>> {
    const response = await queryGraph(sdkConfig.graphApiUrl, {
        operationName: 'Markets',
        query: `
                query Markets($expired: Boolean, $categories: [String], $limit: Int, $offset: Int, $finalized: Boolean) {
                    market: getMarkets(filters: { expired: $expired, categories: $categories, limit: $limit, offset: $offset, finalized: $finalized }) {
                        items {
                            pool {
                                owner
                                collateral_token_id
                                pool_balances {
                                    weight
                                    outcome_id
                                    balance
                                    price
                                    odds
                                }
                            }
                            description
                            outcome_tags
                            end_time
                            extra_info
                            finalized
                            id
                            volume
                            is_scalar
                            categories
                            creation_date
                        }
                        total
                    }
                }
            `,
        variables: {
            expired: filters.expired,
            categories: filters.categories,
            limit: filters.limit,
            offset: filters.offset,
            finalized: filters.finalized,
        }
    });

    return response?.data?.market;
}

export async function getMarketById(sdkConfig: SdkConfig, marketId: string, accountId?: string): Promise<MarketDetailGraphData> {
    const response = await queryGraph(sdkConfig.graphApiUrl, {
        operationName: 'Market',
        query: `
            query Market($id: String!, $accountId: String) {
                market: getMarket(marketId: $id) {
                    pool {
                        owner
                        collateral_token_id
                        pool_balances {
                            weight
                            outcome_id
                            balance
                            price
                            odds
                        }
                        tokens_info {
                            is_pool_token
                            total_supply
                        }
                    }
                    description
                    outcome_tags
                    end_time
                    extra_info
                    finalized
                    id
                    volume
                    categories
                    creation_date
                    payout_numerator
                    is_scalar
                    claimed_earnings(accountId: $accountId) {
                        payout
                    }
                }
            }
        `,
        variables: {
            id: marketId,
            accountId,
        }
    });

    return response?.data?.market;
}

export async function getEscrowStatus(sdkConfig: SdkConfig, accountId: string, marketId?: string): Promise<EscrowStatus[]> {
    const response = await queryGraph(sdkConfig.graphApiUrl, {
        operationName: 'EscrowStatus',
        query: `
            query EscrowStatus($marketId: String, $accountId: String!) {
                escrowStatus: getEscrowStatus(marketId: $marketId, accountId: $accountId) {
                    type
                    total_amount
                    market {
                        id
                        description
                        pool {
                            collateral_token_id
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

    return response?.data?.escrowStatus ?? [];
}

export interface MarketPoolBalancesResponse {
    is_scalar: boolean;
    outcome_tags: string[];
    pool: {
        pool_balances: {
            weight: string;
            odds: string;
            outcome_id: number;
            price: number;
            balance: string;
        }[];
    }
}

export async function getMarketPoolBalances(sdkConfig: SdkConfig, marketId: string): Promise<MarketPoolBalancesResponse> {
    const response = await queryGraph(sdkConfig.graphApiUrl, {
        query: `
            query MarketOutcomeTokens($id: String!) {
                market: getMarket(marketId: $id) {
                    pool {
                        pool_balances {
                            weight
                            outcome_id
                            balance
                            price
                            odds
                        }
                    }
                    outcome_tags
                    is_scalar
                }
            }

        `,
        operationName: 'MarketOutcomeTokens',
        variables: {
            id: marketId,
        }
    });

    return response.data?.market;
}

export interface GetPoolTokenBalanceResponse {
    fees: string;
    outcomeId: number;
    poolId: string;
    balance: string;
    market: {
        is_scalar: boolean;
        description: string;
        pool: {
            collateral_token_id: string;
        }
    }
}

export async function getPoolTokenBalance(sdkConfig: SdkConfig, accountId: string, marketId: string): Promise<GetPoolTokenBalanceResponse | null> {
    const response = await queryGraph(sdkConfig.graphApiUrl, {
        operationName: 'AccountMarketPoolBalances',
        query: `
            query AccountMarketPoolBalances($accountId: String!, $marketId: String) {
                account: getAccount(accountId: $accountId) {
                    earned_fees(poolId: $marketId) {
                        balance
                        fees
                        outcomeId
                        poolId

                        market {
                            is_scalar
                            description

                            pool {
                                collateral_token_id
                            }
                        }
                    }
                }
            }
        `,
        variables: {
            accountId,
            marketId,
        }
    });

    const data = response.data.account.earned_fees;

    if (!data.length) {
        return null;
    }

    return data[0];
}
