export interface MarketGraphData {
    id: string;
    description: string;
    outcome_tags: string[];
    end_time: string;
    extra_info: string;
    finalized: boolean;
    volume: string;
    categories: string[];

    pool: {
        public: boolean;
        owner: string;
        collateral_token_id: string;
        seed_nonce: string;

        pool_balances: {
            outcome_id: number;
            balance: string;
            price: number;
            odds: string;
        }[];
    }
}

type MarketPoolGraphData = MarketGraphData['pool'];

interface MarketDetailPoolGraphData extends MarketPoolGraphData {
    tokens_info: {
        is_pool_token: boolean,
        total_supply: string,
        outcome_id: number,
    }[]
}

export interface MarketDetailGraphData extends MarketGraphData {
    payout_numerator: string[] | null;
    pool: MarketDetailPoolGraphData;

    claimed_earnings: {
        payout: string;
    }
}
