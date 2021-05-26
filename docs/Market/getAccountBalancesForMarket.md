# getAccountBalancesForMarket

Gets all the balances for an account for a specific market

```TypeScript
sdkInstance.getAccountBalancesForMarket(marketId: string, accountId: string): Promise<AccountMarketBalanceGraphData[]>
```

## Parameters

|Key|Type|Description
|---|---|---|
|marketId|string|The market ID
|accountId|string|The account ID

## Returns
An array of `AccountMarketBalanceGraphData`

|Key|Type|Description
|---|---|---|
|balance|string|The number of tokens the user has for this outcome
|outcome_id|number|The outcome id
|pool_id|string|Same as market ID
|spent|string|The amount of collateral the user has spent on this outcome
|market|Partial<Market>|[Partial market data​](../Types/MarketGraphData.md)

## Example

```TypeScript
const balances = await sdkInstance.getAccountBalancesForMarket("6", "myNearAccount.near");
console.log(balances);
```
