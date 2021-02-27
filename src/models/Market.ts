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
        owner: string;
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
    creation_date: string;

    claimed_earnings: {
        payout: string;
    }
}
