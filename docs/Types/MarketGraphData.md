# MarketGraphData

An object containing general market info.

```TypeScript
interface MarketGraphData {
    id: string;
    description: string;
    outcome_tags: string[];
    end_time: string;
    extra_info: string;
    finalized: boolean;
    volume: string;
    categories: string[];
    is_scalar: boolean;
​
    pool: {
        collateral_token_id: string;
​
        pool_balances: {
            weight: string;
            outcome_id: number;
            balance: string;
            price: number;
            odds: string;
        }[];
    }
}
```

## Parameters

|Key|Type|Description
|---|---|---|
|id|string|The market id
|description|string|The description/question of the market
|outcome_tags|string[]|The tags attached to the outcome. The index is the outcome id.
|end_time|string|The timestamp when the market ends|
|extra_info|string|Info about how the market will be resoluted
|finalized|boolean|Whether or not the market has been finalized.
|volume|string|The amount of collateral there is traded
|categories|string[]|An array of categories this market has
|is_scalar|boolean|Whether or not this market is a scalar market
|pool|Pool|Information about the AMM pool

### Pool
|Key|Type|Description
|---|---|---|
|collateral_token_id|string|The account id of the market
|pool_balances|PoolBalance[]|The balances of a specific outcome

### PoolBalance
|Key|Type|Description
|---|---|---|
|weight|string|The weight relative to other outcomes
|outcome_id|number|The outcome id
|balance|string|The amount of tokens there are in the pool
|price|number|The price of the outcome
|odds|string|The odds that this is the right outcome
