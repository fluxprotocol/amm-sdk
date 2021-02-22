import { AccountMarketBalanceGraphData } from "../models/AccountData";
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
                                public
                                owner
                                collateral_token_id
                                seed_nonce
                                pool_balances {
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
                            categories
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
                        public
                        owner
                        seed_nonce
                        collateral_token_id
                        pool_balances {
                            outcome_id
                            balance
                            price
                            odds
                        }
                        tokens_info {
                            is_pool_token
                            total_supply
                            outcome_id
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
                    payout_numerator
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

export async function getEscrowStatus(sdkConfig: SdkConfig, marketId: string, accountId: string): Promise<EscrowStatus[]> {
    const response = await queryGraph(sdkConfig.graphApiUrl, {
        operationName: 'EscrowStatus',
        query: `
            query EscrowStatus($marketId: String!, $accountId: String!) {
                escrowStatus: getEscrowStatus(marketId: $marketId, accountId: $accountId) {
                    type
                    total_amount
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
