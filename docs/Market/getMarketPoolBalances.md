# getMarketPoolBalances
Gets the current market pool balances. Useful for when you want to refresh the prices.

```TypeScript
sdkInstance.getMarketPoolBalances(marketId: string): Promise<MarketPoolBalancesResponse>;
```

## Parameters
|Key|Type|Description
|---|---|---|
|marketId|string|The market ID

## Returns

An `object` of the type `MarketPoolBalancesResponse`

|Key|Type|Description
|---|---|---|
|is_scalar|boolean|Whether or not this market is a scalar market
|outcome_tags|string[]|The tags attached to the outcome. The index is the outcome id.
|pool|PartialPool|Information about the AMM pool

### PartialPool
|Key|Type|Description
|---|---|---|
|pool_balances|PoolBalance[]|The balances of a specific outcome

### PoolBalance
|Key|Type|Description
|---|---|---|
|weight|string|The weight relative to other outcomes
|outcome_id|number|The outcome id
|balance|string|The number of tokens there are in the pool
|price|number|The price of the outcome
|odds|string|The odds that this is the right outcome

## Example

```TypeScript
const info = await sdkInstance.getMarketPoolBalances("6");
console.log(info);
```
