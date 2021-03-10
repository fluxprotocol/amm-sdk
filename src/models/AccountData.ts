export interface AccountMarketBalanceGraphData {
    balance: string;
    outcome_id: number;
    pool_id: string;
    spent: string;

    market: {
        outcome_tags: string[];
        is_scalar: boolean;
        description: string;
        finalized: boolean;
        end_time: string;
        payout_numerator: string[] | null;
        pool: {
            collateral_token_id: string;
        }
    }
}

export interface AccountBalance {
    balance: string;
    outcome_id: number;
    pool_id: string;
    spent: string;
    market: {
        description: string;
        outcome_tags: string[];
        end_time: string;
        finalized: boolean;
        payout_numerator: string[] | null;
        is_scalar: boolean;
        pool: {
            collateral_token_id: string;
            pool_balances: {
                weight: string;
                outcome_id: number;
                balance: string;
                price: number;
                odds: string;
            }[];
        }
    }
}

export interface AccountFeeBalance {
    balance: string;
    fees: string;
    outcomeId: number;
    poolId: string;
    market: {
        description: string;
        is_scalar: boolean;
        pool: {
            collateral_token_id: string;
        };
    }
}
