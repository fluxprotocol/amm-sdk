export interface EscrowStatus {
    total_amount: string;
    type: 'valid_escrow' | 'invalid_escrow';
    market: {
        id: string,
        description: string,
        pool: {
            collateral_token_id: string
        }
    }
}
