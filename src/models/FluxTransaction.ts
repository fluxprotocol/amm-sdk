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
}
