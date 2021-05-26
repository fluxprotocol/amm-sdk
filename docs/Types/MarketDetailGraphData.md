# MarketDetailGraphData

An object that contains the details about a specific market. Extends the [`MarketGraphData`](./MarketGraphData.md) interface.

```TypeScript
interface MarketDetailGraphData extends MarketGraphData {
    payout_numerator: string[] | null;
    pool: MarketDetailPoolGraphData;
    creation_date: string;
​
    claimed_earnings: {
        payout: string;
    }
}
```

## Parameters
|Key|Type|Description
|---|---|---|
|payout_numerator|string[] / null|The market payout per outcome. Available when the market is finalized. If the market is finalized and the value is null it means the market was invalid.
|creation_date|string|The timestamp when the market was created. 
|claimed_earnings|`{ payout: string }`|The amount the user has claimed. Includes the amount the payout was
|pool|MarketDetailPoolGraphData|Information about the AMM pool

### MarketDetailPoolGraphData
Extends the Pool property of MarketGraphData​

|Key|Type|Description|
|---|---|---|
|tokens_info|TokenInfo[]|An array of token information

### TokenInfo
|Key|Type|Description
|---|---|---|
|is_pool_token|boolean|Whether or not the item is a pool token
|total_supply|string|The total supply of tokens the outcome has
|outcome_id|number|The outcome ID
