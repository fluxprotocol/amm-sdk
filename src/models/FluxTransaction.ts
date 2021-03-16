export enum FluxTransactionType {
    Buy = 'Buy',
    Sell = 'Sell',
    Redeem = 'Redeem',
    ClaimEarnings = 'ClaimEarnings',
    AddLiquidity = 'AddLiquidity',
    RemoveLiquidity = 'RemoveLiquidity',
}

export interface FluxTransaction {
    account_id: string;
    input: string;
    output: string;
    market_id: string;
    outcome_id: string;
    date: string;
    type: FluxTransactionType;
    pool: {
        collateral_token_id: string;
    }
    market: {
        description: string;
        outcome_tags: string[];
        is_scalar: boolean;
    }
}
