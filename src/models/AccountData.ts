export interface AccountMarketBalanceGraphData {
    balance: string;
    outcome_id: number;
    pool_id: string;
    spent: string;

    market: {
        outcome_tags: string[];
        is_scalar: boolean;
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
    }
}

export interface AccountFeeBalance {
    balance: string;
    fees: string;
    outcomeId: number;
    poolId: string;
    market: {
        description: string
    }
}
